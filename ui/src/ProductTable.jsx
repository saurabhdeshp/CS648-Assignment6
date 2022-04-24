import React from 'react';
import { Link } from 'react-router-dom';

const NO_DATA_AVAILABLE = 'No Product Available';

function ProductTableRow({ product, deleteProduct, index }) {
  const {
    name, price, category, url, id,
  } = product;
  return (
    <tr>
      <td>{name || NO_DATA_AVAILABLE}</td>
      <td>{price ? `$${price}` : NO_DATA_AVAILABLE}</td>
      <td>{category}</td>
      <td>{url ? <Link to={`/img/${id}`}>View</Link> : NO_DATA_AVAILABLE}</td>
      <td>
        <Link to={`/edit/${id}`}>Edit</Link>
        {' | '}
        <button type="button"  onClick={() => { deleteProduct(index); }}>
          Delete
        </button>
      </td>
    </tr>
  );
}

export default function ProductTable({
  headings, products, loading, deleteProduct,
}) {
  const productTableRows = products.map(
    (product, index) => (
      <ProductTableRow
        key={product.id}
        product={product}
        deleteProduct={deleteProduct}
        index={index}
      />
    ),
  );
  const initialTableMessage = loading ? 'Fetching products...' : 'No Products in the inventory yet';

  return (
    <table className="table">
      <thead>
        <tr>
          {headings.map((heading, index) =>
            <th key={index}>{heading}</th>)}
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {products.length > 0 ? productTableRows : (
          <tr className="text-center"><td colSpan="5">{initialTableMessage}</td></tr>
        )}
      </tbody>
    </table>
  );
}
import React from 'react';
import { Link } from 'react-router-dom';
const NO_DATA_AVAILABLE = 'No Product Available';
import { LinkContainer } from 'react-router-bootstrap';
import {
    Button, Glyphicon, Tooltip, OverlayTrigger, Table,
} from 'react-bootstrap';

function ProductTableRow({ product, deleteProduct, index }) {
  const {
    name, price, category, url, id,
  } = product;
    const deleteTooltip = (
        <Tooltip id="delete-tooltip" placement="top">Delete Product</Tooltip>
    );

    const viewImageTooltip = (
        <Tooltip id="view-tooltip" placement="top">View Image</Tooltip>
    );

    const editTooltip = (
        <Tooltip id="close-tooltip" placement="top">Edit Product</Tooltip>
    );

    function onDelete(e) {
        e.preventDefault();
        deleteProduct(index);
    }
  return (
    <tr>
      <td>{name || NO_DATA_AVAILABLE}</td>
      <td>{price ? `$${price}` : NO_DATA_AVAILABLE}</td>
      <td>{category}</td>
      <td>{url ? <OverlayTrigger delayShow={500} overlay={viewImageTooltip}>
          <Link to={`/img/${id}`}>View</Link>
      </OverlayTrigger> : NO_DATA_AVAILABLE}</td>
      <td>
          <LinkContainer to={`/edit/${id}`}>
              <OverlayTrigger delayShow={500} overlay={editTooltip}>
                  <Button bsSize="xsmall">
                      <Glyphicon glyph="edit" />
                  </Button>
              </OverlayTrigger>
          </LinkContainer>

          {' | '}

          <OverlayTrigger delayShow={500} overlay={deleteTooltip}>
              <Button bsSize="xsmall" onClick={e => onDelete(e)}>
                  <Glyphicon glyph="trash" />
              </Button>
          </OverlayTrigger>
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
      <Table bordered condensed hover responsive className="table-dark">
          <thead className="text-left bordered-table">
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
    </Table>
  );
}
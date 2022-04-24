import React from 'react';
import ProductTable from './ProductTable.jsx';
import AddProduct from './AddProduct.jsx';
import fetchGraphQL from './fetchGraphQL.js';
import { Panel } from "react-bootstrap";


const productTableHeadings = ['Product Name', 'Price', 'Category', 'Image'];

export default class ProductList extends React.Component {
  constructor() {
    super();
    this.state = { products: [], initialLoading: true };
    this.addProduct = this.addProduct.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    console.log("In loadData");
    const query = `
    query {
      getAllProducts {
        category
        id
        name
        url
        price
    }  }
      `;

    const data = await fetchGraphQL(query);

    if (data) {
      console.log(data)
      this.setState({ products: data.getAllProducts, initialLoading: false });
    }
  }

  async addProduct(product) {
    const query = `mutation addProduct( $category: String!, $name: String!, $price: Float!, $url: String!){
      addProduct( category: $category, name: $name, price: $price, url: $url) {
        id
        name
        price 
        url
        category
      }
    }`;

    const data = await fetchGraphQL(query, product );
    if (data) {
      this.loadData();
    }
  }

  async deleteProduct(index) {
    const query = `mutation deleteProduct($id: Int!) {
      deleteProduct(id: $id)
    }`;
    const { products } = this.state;
    const { location: { pathname, search }, history } = this.props;
    const { id } = products[index];

    const data = await fetchGraphQL(query, { id });
    if (data && data.deleteProduct) {
      this.setState((prevState) => {
        const newList = [...prevState.products];
        if (pathname === `/products/${id}`) {
          history.push({ pathname: '/products', search });
        }
        newList.splice(index, 1);
        return { products: newList };
      });
    } else {
      this.loadData();
    }
  }

  render() {
    const { products, initialLoading } = this.state;
    return (
      <React.Fragment>

          <h2>My Company Inventory</h2>
          <div>Showing all available products</div>
          <hr />
          <ProductTable
            headings={productTableHeadings}
            products={products}
            loading={initialLoading}
            deleteProduct={this.deleteProduct}
          />
          <hr />
          <Panel defaultExpanded className="panel-dark">
            <Panel.Heading>
              <Panel.Title toggle>Add a new Product</Panel.Title>
            </Panel.Heading>
            <Panel.Body collapsible>
              <AddProduct addProduct={this.addProduct} />
            </Panel.Body>
          </Panel>
      </React.Fragment>
    );
  }
}
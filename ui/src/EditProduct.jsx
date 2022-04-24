import React from 'react';
import fetchGraphQL from './fetchGraphQL.js';
import NumInput from './NumInput.jsx';
import TextInput from './TextInput.jsx';

export default class ProductEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      product: {},
      isLoading: true,
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps) {
    const { match: { params: { id: prevId } } } = prevProps;
    const { match: { params: { id } } } = this.props;
    if (id !== prevId) {
      this.loadData();
    }
  }

  onChange(event, naturalValue) {
    const { name, value: textValue } = event.target;
    const value = naturalValue === undefined ? textValue : naturalValue;

    this.setState(prevState => ({
      product: { ...prevState.product, [name]: value },
    }));
  }

  async handleSubmit(e) {
    e.preventDefault();
    const { product } = this.state;

    const query = `mutation updateProduct(
      $id: Int!
      $changes: ProductUpdateInputs!
    ) {
      updateProduct(
        id: $id
        changes: $changes
      ) {
        id name category price url
      }
    }`;

    const { id, ...changes } = product;
    const data = await fetchGraphQL(query, { id, changes });
    if (data) {
      this.setState({ product: data.updateProduct });
      alert('Updated product successfully'); 
    }
  }

  async loadData() {
    const query = `query product($id: Int!) {
      product(id: $id) {
        id name category price url
      }
    }`;

    const { match: { params: { id } } } = this.props;
    const data = await fetchGraphQL(query, { id: parseInt(id, 10) });
    if (data) {
      const { product } = data;
      product.name = product.name != null ? product.name : '';
      product.category = product.category != null ? product.category : '';
      product.price = product.price != null ? product.price : '';
      product.url = product.url != null ? product.url : '';
      this.setState({ product, isLoading: false });
    } else {
      this.setState({ product: {}, isLoading: false });
    }
  }

  render() {
    const { product: { id }, isLoading } = this.state;
    const { match: { params: { id: propsId } } } = this.props;
    if (id == null) {
      if (isLoading) {
        return <h3>Loading Product details...</h3>;
      }

      if (propsId != null) {
        return <h3>{`Product with ID ${propsId} not found.`}</h3>;
      }

      return null;
    }

    const {
      product: {
        name, category, price, url,
      },
    } = this.state;

    return (

      <div>
      <h3>{`Editing product with ID : ${id}`}</h3>
      <form onSubmit={this.handleSubmit} className="product-form">
        <table>
          <tbody>
            <tr>
              <td>Name</td>
              <td>
                <TextInput
                  name="name"
                  value={name}
                  onChange={this.onChange}
                  key={id}
                />
              </td>
            </tr>
            <tr>
              <td>Category</td>
              <td>
                <select name="category" value={category} onChange={this.onChange}>
                  <option value="Shirts">Shirts</option>
                  <option value="Jeans">Jeans</option>
                  <option value="Jackets">Jackets</option>
                  <option value="Sweaters">Sweaters</option>
                  <option value="Accessories">Accessories</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>Price</td>
              <td>
                <NumInput
                  name="price"
                  value={price}
                  onChange={this.onChange}
                  key={id}
                  isDecimal
                />
              </td>
            </tr>
            <tr>
              <td>Image Url</td>
              <td>
                <TextInput
                  name="url"
                  value={url}
                  onChange={this.onChange}
                  key={id}
                />
              </td>
            </tr>
            <tr>
              <td />
              <td><button type="submit">Submit</button></td>
            </tr>
          </tbody>
        </table>
      </form>
      </div>
    );
  }
}
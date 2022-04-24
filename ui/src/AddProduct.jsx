import React from 'react';

export default class ProductAdd extends React.Component {
  constructor() {
    super();
    this.state = {
      price: '$',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    const {
      name, price, category, url,
    } = document.forms.productAdd;
    const priceWithoutDollar = price.value.substring(1); // remove '$'

    const product = {
      name: name.value,
      price: parseFloat(priceWithoutDollar),
      category: category.value,
      url: url.value,
    };
    const { addProduct } = this.props;
    console.log(product)
    addProduct(product);

    name.value = '';
    category.value = 'Shirts';
    url.value = '';
    this.setState({ price: '$' });
  }

  handlePriceChange(event) {
    const priceWithoutDollar = event.target.value.substring(1); // Getting value without '$'
    this.setState({ price: `$${priceWithoutDollar}` });
  }

  render() {
    const { price } = this.state;
    return (
      <form name="productAdd" onSubmit={this.handleSubmit} className="product-form">
        <div className="form-input">
          <label htmlFor="category" className="label">
            Category &emsp; &emsp; &nbsp; 
            <select name="category" className="add-product-form-select">
              <option value="Shirts">Shirts</option>
              <option value="Jeans">Jeans</option>
              <option value="Jackets">Jackets</option>
              <option value="Sweaters">Sweaters</option>
              <option value="Accessories">Accessories</option>
            </select>
          </label>
        </div>

        <div className="form-input">
          <label htmlFor="price" className="label">
            Price Per Unit &emsp; 
            <input type="text" name="price" value={price} onChange={this.handlePriceChange} />
          </label>
        </div>

        <div className="form-input">
          <label htmlFor="name" className="label">
            Product Name &ensp;
            <input type="text" name="name" />
          </label>
        </div>

        <div className="form-input">
          <label htmlFor="url" className="label">
            Image URL &emsp; &ensp; &nbsp;
            <input type="text" name="url" />
          </label>
        </div>

        <button type="submit" className="submit-btn" >Add Product</button>
      </form>
    );
  }
}
import React from 'react';

import fetchGraphQL from './fetchGraphQL';

export default class ProductImage extends React.Component {
  constructor() {
    super();
    this.state = { product: {} };
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps) {
    const { match: { params: { id: prevId } } } = prevProps;
    const { match: { params: { id } } } = this.props;
    if (prevId !== id) {
      this.loadData();
    }
  }

  async loadData() {
    const { match: { params: { id } } } = this.props;
    const query = `query product($id: Int!) {
      product (id: $id) {
        id name url
      }
    }`;

    const data = await fetchGraphQL(query, { id: parseInt(id, 10) });
    if (data) {
      this.setState({ product: data.product });
    } else {
      this.setState({ product: {} });
    }
  }

  render() {
    const { product: { id, name, url } } = this.state;

    if (!id) {
      return (<p>{`Product with Id ${id} not present in the Database`}</p>);
    }

    if (!url) {
      return (
        <p>{`No Image Url set for Product with id ${id}`}</p>
      );
    }

    return (
      <div>
        <h3>{`Viewing Image of - ${name}`}</h3>
        <img src={url} alt={`Product id ${id}`} />
      </div>
    );
  }
}
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import ProductList from './ProductList.jsx';
import EditProduct from './EditProduct.jsx';
import ProductImage from './ProductImage.jsx';

const NotFound = () => <h1>Page Not Found</h1>;

const RouteList = () => (
  <Switch>
    <Redirect exact from="/" to="/products" />
    <Route path="/products" component={ProductList} />
    <Route path="/edit/:id" component={EditProduct} />
    <Route path="/img/:id" component={ProductImage} />
    <Route component={NotFound} />
  </Switch>
);

export default RouteList;
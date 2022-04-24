import 'babel-polyfill';
import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import Homepage from './Homepage.jsx';

const element = (
  <Router>
    <Homepage />
  </Router>
);

ReactDOM.render(element, document.getElementById('root'));
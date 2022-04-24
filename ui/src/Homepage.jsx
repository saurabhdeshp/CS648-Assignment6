import React from 'react';
import {
  Navbar, Nav, NavItem, Grid,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import RouteList from './RouteList.jsx';

const NavBar = () => (
  <Navbar style={{ borderRadius: 0}}>
    <Navbar.Header>
      <Navbar.Brand>My Company Inventory</Navbar.Brand>
    </Navbar.Header>

    <Nav>
      <LinkContainer exact to="/">
        <NavItem>Home</NavItem>
      </LinkContainer>
      <LinkContainer to="/products">
        <NavItem>Product List</NavItem>
      </LinkContainer>
    </Nav>
  </Navbar>
);

const HomePage = () => (
  <div>
    <NavBar />
    <Grid fluid>
        <div style={{display:'flex', justifyContent:'center'}}>
            <div className="list-container">
                <RouteList />
            </div>
        </div>
    </Grid>
  </div>
);

export default HomePage;

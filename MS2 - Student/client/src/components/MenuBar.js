import React from 'react';
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
  } from "shards-react";

class MenuBar extends React.Component {

    render() {
        return(

      <Navbar type="dark" theme="primary" expand="md">
        <NavbarBrand href="/dashboard">NYC Neighborhood Finder</NavbarBrand>
          <Nav navbar>
          <NavItem>
            <NavLink active href="/dashboard">
                Dashboard
              </NavLink>
          </NavItem>
          <NavItem>
              <NavLink active href="/borough/summary">
                Borough Info
              </NavLink>
            </NavItem>
          <NavItem>
            <NavLink active href="/filter">
                Filter
              </NavLink>
          </NavItem>
          <NavItem>
            <NavLink active href="/search">
                Search
            </NavLink>
          </NavItem>
          </Nav>
      </Navbar>

        )
    }
}

export default MenuBar

import React from 'react';
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
  } from "shards-react";

class MenuBar extends React.Component {
    render() {
        return(
            <Navbar type="dark" theme="primary" expand="md">
        <NavbarBrand href="/home">NYC Neighborhood Finder</NavbarBrand>
          <Nav navbar>
          <NavItem>
              <NavLink active href="/home">
                Home
              </NavLink>
            </NavItem>
            {/* <NavItem>
              <NavLink active href="/players">
                Players
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink active  href="/matches" >
                Matches
              </NavLink>
            </NavItem> */}
          </Nav>
      </Navbar>
        )
    }
}

export default MenuBar

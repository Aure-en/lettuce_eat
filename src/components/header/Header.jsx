import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

function Header() {
  return (
    <Nav>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/all">All Recipes</NavLink>
      <NavLink to="/categories">Categories</NavLink>
    </Nav>
  );
}

export default Header;

const Nav = styled.nav``;

const NavLink = styled(Link)``;

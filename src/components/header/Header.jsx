import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

function Header() {
  return (
    <Container>
      <Nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/recipes">All Recipes</NavLink>
        <NavLink to="/categories">Categories</NavLink>
      </Nav>
    </Container>
  );
}

export default Header;

const Container = styled.header`
  display: flex;
  justify-content: flex-end;
`;

const Nav = styled.nav`
  margin: 1rem;
`;

const NavLink = styled(Link)`
  display: inline-block;
  margin: 0 1rem;
  position: relative;

  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    right: 0;
    width: 0;
    height: 1px;
    background: linear-gradient(
      to left,
      ${(props) =>
        `${props.theme.gradient_primary} 0%, ${props.theme.gradient_secondary} 100%`}
    );
    transition: width 0.5s cubic-bezier(0.25, 1, 0.5, 1);
  }

  &:hover:after {
    left: 0;
    right: auto;
    width: 100%;
  }
`;

import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

function Header() {
  return (
    <Container>
      <Nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/all">All Recipes</NavLink>
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
  font-size: 0.875rem;
  color: ${(props) => props.theme.text_primary};

  &:hover {
    text-decoration: underline;
  }
`;

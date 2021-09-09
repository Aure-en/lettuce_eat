import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

function Nav() {
  return (
    <Container>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/recipes">All Recipes</NavLink>
      <NavLink to="/categories">Categories</NavLink>
      <MobileNavLink to="/about">About</MobileNavLink>
      <MobileNavLink to="/message">Message</MobileNavLink>
    </Container>
  );
}

export default Nav;

const Container = styled.nav`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding: 0.5rem 0;

  @media all and (min-width: 576px) {
    justify-content: flex-end;
    margin-right: 1rem;
  }
`;

const NavLink = styled(Link)`
  display: inline-block;
  margin: 0 1rem;
  padding: 0.5rem 0;
  position: relative;

  &:after {
    content: "";
    position: absolute;
    bottom: 1rem; // Padding-bottom
    right: 0;
    width: 0;
    height: 1px;
    background: linear-gradient(
      to left,
      ${(props) => `${props.theme.gradient_primary} 0%, ${props.theme.gradient_secondary} 100%`}
    );
    transition: width 0.5s cubic-bezier(0.25, 1, 0.5, 1);
  }

  &:hover:after {
    left: 0;
    right: auto;
    width: 100%;
  }

  @media all and (min-width: 576px) {
    padding: 1rem 0;
  }
`;

const MobileNavLink = styled(NavLink)`
  @media all and (min-width: 768px) {
    display: none;
  }
`;

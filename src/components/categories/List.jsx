import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

function List() {
  const { data: categories } = useFetch(
    `${process.env.REACT_APP_API_URL}/categories`
  );
  const { data: ingredients } = useFetch(
    `${process.env.REACT_APP_API_URL}/ingredients`
  );

  return (
    <Wrapper>
      <Container>
        <Header>
          <Heading>Categories</Heading>
        </Header>
        <Ul>
          {categories &&
            categories.map((category) => (
              <Li key={category._id}>
                <StyledLink to={`/categories/${category.name.toLowerCase()}`}>
                  {category.name}
                </StyledLink>
              </Li>
            ))}
        </Ul>

        <Header>
          <Heading>Ingredients</Heading>
        </Header>
        <Ul>
          {ingredients &&
            ingredients.map((ingredient) => (
              <Li key={ingredient._id}>
                <StyledLink
                  to={`/ingredients/${ingredient.name.toLowerCase()}`}
                >
                  {ingredient.name}
                </StyledLink>
              </Li>
            ))}
        </Ul>
      </Container>
    </Wrapper>
  );
}

export default List;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  max-width: 40rem;
  width: 100vw;
`;

const Header = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  &:after {
    content: "";
    position: absolute;
    bottom: 1rem;
    right: 0;
    width: calc(100%);
    height: 1px;
    background: linear-gradient(
      to left,
      ${(props) =>
        `${props.theme.gradient_primary} 0%, ${props.theme.gradient_secondary} 100%`}
    );
    z-index: -1;
  }
`;

const Heading = styled.h2`
  font-weight: 300;
`;

const Ul = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  list-style-type: none;
`;

const Li = styled.li`
  line-height: 1.75rem;

  &:before {
    position: relative;
    bottom: 2px;
    content: "⬧";
    color: ${(props) => props.theme.overlay_link};
    margin-right: 1rem;
  }
`;

const StyledLink = styled(Link)`
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

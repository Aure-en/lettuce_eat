import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import useFetch from "../hooks/useFetch";
import Posts from "../components/categories/Posts";

function Ingredient({ match }) {
  const { data, error } = useFetch(
    `${process.env.REACT_APP_API_URL}/ingredients/${match.params.ingredient}`
  );

  if (error) {
    return <div>Ingredient not found.</div>;
  }

  if (data) {
    return (
      <Container>
        <Header>
          <Heading>{data.name}</Heading>
          {data.description && <p>{data.description}</p>}
        </Header>
        <Posts type="ingredients" category={data} />
      </Container>
    );
  }

  return <></>;
}

export default Ingredient;

Ingredient.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      ingredient: PropTypes.string,
    }),
  }).isRequired,
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 900px;
  width: 100%;
  margin-bottom: 2rem;
  padding: 0 0.5rem;
`;

const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 25rem;
  text-align: center;
`;

const Heading = styled.h1`
  position: relative;
  font-weight: 300;
  align-self: stretch;
  margin-bottom: 3rem;

  &:after {
    content: "";
    position: absolute;
    bottom: -2rem;
    left: 50%;
    transform: translateX(-50%);
    width: 70%;
    height: 3px;
    background: ${(props) => props.theme.gradient_primary};
    background: linear-gradient(
      to left,
      ${(props) =>
        `${props.theme.gradient_primary} 0%, ${props.theme.gradient_secondary} 100%`}
    );
  }
`;

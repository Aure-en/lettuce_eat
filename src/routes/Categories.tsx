import React from 'react';
import styled from 'styled-components';
import List from '../components/categories/List';
import useFetch from '../hooks/useFetch';

function Categories() {
  const { data: categories } = useFetch(
    `${process.env.REACT_APP_API_URL}/categories`,
  );
  const { data: ingredients } = useFetch(
    `${process.env.REACT_APP_API_URL}/ingredients`,
  );

  return (
    <Container>
      <Header>
        <Heading>Categories</Heading>
        <p>
          We’ve organized these
          {' '}
          <strong>recipes</strong>
          {' '}
          so you don't have to!
        </p>
        <p>
          Whether you browse them by
          {' '}
          <Underline>meal type</Underline>
          {' '}
          or by
          {' '}
          <Underline>ingredient</Underline>
          , we're sure you'll find just what
          you are looking for.
        </p>
      </Header>
      {categories && (
        <List title="recipes types" type="categories" data={categories} />
      )}
      {ingredients && (
        <List title="ingredients" type="ingredients" data={ingredients} />
      )}
    </Container>
  );
}

export default Categories;

const Container = styled.div`
  max-width: 40rem;
  margin: 0 2rem 2rem 2rem;
  width: 100%;
`;

const Header = styled.div`
  margin: 0 auto;
  max-width: 30rem;
  text-align: center;
`;

const Heading = styled.h1`
  font-weight: 300;
`;

const Underline = styled.span`
  text-decoration: underline;
`;

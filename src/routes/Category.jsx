import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import useFetch from "../hooks/useFetch";
import Posts from "../components/categories/Category";

function Category({ match }) {
  const { data, error } = useFetch(
    `${process.env.REACT_APP_API_URL}/categories/${match.params.category}`
  );

  if (error) {
    return <div>Category not found.</div>;
  }

  if (data) {
    return (
      <Wrapper>
        <Container>
          <Heading>{data.name}</Heading>
          <Posts categoryId={data._id} />
        </Container>
      </Wrapper>
    );
  }

  return <></>;
}

export default Category;

Category.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      category: PropTypes.string,
    }),
  }).isRequired,
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 2rem;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 900px;
`;

const Heading = styled.h1`
  font-weight: 300;
`;

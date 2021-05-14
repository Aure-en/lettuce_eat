import React from "react";
import PropTypes from "prop-types";
import Preview from "../components/categories/Preview";
import useFetch from "../hooks/useFetch";

function Category({ match }) {
  const { data, error } = useFetch(
    `${process.env.REACT_APP_API_URL}/categories/${match.params.category}`
  );

  if (error) {
    return <div>Category not found.</div>;
  }

  if (data) {
    return (
      <>
        <div>{data.name}</div>
        <Preview category={data} limit={10} />
      </>
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

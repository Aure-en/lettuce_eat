import React from "react";
import PropTypes from "prop-types";
import useFetch from "../../hooks/useFetch";

// Fetch the latest posts from a specific category and displays them
function Preview({ category, limit }) {
  const { data } = useFetch(
    `${process.env.REACT_APP_API_URL}/categories/${category._id}/posts?page=1&limit=${limit}`
  );

  return (
    <ul>
      {data &&
        data.map((post) => (
          <li key={post._id}>
            {post.title}
            {post.content}
          </li>
        ))}
    </ul>
  );
}

export default Preview;

Preview.propTypes = {
  category: PropTypes.shape({
    name: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
  limit: PropTypes.number,
};

Preview.defaultProps = {
  limit: 5,
};

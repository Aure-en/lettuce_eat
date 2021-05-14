import React from "react";
import useFetch from "../../hooks/useFetch";

// Fetch the latest posts from a specific category and displays them
function Preview({ category }) {
  const { data } = useFetch(
    `${process.env.REACT_APP_API_URL}/categories/${category._id}/posts?page=1&limit=5`
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

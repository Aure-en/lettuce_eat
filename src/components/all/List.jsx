import React from "react";
import styled from "styled-components";
import useFetch from "../../hooks/useFetch";

function Latest() {
  const { data, error } = useFetch(`${process.env.REACT_APP_API_URL}/posts`);

  if (error) {
    return <div>{error}</div>;
  }

  if (data) {
    return (
      <ul>
        {data.map((post) => (
          <li key={post._id}>
            <div>{post.title}</div>
            <div>{post.text}</div>
          </li>
        ))}
      </ul>
    );
  }

  return <></>;
}

export default Latest;

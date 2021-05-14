import React from "react";
import useFetch from "../hooks/useFetch";

function Post({ match }) {
  const { data: post, error } = useFetch(
    `${process.env.REACT_APP_API_URL}/posts/${match.params.postId}`
  );

  if (error) {
    return <div>Post not found</div>;
  }

  if (post) {
    return (
      <>
        <div>{post.title}</div>
        <div>{post.text}</div>
      </>
    );
  }

  return <></>;
}

export default Post;

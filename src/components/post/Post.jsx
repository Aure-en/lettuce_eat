import React from "react";

function Post({ post }) {
  return (
    <div>
      <div>{post.title}</div>
      <div>{post.text}</div>
    </div>
  );
}

export default Post;

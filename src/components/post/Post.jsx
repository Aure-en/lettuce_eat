import React from "react";
import redraft from "redraft";
import renderers from "../shared/renderers";

function Post({ post }) {
  return (
    <div>
      <div>{post.title}</div>
      <div>{redraft(JSON.parse(post.text), renderers)}</div>
    </div>
  );
}

export default Post;

import React from "react";
import useFetch from "../hooks/useFetch";
import PostComponent from "../components/post/Post";
import Form from "../components/comments/Form";
import Comments from "../components/comments/Comments";

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
        <PostComponent post={post} />
        <Form postId={post._id} />
        <Comments postId={post._id} />
      </>
    );
  }

  return <></>;
}

export default Post;

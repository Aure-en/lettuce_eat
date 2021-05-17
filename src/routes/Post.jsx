import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
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
      <Wrapper>
        <PostComponent post={post} />
        <Form postId={post._id} />
        <Comments postId={post._id} />
      </Wrapper>
    );
  }

  return <></>;
}

export default Post;

Post.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      postId: PropTypes.string,
    }),
  }).isRequired,
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

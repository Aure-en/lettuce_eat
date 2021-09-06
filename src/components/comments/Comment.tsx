import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Form from './Form';
import useFetch from '../../hooks/useFetch';

interface Props {
  postId: string,
  commentId: string,
}

function Comment({ postId, commentId }: Props) {
  const [isReplying, setIsReplying] = useState(false);
  const { data: comment } = useFetch(
    `${process.env.REACT_APP_API_URL}/posts/${postId}/comments/${commentId}`,
  );

  return (
    <>
      {comment && (
        <Container>
          <strong>{comment.username}</strong>
          <p>{comment.content}</p>
          <Button type="button" onClick={() => setIsReplying(!isReplying)}>
            {isReplying ? 'Cancel' : 'Reply'}
          </Button>

          {isReplying && <Form postId={comment.post} parentId={comment._id} />}

          {comment.children.map((child) => (
            <Comment postId={postId} commentId={child} />
          ))}
        </Container>
      )}
    </>
  );
}

export default Comment;

Comment.propTypes = {
  postId: PropTypes.string.isRequired,
  commentId: PropTypes.string.isRequired,
};

const Container = styled.li`
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 1rem 0 0 1rem;

  &:before {
    content: "";
    position: absolute;
    height: 100%;
    width: 2px;
    background: ${(props) => props.theme.input_border};
    left: -1rem;
    opacity: 0.5;
  }
`;

const Button = styled.button`
  align-self: flex-end;
  text-transform: uppercase;
  font-size: 1rem;
  color: ${(props) => props.theme.input_border};
  cursor: pointer;
  font-weight: bold;
  border: none;
  background: none;
`;

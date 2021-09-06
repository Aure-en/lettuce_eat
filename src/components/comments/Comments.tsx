import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Comment from './Comment';
import useFetch from '../../hooks/useFetch';

interface Props {
  postId: string,
}

function Comments({ postId }: Props) {
  const { data: comments } = useFetch(
    `${process.env.REACT_APP_API_URL}/posts/${postId}/comments`,
  );

  return (
    <List>
      {comments
        && comments.map((comment) => {
          if (!comment.parent) {
            return (
              <Comment
                postId={postId}
                commentId={comment._id}
                key={comment._id}
              />
            );
          }
        })}
    </List>
  );
}

export default Comments;

Comments.propTypes = {
  postId: PropTypes.string.isRequired,
};

const List = styled.ul`
  margin: 2rem 0;

  & > li {
    margin: 1.5rem 0;
  }
`;

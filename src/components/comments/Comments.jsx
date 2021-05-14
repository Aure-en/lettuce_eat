import React from "react";
import PropTypes from "prop-types";
import Comment from "./Comment";
import useFetch from "../../hooks/useFetch";

function Comments({ postId }) {
  const { data: comments } = useFetch(
    `${process.env.REACT_APP_API_URL}/posts/${postId}/comments`
  );

  return (
    <ul>
      {comments &&
        comments.map((comment) => {
          if (!comment.parent) {
            return <Comment comment={comment} key={comment._id} />;
          }
        })}
    </ul>
  );
}

export default Comments;

Comments.propTypes = {
  postId: PropTypes.string.isRequired,
};

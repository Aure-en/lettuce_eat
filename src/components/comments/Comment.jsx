import React, { useState } from "react";
import PropTypes from "prop-types";
import redraft from "redraft";
import renderers from "../shared/renderers";
import Form from "./Form";

function Comment({ comment }) {
  const [isReplying, setIsReplying] = useState(false);

  return (
    <div>
      <div>{comment.username}</div>
      <div>{redraft(JSON.parse(comment.content), renderers)}</div>
      <button type="button" onClick={() => setIsReplying(true)}>
        Reply
      </button>

      {isReplying && <Form postId={comment.post} parentId={comment._id} />}

      {comment.children.map((child) => (
        <Comment comment={child} />
      ))}
    </div>
  );
}

export default Comment;

Comment.propTypes = {
  comment: PropTypes.shape({
    username: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    post: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
    timestamp: PropTypes.string,
    parent: PropTypes.string,
    children: PropTypes.arrayOf(PropTypes.string),
    account: PropTypes.string,
  }).isRequired,
};

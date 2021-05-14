import React, { useState } from "react";
import PropTypes from "prop-types";
import TextEditor from "./TextEditor";

// If a comment is passed, the form will update it.
// Otherwise, a new comment document will be created.
function Form({ postId, parentId, comment }) {
  const [values, setValues] = useState({
    username: (comment && comment.username) || "",
    content: (comment && comment.content) || "",
  });

  const [errors, setErrors] = useState({
    username: "",
    content: "",
  });

  const EMPTY_REGEX = /{"blocks":\[{"key":"[a-zA-Z0-9]{5}","text":"","type":"[\w]+","depth":0,"inlineStyleRanges":\[],"entityRanges":\[],"data":{}}],"entityMap":{}}/i;

  const handleChange = (name, value) => {
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({
      username: "",
      content: "",
    });

    // Client-side validation
    let hasErrors = false;
    if (!values.username) {
      hasErrors = true;
      setErrors({ ...errors, username: "Username must be specified." });
    }

    if (!values.content || EMPTY_REGEX.test(values.content)) {
      hasErrors = true;
      setErrors({ ...errors, content: "Comment cannot be empty." });
    }

    if (hasErrors) return;

    // Send form to back
    let res;

    // Updating a comment
    if (comment) {
      res = await fetch(
        `${process.env.REACT_APP_API_URL}/posts/${postId}/comments/${comment._id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("JWTToken")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );
    } else {
      res = await fetch(
        `${process.env.REACT_APP_API_URL}/posts/${postId}/comments/${
          parentId ? `${parentId}` : ""
        }`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("JWTToken")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">
        Username
        <input
          type="text"
          id="username"
          name="username"
          value={values.username}
          onChange={(e) => handleChange("username", e.target.value)}
        />
      </label>
      {errors.username && <div>{errors.username}</div>}

      <TextEditor
        sendContent={(content) =>
          setValues((prev) => {
            return { ...prev, content };
          })
        }
        prevContent={comment && comment.content}
        placeholder="What are you thoughts?"
      />
      {errors.content && <div>{errors.content}</div>}

      <button
        type="submit"
        disabled={
          !values.username ||
          !values.content ||
          EMPTY_REGEX.test(values.content)
        }
      >
        Comment
      </button>
    </form>
  );
}

export default Form;

Form.propTypes = {
  postId: PropTypes.string.isRequired,
  parentId: PropTypes.string,
  comment: PropTypes.shape({
    username: PropTypes.string,
    content: PropTypes.string,
    _id: PropTypes.string,
  }),
};

Form.defaultProps = {
  parentId: undefined,
  comment: undefined,
};

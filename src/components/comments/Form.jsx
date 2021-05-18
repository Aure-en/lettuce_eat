import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import TextareaAutosize from "react-textarea-autosize";

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

    Object.keys(values).map((key) => {
      if (!values[key]) {
        hasErrors = true;
        setErrors((prev) => {
          return { ...prev, [key]: `${key} must be specified.` };
        });
      }
    });

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
    <Container onSubmit={handleSubmit}>
      <label htmlFor="username">
        <Input
          type="text"
          id="username"
          name="username"
          value={values.username}
          placeholder="Username"
          onChange={(e) => handleChange(e.target.name, e.target.value)}
        />
      </label>
      {errors.username && <div>{errors.username}</div>}

      <label htmlFor="content">
        <Input
          as={TextareaAutosize}
          id="content"
          name="content"
          placeholder="Comment"
          value={values.content}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
          minRows={7}
        />
      </label>
      {errors.content && <div>{errors.content}</div>}

      <Button type="submit" disabled={!values.username || !values.content}>
        Comment
      </Button>
    </Container>
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

const Container = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  background: ${(props) => props.theme.background_secondary};
  padding: 1.5rem 2rem;
  margin-top: 1rem;
`;

const Input = styled.input`
  width: 100%;
  margin: 0.5rem 0;
  padding: 0.5rem;
  border: none;
  border-left: 3px solid ${(props) => props.theme.input_border};

  &::placeholder {
    text-transform: uppercase;
    font-size: 0.875rem;
    font-style: italic;
  }
`;

const Button = styled.button`
  align-self: flex-end;
  text-transform: uppercase;
  background: ${(props) => props.theme.input_border};
  border: none;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  color: ${(props) => props.theme.text_link};
  cursor: pointer;
`;

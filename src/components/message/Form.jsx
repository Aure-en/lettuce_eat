import React, { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import styled from "styled-components";

function Form() {
  const initial = {
    name: "",
    email: "",
    message: "",
  };

  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState(initial);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors(initial);
    setMessage("");

    // Validation
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

    // Send the message
    const res = await fetch(`${process.env.REACT_APP_API_URL}/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (res.success) {
      setMessage("Your message has been sent.");
    }
  };

  return (
    <Container onSubmit={handleSubmit}>
      <Field>
        <label htmlFor="name">
          <Input
            type="text"
            name="name"
            id="name"
            value={values.name}
            onChange={handleChange}
            placeholder="Name"
          />
        </label>
        {errors.name && <Error>{errors.name}</Error>}
      </Field>

      <Field>
        <label htmlFor="email">
          <Input
            type="email"
            name="email"
            id="email"
            value={values.email}
            onChange={handleChange}
            placeholder="Email"
          />
        </label>
        {errors.name && <Error>{errors.name}</Error>}
      </Field>

      <Field>
        <label htmlFor="message">
          <Textarea
            name="message"
            id="message"
            value={values.message}
            onChange={handleChange}
            placeholder="Message"
          />
        </label>
        {errors.name && <Error>{errors.name}</Error>}
      </Field>

      <Button type="submit">Send Message</Button>
      {message && <Message>{message}</Message>}
    </Container>
  );
}

export default Form;

const Container = styled.form``;

const Field = styled.div``;

const Message = styled.div``;

const Error = styled(Message)``;

const Input = styled.input``;

const Textarea = styled(TextareaAutosize)``;

const Button = styled.button``;

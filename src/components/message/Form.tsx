import React, { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import styled from 'styled-components';

function Form() {
  const initial = {
    name: '',
    email: '',
    message: '',
  };

  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState(initial);
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setErrors(initial);
    setMessage('');

    // Validation
    let hasErrors = false;
    Object.keys(values).map((key) => {
      if (!values[key]) {
        hasErrors = true;
        setErrors((prev) => ({
          ...prev,
          [key]: `${key[0].toUpperCase() + key.slice(1)} must be specified.`,
        }));
      }
    });

    if (hasErrors) return;

    // Send the message
    const res = await fetch(`${process.env.REACT_APP_API_URL}/message`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });

    const json = await res.json();
    if (json.success) {
      setMessage('Your message has been sent.');
    }
  };

  return (
    <Container onSubmit={handleSubmit}>
      <Field>
        <Label htmlFor="name">
          <Input
            type="text"
            name="name"
            id="name"
            value={values.name}
            onChange={handleChange}
            placeholder="Name"
          />
        </Label>
        {errors.name && <Error>{errors.name}</Error>}
      </Field>

      <Field>
        <Label htmlFor="email">
          <Input
            type="email"
            name="email"
            id="email"
            value={values.email}
            onChange={handleChange}
            placeholder="Email"
          />
        </Label>
        {errors.email && <Error>{errors.email}</Error>}
      </Field>

      <Field>
        <Label htmlFor="message">
          <Textarea
            name="message"
            id="message"
            value={values.message}
            onChange={handleChange}
            placeholder="Message"
          />
        </Label>
        {errors.message && <Error>{errors.message}</Error>}
      </Field>

      <Button type="submit">Send Message</Button>
      {message && <Message>{message}</Message>}
    </Container>
  );
}

export default Form;

const Container = styled.form`
  display: flex;
  flex-direction: column;
`;

const Field = styled.div`
  margin: 1.5rem 0;
`;

const Message = styled.small`
  align-self: center;
`;

const Error = styled.small`
  color: ${(props) => props.theme.error};
`;

const Label = styled.label`
  position: relative;

  &:after {
    content: "";
    position: absolute;
    bottom: -0.25rem;
    left: 0;
    width: 100%;
    height: 1px;
    background: linear-gradient(
      to left,
      ${(props) => `${props.theme.gradient_primary} 0%, ${props.theme.gradient_secondary} 100%`}
    );
  }
`;

const Input = styled.input`
  border: none;
  width: 100%;
  padding: 0.25rem 0;
  background: transparent;
`;

const Textarea = styled(TextareaAutosize)`
  border: none;
  width: 100%;
  background: transparent;
`;

const Button = styled.button`
  align-self: center;
  padding: 0.5rem 1rem;
  margin-top: 1rem;
  background: ${(props) => props.theme.accent};
  color: ${(props) => props.theme.text_tertiary};
  text-transform: uppercase;
  border: 2px solid transparent;

  &:hover {
    border: 2px inset ${(props) => props.theme.text_preview_accent};
  }
`;

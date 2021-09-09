import React from 'react';
import styled from 'styled-components';
import Form from '../components/message/Form';

function Message() {
  return (
    <Container>
      <Header>
        <Heading>Message</Heading>
        <p>
          Feel free to send us a message for any inquiry of suggestion. Whether
          you need more precisions about a recipe or are simply looking to chat
          about food, we would love to hear from you.
        </p>
      </Header>
      <Content>
        <Form />
      </Content>
    </Container>
  );
}

export default Message;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 0.5rem;
  width: 100%;
  padding-bottom: 2rem;
`;

const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 25rem;
  text-align: center;
  margin-bottom: 2rem;
`;

const Heading = styled.h1`
  position: relative;
  font-weight: 300;
  align-self: stretch;
  margin-bottom: 3rem;

  &:after {
    content: "";
    position: absolute;
    bottom: -2rem;
    left: 50%;
    transform: translateX(-50%);
    width: 70%;
    height: 3px;
    background: ${(props) => props.theme.gradient_primary};
    background: linear-gradient(
      to left,
      ${(props) => `${props.theme.gradient_primary} 0%, ${props.theme.gradient_secondary} 100%`}
    );
  }
`;

const Content = styled.div`
  width: 100%;
  max-width: 40rem;
  padding: 0 2rem;
`;

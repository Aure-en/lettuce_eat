import React, { useState, useRef } from "react";
import styled from "styled-components";
import Form from "./Form";
import { ReactComponent as MessageIcon } from "../../assets/icons/panel/message.svg";

function Panel() {
  const formRef = useRef();
  const [active, setActive] = useState(false);

  const handleClick = (e, ref) => {
    if (ref.current && !ref.current.contains(e.target)) setActive(!active);
  };

  return (
    <Container
      type="button"
      onClick={(e) => handleClick(e, formRef)}
      $active={active}
    >
      <Icon $active={active}>
        <MessageIcon />
      </Icon>
      <Content>
        <Inner ref={formRef}>
          <Heading>Message</Heading>
          <p>
            Feel free to send us a message for any inquiry of suggestion.
            Whether you need more precisions about a recipe or are simply
            looking to chat about food, we would love to hear from you.
          </p>
          <Form />
        </Inner>
      </Content>
    </Container>
  );
}

export default Panel;

const Container = styled.button`
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  background: ${(props) => props.theme.background_secondary};
  display: none;
  transform: translateX(
    ${(props) => (props.$active ? "0" : "calc(100% - 6rem)")}
  );
  transition: transform 0.3s ease-out;
  z-index: 10;
  border-left: 1px solid ${(props) => props.theme.background_primary};
  padding: 0;

  & > * {
    z-index: 10;
  }

  @media all and (min-width: 768px) {
    display: flex;
    align-items: center;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: calc(100vw - 6rem);
  max-width: 25rem;
  padding: 0 2rem;
`;

const Heading = styled.div`
  display: inline-block;
  font-size: 0.9375rem;
  font-weight: 400;
  text-transform: uppercase;
  font-style: italic;
  padding: 0.25rem 1.25rem 0.25rem 1rem;
  border-left: 3px solid ${(props) => props.theme.input_border};
  background: ${(props) => props.theme.panel_left_bg};
  color: ${(props) => props.theme.text_secondary};
`;

const Inner = styled.div`
  border: 3px solid ${(props) => props.theme.text_tertiary};
  padding: 2rem;
  background: ${(props) => props.theme.panel_right_bg};
  width: 100%;
`;

const Icon = styled.span`
  width: ${(props) => (props.$active ? "0" : "6rem")};
  color: ${(props) => props.theme.panel_right_icon};
  transition: width 0.5s linear;
  overflow: hidden;
`;

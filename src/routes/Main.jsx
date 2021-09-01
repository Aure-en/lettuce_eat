import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Latest from "../components/main/Latest";
import About from "../components/main/About";

import { ReactComponent as ArrowRight } from "../assets/icons/preview/arrow-right.svg";

function Main() {
  return (
    <Container>
      <About />
      <Latest />
      <StyledLink to="/recipes">
        See More
        <ArrowRight />
      </StyledLink>
    </Container>
  );
}

export default Main;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 900px;
  width: 100%;
  margin-bottom: 2rem;
`;

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  align-self: flex-end;
  padding: 0.5rem 1.25rem;
  color: ${(props) => props.theme.text_tertiary};
  background: ${(props) => props.theme.background_tertiary};
  z-index: 5;
  text-transform: uppercase;
  max-width: 70%;
  text-align: center;
  font-size: 1rem;
  border: 2px inset transparent;

  & > svg {
    margin-left: 0.25rem;
  }

  &:hover {
    border: 2px inset ${(props) => props.theme.text_preview_accent};
  }
`;

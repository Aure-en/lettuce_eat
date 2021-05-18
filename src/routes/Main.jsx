import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Latest from "../components/main/Latest";
import About from "../components/main/About";

import { ReactComponent as ArrowRight } from "../assets/icons/preview/arrow-right.svg";

function Main() {
  return (
    <Wrapper>
      <Container>
        <About />
        <Latest />
        <StyledLink to="/all">
          See More
          <ArrowRight />
        </StyledLink>
      </Container>
    </Wrapper>
  );
}

export default Main;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 2rem;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 900px;
`;

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  align-self: flex-end;
  padding: 0.5rem 1.25rem;
  color: ${(props) => props.theme.text_link};
  background: ${(props) => props.theme.overlay_link};
  z-index: 5;
  text-transform: uppercase;
  max-width: 70%;
  text-align: center;
  font-size: 1rem;

  & > svg {
    margin-left: 0.25rem;
  }
`;
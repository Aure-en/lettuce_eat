import React from "react";
import styled from "styled-components";
import Latest from "../components/main/Latest";
import About from "../components/main/About";

function Main() {
  return (
    <Container>
      <About />
      <Latest />
    </Container>
  );
}

export default Main;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
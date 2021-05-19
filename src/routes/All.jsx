import React, { useState } from "react";
import styled from "styled-components";
import List from "../components/all/List";
import Sidebar from "../components/all/Sidebar";

function All() {
  const [queries, setQueries] = useState({});
  return (
    <Wrapper>
      <Container>
        <Header>
          <Heading>Recipes</Heading>
          <p>
            Welcome to every single Lettuce Eat recipe! Maybe you’re not even
            sure what exactly you’re looking for and you just wanna keep on
            scrollin’ until inspiration strikes, or looking through hundreds of
            beautiful pictures of food is a soothing self-care practice.
            Whatever the reason, you’re here! And here’s the whole shebang.
          </p>
        </Header>
        <Content>
          <List queries={queries} />
          <Sidebar send={(update) => setQueries({ ...queries, ...update })} />
        </Content>
      </Container>
    </Wrapper>
  );
}

export default All;

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

const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 25rem;
  text-align: center;
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
      ${(props) =>
        `${props.theme.gradient_primary} 0%, ${props.theme.gradient_secondary} 100%`}
    );
  }
`;

const Content = styled.div`
  display: grid;
  margin: 2rem 0;
  grid-template-columns: 1fr auto;
  grid-gap: 2rem;
`;

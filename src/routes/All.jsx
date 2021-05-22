import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import List from "../components/all/List";
import Sidebar from "../components/all/Sidebar";

function All({ match }) {
  const [layout, setLayout] = useState("preview");
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
          <List queries={queries} layout={layout} page={match.params.page} />
          <Sidebar
            setQueries={(update) => setQueries({ ...queries, ...update })}
            setLayout={(update) => setLayout(update)}
          />
        </Content>
      </Container>
    </Wrapper>
  );
}

export default All;

All.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      page: PropTypes.string,
    }),
  }).isRequired,
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 2rem;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
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
  grid-template-columns: 1fr 12.5rem;
  grid-gap: 2rem;
  width: 100%;
  align-items: start;
`;

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import List from '../components/all/List';
import Sidebar from '../components/all/sidebar/Sidebar';
import DropdownSidebar from '../components/all/sidebar/Dropdown';
import Queries from '../types/Queries';

interface Props {
  match: {
    params: {
      page: string,
    }
  }
}

function All({ match }: Props) {
  const [layout, setLayout] = useState<'preview' | 'list'>('preview');
  const [queries, setQueries] = useState<Queries>({});

  return (
    <Container>
      <Header>
        <Heading>Recipes</Heading>
        <p>
          Welcome to every single Berrycious recipe! Maybe you’re not even sure
          what exactly you’re looking for and you just wanna keep on scrollin’
          until inspiration strikes, or looking through hundreds of beautiful
          pictures of food is a soothing self-care practice. Whatever the
          reason, you’re here! And here’s the whole shebang.
        </p>
      </Header>
      <Content>
        <List queries={queries} layout={layout} page={match.params.page} />

        <Desktop>
          <Sidebar
            setQueries={(update) => setQueries({ ...queries, ...update })}
            setLayout={(update) => setLayout(update)}
          />
        </Desktop>
        <Mobile>
          <DropdownSidebar
            setQueries={(update) => setQueries({ ...queries, ...update })}
            setLayout={(update) => setLayout(update)}
          />
        </Mobile>
      </Content>
    </Container>
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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 0.5rem;
  width: 100%;
  margin-bottom: 2rem;
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
      ${(props) => `${props.theme.gradient_primary} 0%, ${props.theme.gradient_secondary} 100%`}
    );
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column-reverse;
  margin: 2rem 0;
  width: 100%;
  max-width: 1200px;

  @media all and (min-width: 900px) {
    display: grid;
    grid-gap: 2rem;
    grid-template-columns: 1fr auto;
    align-items: start;
  }
`;

const Desktop = styled.div`
  display: none;

  @media all and (min-width: 900px) {
    display: block;
  }
`;

const Mobile = styled.div`
  display: block;

  @media all and (min-width: 900px) {
    display: none;
  }
`;

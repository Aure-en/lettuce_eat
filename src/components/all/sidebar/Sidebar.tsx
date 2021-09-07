import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Search from '../../shared/Search';
import Filters from '../../shared/filters/Filters';
import Layout from '../../shared/Layout';
import Sort from '../../shared/Sort';
import LayoutType from '../../../types/Layout';
import Queries from '../../../types/Queries';

interface Props {
  setQueries: (query: Partial<Queries>) => void,
  setLayout: (layout: LayoutType) => void,
}

function Sidebar({ setQueries, setLayout }: Props) {
  return (
    <Container>
      <Search send={(search) => setQueries(search)} />
      <Layout send={(layout) => setLayout(layout)} />
      <Sort send={(sort) => setQueries(sort)} />
      <Filters send={(filters) => setQueries(filters)} />
    </Container>
  );
}

export default Sidebar;

Sidebar.propTypes = {
  setQueries: PropTypes.func.isRequired,
  setLayout: PropTypes.func.isRequired,
};

const Container = styled.aside`
  display: flex;
  flex-direction: column;
  max-width: 12.5rem;

  & > * {
    margin: 0.5rem 0;
  }

  & > *:first-child {
    margin-top: 0;
  }

  & > *:last-child {
    margin-bottom: 0;
  }
`;

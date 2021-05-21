import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Search from "../shared/Search";
import Filters from "../shared/filters/Filters";
import Layout from "../shared/Layout";
import Sort from "../shared/Sort";

function Sidebar({ setQueries, setLayout }) {
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
  justify-self: end;
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

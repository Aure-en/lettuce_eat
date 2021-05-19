import React from "react";
import styled from "styled-components";
import Search from "../shared/Search";
import Filters from "../shared/Filters";
import Sort from "../shared/Sort";

function Sidebar() {
  return (
    <Container>
      <Search />
      <Sort send={() => {}} />
      <Filters />
    </Container>
  );
}

export default Sidebar;

const Container = styled.aside`
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
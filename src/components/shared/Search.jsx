import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { ReactComponent as SearchIcon } from "../../assets/icons/search.svg";

function Search({ send }) {
  const [search, setSearch] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    send({
      search,
    });
  };

  return (
    <>
      <Heading>Search Recipe</Heading>
      <Form onSubmit={onSubmit}>
        <label htmlFor="search">
          <Input
            type="text"
            name="search"
            id="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>
        <Button type="submit" aria-label="Search">
          <SearchIcon />
        </Button>
      </Form>
    </>
  );
}

export default Search;

Search.propTypes = {
  send: PropTypes.func.isRequired,
};

const Form = styled.form`
  display: flex;
  margin: 0.5rem 0;
`;

const Heading = styled.div`
  font-size: 1.25rem;
  font-weight: 300;
`;

const Input = styled.input`
  border: none;
  border-left: 4px solid ${(props) => props.theme.accent};
  padding: 0.5rem;
  background: ${(props) => props.theme.text_preview_bg};
  height: 100%;
`;

const Button = styled.button`
  padding: 0.15rem 0.25rem;
  background: ${(props) => props.theme.accent};
  color: ${(props) => props.theme.text_tertiary};
  border: 2px solid transparent;

  &:hover {
    border: 2px inset ${(props) => props.theme.text_preview_accent};
  }
`;

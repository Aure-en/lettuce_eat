import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import useDropdown from "../../hooks/useDropdown";
import { ReactComponent as IconDown } from "../../assets/icons/arrow-down.svg";

function Sort({ send }) {
  const [sort, setSort] = useState({
    sort: "date",
    order: "desc",
  });
  const dropdownRef = useRef();
  const {
    isDropdownOpen,
    setIsDropdownOpen,
    handleChoice,
    current,
  } = useDropdown(dropdownRef, "New");

  useEffect(() => {
    send(sort);
  }, [sort]);

  return (
    <Dropdown ref={dropdownRef}>
      <DropdownHeader
        isDropdownOpen={isDropdownOpen}
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        Sort by:
        {"\u00A0"}
        <CurrentChoice>{current}</CurrentChoice>
        <IconDown />
      </DropdownHeader>

      {isDropdownOpen && (
        <DropdownList>
          <Option
            type="button"
            onClick={() => {
              handleChoice("New");
              setSort({
                sort: "date",
                order: "desc",
              });
            }}
          >
            New
          </Option>
          <Option
            type="button"
            onClick={() => {
              handleChoice("Earliest");
              setSort({
                sort: "date",
                order: "asc",
              });
            }}
          >
            Earliest
          </Option>
          <Option
            type="button"
            onClick={() => {
              handleChoice("Name (A - Z)");
              setSort({
                sort: "alphabetical",
                order: "asc",
              });
            }}
          >
            Name (A - Z)
          </Option>
          <Option
            type="button"
            onClick={() => {
              handleChoice("Name (Z - A)");
              setSort({
                sort: "alphabetical",
                order: "desc",
              });
            }}
          >
            Name (Z - A)
          </Option>
        </DropdownList>
      )}
    </Dropdown>
  );
}

export default Sort;

Sort.propTypes = {
  send: PropTypes.func.isRequired,
};

const Dropdown = styled.div`
  position: relative;
  display: inline-block;
  margin-left: 1rem;
  z-index: 5;
  color: ${(props) => props.theme.text_secondary};
  padding: 0.5rem 0;
`;

const DropdownHeader = styled.div`
  display: flex;
  align-items: center;
  text-transform: uppercase;
  cursor: pointer;
`;

const CurrentChoice = styled.div`
  color: ${(props) => props.theme.accent};
`;

const DropdownList = styled.div`
  position: absolute;
  right: 0;
  display: flex;
  flex-direction: column;
  background: ${(props) => props.theme.background_primary};
  border: 1px solid ${(props) => props.theme.text_secondary};
  max-height: 30rem;
  z-index: 5;
`;

const Option = styled.button`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: 0.75rem;
  align-items: center;
  padding: 0.35rem 1rem;
  justify-items: start;
  color: ${(props) => props.theme.text_secondary};

  &:hover {
    background: ${(props) => props.theme.background_hover};
  }
`;

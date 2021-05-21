import React, { useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import useDropdown from "../../hooks/useDropdown";
import { ReactComponent as IconDown } from "../../assets/icons/arrow-down.svg";

function Layout({ send }) {
  const dropdownRef = useRef();
  const {
    isDropdownOpen,
    setIsDropdownOpen,
    handleChoice,
    current,
  } = useDropdown(dropdownRef, "preview");

  return (
    <Dropdown ref={dropdownRef}>
      <DropdownHeader
        isDropdownOpen={isDropdownOpen}
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        Appearance:
        {"\u00A0"}
        <CurrentChoice>{current}</CurrentChoice>
        <IconDown />
      </DropdownHeader>

      {isDropdownOpen && (
        <DropdownList>
          <Option
            type="button"
            onClick={() => {
              handleChoice("preview");
              send("preview");
            }}
          >
            Preview
          </Option>
          <Option
            type="button"
            onClick={() => {
              handleChoice("list");
              send("list");
            }}
          >
            List
          </Option>
        </DropdownList>
      )}
    </Dropdown>
  );
}

export default Layout;

Layout.propTypes = {
  send: PropTypes.func.isRequired,
};

const Dropdown = styled.div`
  position: relative;
  display: inline-block;
  z-index: 2;
  color: ${(props) => props.theme.text_secondary};
  align-self: flex-start;
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
  z-index: 3;
`;

const Option = styled.button`
  padding: 0.35rem 1rem;
  background: ${(props) => props.theme.background_primary};
  color: ${(props) => props.theme.text_secondary};
  text-align: start;

  &:hover {
    background: ${(props) => props.theme.background_hover};
  }
`;

import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import useDropdown from '../../hooks/useDropdown';
import { ReactComponent as IconDown } from '../../assets/icons/arrow-down.svg';
import SortInterface from '../../types/Sort';

interface Props {
  send: (args: SortInterface) => void,
}

function Sort({ send }: Props) {
  const [sort, setSort] = useState<SortInterface>({
    sort_by: 'date',
    order: 'desc',
  });
  const dropdownRef = useRef<HTMLDivElement>(null);
  const {
    isDropdownOpen,
    setIsDropdownOpen,
    handleChoice,
    current,
  } = useDropdown(dropdownRef, 'Latest');

  useEffect(() => {
    send(sort);
  }, [sort]);

  return (
    <Dropdown ref={dropdownRef}>
      <DropdownHeader
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        Sort by:
        {'\u00A0'}
        <CurrentChoice>{current}</CurrentChoice>
        <IconDown />
      </DropdownHeader>

      {isDropdownOpen && (
        <DropdownList>
          <Option
            type="button"
            onClick={() => {
              handleChoice('Latest');
              setSort({
                sort_by: 'date',
                order: 'desc',
              });
            }}
          >
            Latest
          </Option>
          <Option
            type="button"
            onClick={() => {
              handleChoice('Earliest');
              setSort({
                sort_by: 'date',
                order: 'asc',
              });
            }}
          >
            Earliest
          </Option>
          <Option
            type="button"
            onClick={() => {
              handleChoice('Name (A - Z)');
              setSort({
                sort_by: 'alphabetical',
                order: 'asc',
              });
            }}
          >
            Name (A - Z)
          </Option>
          <Option
            type="button"
            onClick={() => {
              handleChoice('Name (Z - A)');
              setSort({
                sort_by: 'alphabetical',
                order: 'desc',
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
  z-index: 1;
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
  min-width: 110%; // Name A-Z takes 2 lines otherwise.
  z-index: 2;
`;

const Option = styled.button`
  padding: 0.35rem 1rem;
  color: ${(props) => props.theme.text_secondary};
  text-align: start;

  &:hover {
    background: ${(props) => props.theme.background_hover};
  }
`;

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// Icons
import check from '../../../assets/icons/check.svg';
import { ReactComponent as IconDown } from '../../../assets/icons/arrow-down.svg';

function List({
  select, selected, options, heading,
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(true);
  return (
    <Container>
      <Subheading onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
        {heading}
        <IconDown />
      </Subheading>
      {isDropdownOpen
        && options.map((option) => (
          <Label
            key={option._id}
            htmlFor={option._id}
            $checked={selected.includes(option._id)}
          >
            {option.name}
            <Input
              type="checkbox"
              id={option._id}
              name={option._id}
              value={option._id}
              $checked={selected.includes(option._id)}
              onChange={select}
            />
          </Label>
        ))}
    </Container>
  );
}

export default List;

List.propTypes = {
  select: PropTypes.func.isRequired,
  selected: PropTypes.arrayOf(PropTypes.string).isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      name: PropTypes.string,
    }),
  ).isRequired,
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Subheading = styled.button`
  display: flex;
  justify-content: space-between;
  margin: 0.75rem 0;
  text-transform: uppercase;
  text-decoration: underline;
`;

const Label = styled.label`
  position: relative;
  cursor: pointer;

  &:before {
    content: "";
    display: inline-block;
    width: 10px;
    height: 10px;
    border: 1px solid ${(props) => props.theme.text_silent};
    border-radius: 50%;
    margin: 0 0.75rem 0 1.25rem;
  }

  &:after {
    position: absolute;
    left: 1rem;
    top: -2px;
    content: ${(props) => props.$checked && `url(${check})`};
  }
`;

const Input = styled.input`
  display: none;
`;

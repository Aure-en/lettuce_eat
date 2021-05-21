import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import check from "../../../assets/icons/check.svg";

function List({ select, selected, options }) {
  return (
    <Container>
      {options.map((option) => (
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
    })
  ).isRequired,
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
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
    margin: 0 0.5rem 0 1rem;
  }

  &:after {
    position: absolute;
    left: calc(0.75rem - 1px);
    top: -2px;
    content: ${(props) => props.$checked && `url(${check})`};
  }
`;

const Input = styled.input`
  display: none;
`;

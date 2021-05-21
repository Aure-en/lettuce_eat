import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import useFetch from "../../../hooks/useFetch";
import check from "../../../assets/icons/check.svg";

function Filters({ send }) {
  const [selected, setSelected] = useState({
    category: "",
    ingredient: [],
  });

  const { data: categories } = useFetch(
    `${process.env.REACT_APP_API_URL}/categories`
  );
  const { data: ingredients } = useFetch(
    `${process.env.REACT_APP_API_URL}/ingredients`
  );

  const handleCategory = (e) => {
    if (selected.category === e.target.value) {
      setSelected({ ...selected, category: "" });
    } else {
      setSelected({ ...selected, category: e.target.value });
    }
  };

  const handleIngredient = (e) => {
    let ingredient = [...selected.ingredient];
    // If the ingredient is in selected, unchecks.
    if (selected.ingredient.includes(e.target.value)) {
      ingredient = ingredient.filter((item) => item !== e.target.value);
      // Else, adds it to the checked list.
    } else {
      ingredient.push(e.target.value);
    }
    setSelected({ ...selected, ingredient });
  };

  useEffect(() => {
    send(selected);
  }, [selected]);

  return (
    <div>
      <Heading>Filter Recipes</Heading>
      <small>Check the boxes below to narrow recipe search results.</small>

      <Subheading>Recipe Types</Subheading>
      <List>
        {categories &&
          categories.map((category) => (
            <Label
              key={category._id}
              htmlFor={category._id}
              $checked={selected.category === category._id}
            >
              {category.name}
              <Input
                type="checkbox"
                id={category._id}
                name={category._id}
                value={category._id}
                checked={selected.category === category._id}
                onChange={handleCategory}
              />
            </Label>
          ))}
      </List>

      <Subheading>Ingredients</Subheading>
      <List>
        {ingredients &&
          ingredients.map((ingredient) => (
            <Label
              key={ingredient._id}
              htmlFor={ingredient._id}
              $checked={selected.ingredient.includes(ingredient._id)}
            >
              {ingredient.name}

              <Input
                type="checkbox"
                id={ingredient._id}
                name={ingredient._id}
                value={ingredient._id}
                onChange={handleIngredient}
                checked={selected.ingredient.includes(ingredient._id)}
              />
            </Label>
          ))}
      </List>
    </div>
  );
}

export default Filters;

Filters.propTypes = {
  send: PropTypes.func.isRequired,
};

const Container = styled.div``;

const Heading = styled.div`
  font-size: 1.25rem;
  font-weight: 300;
`;

const Subheading = styled.div`
  margin: 0.75rem 0;
  text-transform: uppercase;
  text-decoration: underline;
`;

const List = styled.div`
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

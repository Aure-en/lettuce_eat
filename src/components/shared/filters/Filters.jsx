import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import useFetch from "../../../hooks/useFetch";
import List from "./List";

function Filters({ send }) {
  const [selected, setSelected] = useState({
    category: [],
    ingredient: [],
  });

  const { data: categories } = useFetch(
    `${process.env.REACT_APP_API_URL}/categories`
  );
  const { data: ingredients } = useFetch(
    `${process.env.REACT_APP_API_URL}/ingredients`
  );

  const handleChange = (e, type) => {
    let update = [...selected[type]];
    // If the ingredient is in selected, unchecks.
    if (selected[type].includes(e.target.value)) {
      update = update.filter((item) => item !== e.target.value);
      // Else, adds it to the checked list.
    } else {
      update.push(e.target.value);
    }
    setSelected({ ...selected, [type]: update });
  };

  useEffect(() => {
    send(selected);
  }, [selected]);

  return (
    <div>
      <Heading>Filter Recipes</Heading>
      <small>Check the boxes below to narrow recipe search results.</small>

      <Subheading>Recipe Types</Subheading>
      {categories && (
        <List
          select={(e) => handleChange(e, "category")}
          selected={selected.category}
          options={categories}
        />
      )}

      <Subheading>Ingredients</Subheading>
      {ingredients && (
        <List
          select={(e) => handleChange(e, "ingredient")}
          selected={selected.ingredient}
          options={ingredients}
        />
      )}
    </div>
  );
}

export default Filters;

Filters.propTypes = {
  send: PropTypes.func.isRequired,
};

const Heading = styled.div`
  font-size: 1.25rem;
  font-weight: 300;
`;

const Subheading = styled.div`
  margin: 0.75rem 0;
  text-transform: uppercase;
  text-decoration: underline;
`;

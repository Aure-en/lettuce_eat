import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import useFetch from '../../../hooks/useFetch';
import List from './List';
import Category from '../../../types/Category';
import Ingredient from '../../../types/Ingredient';

interface Props {
  send: (args: {
    category: string[],
    ingredient: string[],
  }) => void,
}

function Filters({ send }: Props) {
  const [selected, setSelected] = useState({
    category: [],
    ingredient: [],
  });

  const { data: categories } = useFetch<Category[]>(
    `${process.env.REACT_APP_API_URL}/categories`,
  );
  const { data: ingredients } = useFetch<Ingredient[]>(
    `${process.env.REACT_APP_API_URL}/ingredients`,
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'category' | 'ingredient',
  ) => {
    let update: string[] = [...selected[type]];
    // If the ingredient is in selected, unchecks.
    if (update.includes(e.target.value)) {
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

      {categories && (
        <List
          select={(e) => { handleChange(e, 'category'); }}
          selected={selected.category}
          options={categories}
          heading="Recipe Types"
        />
      )}

      {ingredients && (
        <List
          select={(e) => handleChange(e, 'ingredient')}
          selected={selected.ingredient}
          options={ingredients}
          heading="Ingredients"
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

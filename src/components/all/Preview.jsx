import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import ImagePreview from "../post/preview/ImagePreview";
import TextPreview from "../post/preview/TextPreview";

function Preview({ posts }) {
  const [organized, setOrganized] = useState();
  const [amount, setAmount] = useState(3);

  // Reorganize posts into several arrays to create the honeycomb effect.
  // It would be nice to find a clean, CSS only solution.
  useEffect(() => {
    let even = true;
    const array = [];
    const copy = [...posts];

    while (copy.length > 0) {
      if (even) {
        array.push(copy.splice(0, amount));
      } else {
        array.push(copy.splice(0, amount - 1));
      }
      even = !even;
    }
    setOrganized(array);
  }, [posts]);

  return (
    <Grid amount={amount}>
      {organized &&
        posts.map((post) => {
          const row = organized.findIndex((row) => row.includes(post)) + 1;
          const column =
            organized
              .find((row) => row.includes(post))
              .findIndex((col) => col === post) + 1;
          return post.images.length > 0 ? (
            <ImagePreview post={post} row={row} column={column} />
          ) : (
            <TextPreview post={post} row={row} column={column} />
          );
        })}
    </Grid>
  );
}

export default Preview;

const Grid = styled.ul`
  display: grid;
  list-style-type: none;
  margin: 0;
  padding: 0;
  grid-template-columns: repeat(${(props) => props.amount * 2}, 1fr);
  grid-gap: 4rem 2rem; // Row must be column *2 to have equal gap
  max-width: 900px;
`;

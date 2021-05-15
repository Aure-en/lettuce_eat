import React, { useState, useEffect } from "react";
import styled from "styled-components";

function Preview({ posts }) {
  const [organized, setOrganized] = useState();
  const [amount, setAmount] = useState(3);

  // Reorganize posts into several arrays to create the honeycomb effect.
  useEffect(() => {
    let even = true;
    const array = [];
    const copy = [...posts];

    while (copy.length !== 0) {
      if (even) {
        array.push(copy.splice(0, amount));
        even = !even;
      }
      array.push(copy.splice(0, amount - 1));
    }
    setOrganized(copy);
  }, [posts]);

  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const reorganized = [
    [1, 2, 3],
    [4, 5],
    [6, 7, 8],
    [9, 10],
  ];

  return (
    <Grid amount={amount}>
      {arr.map((post) => (
        <Item
          row={reorganized.findIndex((row) => row.includes(post)) + 1}
          column={
            reorganized
              .find((row) => row.includes(post))
              .findIndex((col) => col === post) + 1
          }
        >
          <Content>{post}</Content>
        </Item>
      ))}
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
  grid-gap: 4rem 2rem;
`;

const Item = styled.li`
  position: relative;
  grid-row: ${(props) => 2 * props.row - 1} / span 3;
  grid-column: ${(props) =>
      props.row % 2 === 0 ? 2 * props.column : 2 * props.column - 1} / span 2;
  height: 0;
  padding-bottom: 100%;
`;

const Content = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  clip-path: polygon(
    50% 0%,
    0% 25%,
    0% 75%,
    50% 100%,
    100% 75%,
    100% 25%
  ); // Hexagon shape
  background: blue;
  opacity: 0.5;
  font-size: 5rem;
`;

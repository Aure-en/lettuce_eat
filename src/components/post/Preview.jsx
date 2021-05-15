import React from "react";
import styled from "styled-components";

function Preview({ posts }) {
  // Reduce amount per row to give responsiveness.
  return (
    <Grid amount={3}>
      {/* {posts.map((post, index) => (
        <Item key={post._id} index={index + 1} amount={3}>
          <Content>{post.title}</Content>
        </Item>
      ))} */}
      {new Array(9).fill(0).map((elem, index) => (
        <Item key={index} index={index + 1} amount={3}>
          <Content>{index + 1}</Content>
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
  grid-template-columns: repeat(${(props) => props.amount}, 1fr 2fr) 1fr;
  grid-gap: 2rem 4rem; // Grid-gap row is the gutter, grip-gap-column is gutter * 2.
`;

const Item = styled.li`
  position: relative;
  grid-column: ${(props) => {
      if (props.index % props.amount === 0) return props.amount * 2 - 1;
      return (props.index % props.amount) * 2 - 1;
    }} / span 3;
  grid-row: ${(props) => {
      if (
        (props.index % props.amount) % 2 !== 0 ||
        props.index % props.amount === 0
      ) {
        return Math.ceil(props.index / props.amount) * 2 - 1;
      }
      return Math.ceil(props.index / props.amount) * 2;
    }} / span 2;
  height: 0;
  padding-bottom: 90%; // Gives a 9/10 ratio.
`;

const Content = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  clip-path: polygon(
    75% 0,
    100% 50%,
    75% 100%,
    25% 100%,
    0 50%,
    25% 0
  ); // Hexagon shape
  background: blue;
  opacity: 0.5;
`;

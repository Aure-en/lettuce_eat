import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";

function Preview({ posts }) {
  const [organized, setOrganized] = useState();
  const [amount, setAmount] = useState(3);
  const [hovered, setHovered] = useState();

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
        posts.map((post) => (
          <Item
            key={post._id}
            row={organized.findIndex((row) => row.includes(post)) + 1}
            column={
              organized
                .find((row) => row.includes(post))
                .findIndex((col) => col === post) + 1
            }
          >
            <Content
              background={post.images[0]}
              onMouseEnter={() => setHovered(post._id)}
              onMouseLeave={() => setHovered()}
            >
              {hovered === post._id && (
                <>
                  <Overlay />
                  <LinkBtn to={`/posts/${post._id}`}>{post.title}</LinkBtn>
                </>
              )}
            </Content>
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
  grid-gap: 4rem 2rem; // Row must be column *2 to have equal gap
  max-width: 900px;
`;

const Item = styled.li`
  position: relative;
  grid-row: ${(props) => 2 * props.row - 1} / span 3;
  grid-column: ${(props) =>
      props.row % 2 === 0 ? 2 * props.column : 2 * props.column - 1} / span 2;
  height: 0;
  padding-bottom: 110%; // Aspect ratio
`;

const Content = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
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
  background-image: ${(props) => props.background && `url(
    data:${props.background.contentType};base64,${Buffer.from(
      props.background.data
    ).toString("base64")}`});
  background-position: center;
  background-size: cover;

  // Overlay - 1st layer
  &:hover:before {
    position: absolute;
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    background: ${(props) => props.theme.overlay};
    opacity: 0.35;
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  height: 90%;
  background: ${(props) => props.theme.overlay};
  opacity: 0.4;
  clip-path: polygon(50% 0%, 0% 25%, 0% 75%, 50% 100%, 100% 75%, 100% 25%);
`;

const LinkBtn = styled(Link)`
  padding: 0.5rem 1.25rem;
  color: ${(props) => props.theme.text_link};
  background: ${(props) => props.theme.overlay_link};
  z-index: 5;
  text-transform: uppercase;
  font-weight: 0.875rem;
  max-width: 70%;
  text-align: center;
`;

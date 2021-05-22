import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import HoverPreview from "./HoverPreview";
import TextPreview from "./TextPreview";
import useWindowSize from "../../../hooks/useWindowSize";

function Preview({ posts }) {
  const [organized, setOrganized] = useState();

  // Reorganize posts into several arrays to create the honeycomb effect.
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
  }, [posts, amount]);

  return (
    <Grid amount={amount}>
      {organized &&
        posts &&
        posts.map((post) =>
          post.images.length > 0 ? (
            <HoverPreview
              key={post._id}
              post={post}
              row={organized.findIndex((row) => row.includes(post)) + 1}
              column={
                organized.find((row) => row.includes(post)) &&
                organized
                  .find((row) => row.includes(post))
                  .findIndex((col) => col === post) + 1
              }
            />
          ) : (
            <TextPreview
              key={post._id}
              post={post}
              row={organized.findIndex((row) => row.includes(post)) + 1}
              column={
                organized.find((row) => row.includes(post)) &&
                organized
                  .find((row) => row.includes(post))
                  .findIndex((col) => col === post) + 1
              }
            />
          )
        )}
    </Grid>
  );
}

export default Preview;

Preview.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      title: PropTypes.string,
      description: PropTypes.string,
    })
  ).isRequired,
};

const Grid = styled.main`
  display: grid;
  list-style-type: none;
  margin: 0;
  padding: 0;
  grid-template-columns: repeat(${(props) => props.amount * 2}, 1fr);
  grid-gap: ${(props) => (props.amount === 1 ? "1rem" : "4.5rem 2rem")};
  max-width: 900px;
  width: 90vw;
`;

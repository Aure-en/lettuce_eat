import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import HoverPreview from "./HoverPreview";
import ImagePreview from "./ImagePreview";
import TextPreview from "./TextPreview";

/* Hexagonal design:
- Items have an hexagonal shape thanks to clip-path.
- Some JS is used to fit the hexagons together using n-th child.
*/

function Preview({ posts, hover }) {
  return (
    <Grid>
      {posts &&
        posts.map((post) => {
          if (post.images.length > 0) {
            return hover ? (
              <HoverPreview key={post._id} post={post} />
            ) : (
              <ImagePreview key={post._id} post={post} />
            );
          }
          return <TextPreview key={post._id} post={post} />;
        })}
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
  hover: PropTypes.bool,
};

Preview.defaultProps = {
  hover: true,
};

const setRows = (total, number) => {
  let even = true;
  let rows = ``;
  const arr = [...Array(total).keys()];
  const organized = [];

  while (arr.length > 0) {
    if (even) {
      organized.push(arr.splice(0, number));
    } else {
      organized.push(arr.splice(0, number - 1));
    }
    even = !even;
  }

  organized.map((row, index) => {
    row.map((child) => {
      rows += `
        & *:nth-child(${child + 1}) {
          grid-row-start: ${2 * index + 1}
        }
      `;
    });
  });
  return rows;
};

const setColumns = (number) => {
  let columns = ``;
  let counter = 1;
  const even = [...Array(number).keys()];
  const odd = [...Array(number - 1).keys()].map((item) => number + item);

  even.map((column) => {
    columns += `
      & *:nth-child(${2 * number - 1}n + ${column + 1}) {
        grid-column-start: ${counter};
      }
    `;
    counter += 2;
  });

  counter = 2;

  odd.map((column) => {
    columns += `
      & *:nth-child(${2 * number - 1}n + ${column + 1}) {
        grid-column-start: ${counter};
      }
    `;
    counter += 2;
  });
  return columns;
};

const Grid = styled.main`
  display: grid;
  position: relative;
  list-style-type: none;
  margin: 0;
  padding: 0;
  max-width: 900px;
  width: 100%;
  grid-template-columns: repeat(2, 1fr);

  @media all and (min-width: 450px) and (max-width: 599px) {
    grid-template-columns: repeat(4, 1fr);
    ${setRows(10, 2)}
    ${setColumns(2)}
    grid-gap: 4.5rem 2rem;

    & *:nth-child(3n + 3) {
      // 2-1 hexagons per row
      grid-column-start: 2;
    }
  }

  @media all and (min-width: 600px) {
    grid-template-columns: repeat(6, 1fr);
    ${setRows(10, 3)}
    ${setColumns(3)}
    grid-gap: 4.5rem 2rem;

    & *:nth-child(5n + 4) {
      // 3-2 hexagons per row
      grid-column-start: 2;
    }
  }
`;

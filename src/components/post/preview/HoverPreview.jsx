import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";

function HoverPreview({ post }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Item>
      <Content
        background={post.images[0]}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {hovered && (
          <>
            <Overlay />
            <LinkBtn to={`/posts/${post._id}`}>{post.title}</LinkBtn>
          </>
        )}
      </Content>
    </Item>
  );
}

export default HoverPreview;

HoverPreview.propTypes = {
  post: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        contentType: PropTypes.string,
        data: PropTypes.shape({
          type: PropTypes.string,
          data: PropTypes.arrayOf(PropTypes.number),
          name: PropTypes.string,
        }),
      })
    ),
  }).isRequired,
};

const Item = styled.article`
  position: relative;
  grid-column-end: span 2;
  grid-row-end: span 3;
  height: 0;
  padding-bottom: 115%; // Aspect ratio
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
  background-image: ${(props) =>
    props.background &&
    `url(
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
  max-width: 70%;
  text-align: center;
  font-size: 1rem;
`;

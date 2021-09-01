import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Transition } from "react-transition-group";

function HoverPreview({ post }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Item>
      <Content
        background={post.images[0]}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <Transition in={hovered} timeout={0}>
          {(state) => (
            <>
              <Overlay to={`/posts/${post._id}`} $state={state} />
              <LinkBtn to={`/posts/${post._id}`} $state={state}>
                {post.title}
              </LinkBtn>
            </>
          )}
        </Transition>
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
  overflow: hidden;
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
      props.background.thumbnail || props.background.data
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

const Overlay = styled(Link)`
  position: absolute;
  display: block;
  top: ${(props) => (props.$state === "entered" ? "50%" : "75%")};
  left: 50%;
  transform: translate(
    -50%,
    ${(props) => (props.$state === "entered" ? "-50%" : "-25%")}
  );
  opacity: ${(props) => (props.$state === "entered" ? 0.4 : 0)};
  transition: transform 0.2s ease-out, opacity 0.3s ease-out;
  width: 90%;
  height: 90%;
  background: ${(props) => props.theme.overlay};
  clip-path: polygon(50% 0%, 0% 25%, 0% 75%, 50% 100%, 100% 75%, 100% 25%);
`;

const btnLine = `
  content: "";
  display: block;
  position: absolute;
  transition: width 0.2s ease-out;
  height: 2px;
  opacity: 0.6;
`;

const LinkBtn = styled(Link)`
  position: relative;
  padding: 0.5rem 1.25rem;
  color: ${(props) => props.theme.text_link};
  background: ${(props) => props.theme.overlay_link};
  opacity: ${(props) => (props.$state === "entered" ? 1 : 0)};
  transition: opacity 0.3s ease-out;
  z-index: 5;
  text-transform: uppercase;
  max-width: 70%;
  text-align: center;
  font-size: 1rem;

  &:before {
    ${btnLine};
    top: 0;
    left: 0;
    width: ${(props) => (props.$state === "entered" ? "100%" : 0)};
    background: ${(props) => props.theme.background_tertiary};
  }

  &:after {
    ${btnLine};
    bottom: 0;
    right: 0;
    width: ${(props) => (props.$state === "entered" ? "100%" : 0)};
    background: ${(props) => props.theme.background_tertiary};
  }
`;

import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";

function Titles({ posts }) {
  return (
    <Ul>
      {posts.map((post) => (
        <Li key={post._id}>
          <StyledLink to={`/posts/${post._id}`}>{post.title}</StyledLink>
        </Li>
      ))}
    </Ul>
  );
}

export default Titles;

Titles.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
    })
  ).isRequired,
};

const Ul = styled.ul`
  list-style-type: none;
`;

const Li = styled.li`
  line-height: 1.75rem;

  &:before {
    position: relative;
    bottom: 2px;
    content: "⬧";
    color: ${(props) => props.theme.overlay_link};
    margin-right: 1rem;
  }
`;

const StyledLink = styled(Link)`
  position: relative;

  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    right: 0;
    width: 0;
    height: 1px;
    background: linear-gradient(
      to left,
      ${(props) =>
        `${props.theme.gradient_primary} 0%, ${props.theme.gradient_secondary} 100%`}
    );
    transition: width 0.5s cubic-bezier(0.25, 1, 0.5, 1);
  }

  &:hover:after {
    left: 0;
    right: auto;
    width: 100%;
  }
`;

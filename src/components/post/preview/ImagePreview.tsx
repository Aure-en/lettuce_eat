import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Post from '../../../types/Post';

interface Props {
  post: Post,
}

function ImagePreview({ post }: Props) {
  return (
    <Item key={post._id}>
      <Link to={`/posts/${post._id}`}>
        <Content $background={post.images && post.images[0]}>
          <Name>{post.title}</Name>
        </Content>
      </Link>
    </Item>
  );
}

export default ImagePreview;

ImagePreview.propTypes = {
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
      }),
    ),
  }).isRequired,
};

interface Background {
  $background: {
    contentType: string,
    thumbnail: Buffer,
    data: Buffer,
    size: number,
  } | undefined,
}

const Item = styled.article`
  position: relative;
  grid-column-end: span 2;
  grid-row-end: span 3;
  height: 0;
  padding-bottom: 110%; // Aspect ratio
`;

const Content = styled.div<Background>`
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
  background-image: ${(props) => props.$background
    && `url(
    data:${props.$background.contentType};base64,${Buffer.from(
  props.$background.thumbnail || props.$background.data,
).toString('base64')}`});
  background-position: center;
  background-size: cover;
`;

const Name = styled.span`
  position: absolute;
  bottom: 25%;
  display: inline-block;
  padding: 0.5rem 1.25rem;
  color: ${(props) => props.theme.text_link};
  background: ${(props) => props.theme.overlay_link};
  z-index: 5;
  text-transform: uppercase;
  max-width: 70%;
  text-align: center;
  font-family: "Source Sans Pro", "Barlow", sans-serif;
  font-size: 1rem;
`;

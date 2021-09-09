import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Transition } from 'react-transition-group';
import Post from '../../../types/Post';

// Icons
import { ReactComponent as NotebookIcon } from '../../../assets/icons/preview/notebook.svg';
import { ReactComponent as ArrowIcon } from '../../../assets/icons/preview/arrow-right.svg';

interface Props {
  post: Post,
}

function TextPreview({ post }: Props) {
  const [hover, setHovered] = useState(false);

  return (
    <Item
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link to={`/posts/${post._id}`}>
        <Content>
          <Decoration>
            <Hexagon>
              <NotebookIcon />
            </Hexagon>
          </Decoration>

          <Text>
            <Title>{post.title}</Title>
            <p>{post.description}</p>
          </Text>

          <Transition in={hover} timeout={0}>
            {(state: string) => (
              <HexagonArrow $state={state}>
                <ArrowIcon />
              </HexagonArrow>
            )}
          </Transition>
        </Content>
      </Link>
    </Item>
  );
}

export default TextPreview;

TextPreview.propTypes = {
  post: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
};

const Item = styled.article`
  position: relative;
  height: 0;
  grid-column-end: span 2;
  grid-row-end: span 3;
  padding-bottom: 115%; // Aspect ratio
`;

const Content = styled.div`
  position: absolute; // Position absolute is needed for height: 100% to work.
  top: 0;
  left: 0;
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
  display: flex;
  justify-content: center;
  background: ${(props) => props.theme.background_secondary};

  // Fade
  &:after {
    position: absolute;
    bottom: 0;
    height: 100%;
    width: 100%;
    content: "";
    background: linear-gradient(
      to top,
      ${(props) => props.theme.background_primary} 20%,
      transparent 80%
    );
  }
`;

const Hexagon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.75rem;
  background: ${(props) => props.theme.text_preview_accent};
  color: ${(props) => props.theme.text_secondary};
  clip-path: polygon(
    50% 0%,
    0% 25%,
    0% 75%,
    50% 100%,
    100% 75%,
    100% 25%
  ); // Hexagon shape
  z-index: 1;
`;

interface StateProps {
  $state: string,
}

const HexagonArrow = styled(Hexagon)<StateProps>`
  position: absolute;
  bottom: 7.5%;
  transform: translateY(
    ${(props) => (props.$state === 'entered' ? '0' : '25%')}
  );
  opacity: ${(props) => (props.$state === 'entered' ? '1' : '0')};
  transition: transform 0.2s ease-out, opacity 0.3s linear;
`;

const line = `
  content: "";
  position: absolute;
  width: 3px;
  height: 3px;
  top: 2rem;
  box-sizing: content-box;
  opacity: 0.8;
`;

const Decoration = styled.span`
  position: absolute;
  top: 7.5%;

  &:before {
    ${line}
    border-right: 2rem solid ${(props) => props.theme.text_preview_accent};
    border-left: 4px solid ${(props) => props.theme.text_preview_accent};
    left: -3.5rem;
    transform: rotate(-30deg);
  }

  &:after {
    ${line}
    border-left: 2rem solid ${(props) => props.theme.text_preview_accent};
    border-right: 4px solid ${(props) => props.theme.text_preview_accent};
    right: -3.5rem;
    transform: rotate(30deg);
  }
`;

const Text = styled.div`
  position: absolute;
  bottom: 20%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 60%;
  height: 50%;
`;

const Title = styled.div`
  padding: 0.1rem 0.5rem;
  align-self: center;
  text-align: center;
  text-transform: uppercase;
  font-style: italic;
  background: ${(props) => props.theme.text_preview_title};
  color: ${(props) => props.theme.text_secondary};
`;

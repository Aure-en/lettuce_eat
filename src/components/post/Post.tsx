import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import redraft from 'redraft';
import renderers from '../shared/renderers';
import PostInterface from '../../types/Post';

interface Props {
  post: PostInterface,
}

function Post({ post }: Props) {
  return (
    <Container>
      <Header>
        <Heading>{post.title}</Heading>
        <div>{post.description}</div>
      </Header>

      {post.images && post.images.length > 0 && (
        <Image
          src={`data:${post.images[0].contentType};base64,${Buffer.from(
            post.images[0].data,
          ).toString('base64')}`}
          alt={post.title}
        />
      )}

      <div>
        <Informations>
          {post.prep_time && (
            <Information>
              <Detail>Prep Time:</Detail>
              <span>
                {' '}
                {post.prep_time}
              </span>
            </Information>
          )}
          {post.cook_time && (
            <Information>
              <Detail>Cook Time:</Detail>
              <span>
                {' '}
                {post.cook_time}
              </span>
            </Information>
          )}
          {post.serves && (
            <Information>
              <Detail>Serves:</Detail>
              <span>
                {' '}
                {post.serves}
              </span>
            </Information>
          )}
        </Informations>
        <Recipe>{redraft(JSON.parse(post.text), renderers)}</Recipe>
      </div>
    </Container>
  );
}

export default Post;

Post.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        contentType: PropTypes.string,
        data: PropTypes.shape({
          type: PropTypes.string,
          data: PropTypes.arrayOf(PropTypes.number),
        }),
      }),
    ),
    prep_time: PropTypes.string,
    cook_time: PropTypes.string,
    serves: PropTypes.string,
    text: PropTypes.string,
  }).isRequired,
};

const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 1rem;
`;

const Heading = styled.h1`
  font-size: 1.5rem;
  font-weight: 400;
  margin: 0.5rem 0;
`;

const Header = styled.div`
  text-align: center;
`;

const Image = styled.img`
  max-height: 40rem;
  max-width: 100%;
  margin: 1rem 0;
`;

const Informations = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  font-size: 0.875rem;
  justify-items: center;
  margin: 0 auto;

  @media all and (min-width: 576px) {
    width: 65%;
  }
`;

const Information = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Detail = styled.span`
  font-style: italic;
  text-decoration: underline;
`;

const Recipe = styled.div`
  text-align: justify;
`;

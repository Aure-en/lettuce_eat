import React from 'react';
import styled from 'styled-components';
import Preview from '../post/preview/Preview';
import useFetch from '../../hooks/useFetch';

function Latest() {
  const { data: posts, error } = useFetch(
    `${process.env.REACT_APP_API_URL}/posts?page=1&limit=10`,
  );

  if (error) {
    return <div>{error}</div>;
  }

  if (posts) {
    return (
      <Container>
        <Preview posts={posts} />
      </Container>
    );
  }

  return <></>;
}

export default Latest;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2rem 0;
  width: 100%;
`;

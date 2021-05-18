import React from "react";
import styled from "styled-components";
import useFetch from "../../hooks/useFetch";
import Preview from "../post/preview/Preview";

function Latest() {
  const { data, error } = useFetch(
    `${process.env.REACT_APP_API_URL}/posts?page=1&limit=10`
  );

  if (error) {
    return <div>{error}</div>;
  }

  if (data) {
    return (
      <Container>
        <Preview posts={data} amount={3} />
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
  align-self: stretch;
  margin: 2rem 0;
`;
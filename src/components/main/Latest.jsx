import React from "react";
import styled from "styled-components";
import useFetch from "../../hooks/useFetch";
import Preview from "./Preview";

function Latest() {
  const { data, error } = useFetch(
    `${process.env.REACT_APP_API_URL}/posts?page=1&limit=10`
  );

  if (error) {
    return <div>{error}</div>;
  }

  if (data) {
    return <Preview posts={data} />;
  }

  return <></>;
}

export default Latest;

import React from "react";
import Preview from "../post/preview/Preview";
import useFetch from "../../hooks/useFetch";

function List() {
  const { data: posts } = useFetch(
    `${process.env.REACT_APP_API_URL}/posts?page=1&limit=10`
  );

  return <div>{posts && <Preview posts={posts} />}</div>;
}

export default List;

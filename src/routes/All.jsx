import React from "react";
import Preview from "../components/all/Preview";
import useFetch from "../hooks/useFetch";

function All() {
  const { data, error } = useFetch(
    `${process.env.REACT_APP_API_URL}/posts?page=1&limit=10`
  );
  return <>{data && <Preview posts={data} />}</>;
}

export default All;

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Preview from "../post/preview/Preview";
import Titles from "./Titles";
import useFetch from "../../hooks/useFetch";

function List({ queries, layout }) {
  const [limit, setLimit] = useState(10);
  const initial = `${process.env.REACT_APP_API_URL}/posts?page=1&limit=${limit}`;
  const [url, setUrl] = useState(initial);
  const { data: posts } = useFetch(url);

  useEffect(() => {
    // Add queries to the url
    // useFetch is then executed and fetches the corresponding posts.
    let url = initial;

    // If there are no queries, set the initial url and returns.
    if (Object.keys(queries).length === 0) {
      setUrl(initial);
      return;
    }

    Object.keys(queries).map((query) => {
      if (queries[query] instanceof Array && queries[query].length > 0) {
        url += `&${query}=${queries[query].join(",")}`;
      } else if (!(queries[query] instanceof Array) && queries[query] !== "") {
        url += `&${query}=${queries[query]}`;
      }
    });
    setUrl(url);
    console.log(url);
  }, [queries, limit]);

  // If we are displaying image preview, only display posts 10 per page.
  // If we are displaying the recipe names only, display 100 posts per page.
  useEffect(() => {
    layout === "preview" ? setLimit(10) : setLimit(100);
  }, [layout]);

  if (posts && posts.length === 0) {
    return (
      <div>Sorry, there are no recipes fulfilling those conditions yet.</div>
    );
  }

  return (
    <>
      {posts &&
        (layout === "preview" ? (
          <Preview posts={posts} />
        ) : (
          <Titles posts={posts} />
        ))}
    </>
  );
}

export default List;

List.propTypes = {
  queries: PropTypes.shape({
    sort_by: PropTypes.string,
    search: PropTypes.string,
    order: PropTypes.oneOf(["asc", "desc"]),
    ingredients: PropTypes.arrayOf(PropTypes.string),
  }),
  layout: PropTypes.oneOf(["preview", "list"]),
};

List.defaultProps = {
  queries: {},
  layout: "preview",
};

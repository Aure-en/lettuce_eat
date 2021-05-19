import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Preview from "../post/preview/Preview";
import useFetch from "../../hooks/useFetch";

function List({ queries }) {
  const initial = `${process.env.REACT_APP_API_URL}/posts?page=1&limit=10`;
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
  }, [queries]);

  return <>{posts && <Preview posts={posts} />}</>;
}

export default List;

List.propTypes = {
  queries: PropTypes.shape({
    sort_by: PropTypes.string,
    search: PropTypes.string,
    order: PropTypes.oneOf(["asc", "desc"]),
    ingredients: PropTypes.arrayOf(PropTypes.string)
  }),
};

List.defaultProps = {
  queries: {},
};


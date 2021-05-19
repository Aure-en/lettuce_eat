import React, { useState } from "react";
import PropTypes from "prop-types";
import useFetch from "../../hooks/useFetch";
import Sort from "../shared/Sort";
import Preview from "../post/preview/Preview";

function Category({ categoryId }) {
  const initial = `${process.env.REACT_APP_API_URL}/categories/${categoryId}/posts`;
  const [url, setUrl] = useState(initial);
  const { data, loading } = useFetch(url);

  return (
    <>
      <Sort
        send={(query) =>
          setUrl(`${initial}?sort_by=${query.sort}&order=${query.order}`)
        }
      />
      {!loading && data && <Preview posts={data} />}
      {/* Loading prevents screen jump when loading new data */}
    </>
  );
}

export default Category;

Category.propTypes = {
  categoryId: PropTypes.string.isRequired,
};

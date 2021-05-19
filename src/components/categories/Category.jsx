import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import useFetch from "../../hooks/useFetch";
import Sort from "../shared/Sort";
import Preview from "../post/preview/Preview";

function Category({ categoryId }) {
  const initial = `${process.env.REACT_APP_API_URL}/categories/${categoryId}/posts`;
  const [url, setUrl] = useState(initial);
  const { data, loading } = useFetch(url);

  return (
    <Container>
      <SortContainer>
        <Sort
          send={(query) =>
            setUrl(`${initial}?sort_by=${query.sort}&order=${query.order}`)
          }
        />
      </SortContainer>
      {!loading && data && <Preview posts={data} />}
      {/* Loading prevents screen jump when loading new data */}
    </Container>
  );
}

export default Category;

Category.propTypes = {
  categoryId: PropTypes.string.isRequired,
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 900px;
  width: 100vw;
`;

const SortContainer = styled.div`
  align-self: flex-end;
  margin: 1rem 0;
`;

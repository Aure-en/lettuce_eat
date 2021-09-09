import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import useFetch from '../../hooks/useFetch';
import Preview from '../post/preview/Preview';
import Titles from '../post/preview/Titles';
import Pagination from '../shared/Pagination';
import Post from '../../types/Post';

interface Props {
  type: string,
  category: {
    _id: string,
    name: string,
  },
  page: string,
  layout: 'preview' | 'list',
  sort: {
    sort_by: 'alphabetical' | 'date',
    order: 'asc' | 'desc',
  },
}

function Posts({
  type, category, page, layout, sort,
}: Props) {
  const [limit, setLimit] = useState(10);
  const initial = `${process.env.REACT_APP_API_URL}/${type}/${category._id}/posts?page=${page}&limit=${limit}`;
  const [url, setUrl] = useState(initial);
  const { data: posts, count, loading } = useFetch<Post[]>(url);

  // Update url when page changes
  useEffect(() => {
    let url = initial;
    url += `&sort_by=${sort.sort_by}&order=${sort.order}`;
    setUrl(url);
  }, [page, sort, limit]);

  // Update number of posts displayed when updating layout
  useEffect(() => {
    if (layout === 'preview') {
      setLimit(10);
    } else {
      setLimit(20);
    }
  }, [layout]);

  return (
    <Container>
      {/* Loading prevents screen jump when loading new data */}
      {!loading && (
        <>
          {posts
            && (layout === 'preview' ? (
              <Preview posts={posts} />
            ) : (
              <Titles posts={posts} />
            ))}
          {Math.ceil(count / limit) > 1 && (
            <Pagination
              current={page}
              total={Math.ceil(count / limit)}
              url={`/categories/${category.name.toLowerCase()}`}
            />
          )}
        </>
      )}
    </Container>
  );
}

export default Posts;

Posts.propTypes = {
  type: PropTypes.string.isRequired,
  category: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
  page: PropTypes.string,
  layout: PropTypes.string,
  sort: PropTypes.shape({
    sort_by: PropTypes.string,
    order: PropTypes.string,
  }),
};

Posts.defaultProps = {
  page: '1',
  layout: 'preview',
  sort: {
    sort_by: 'date',
    order: 'desc',
  },
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 900px;
  width: 100%;
`;

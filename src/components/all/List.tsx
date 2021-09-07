import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import Preview from '../post/preview/Preview';
import Titles from '../post/preview/Titles';
import Pagination from '../shared/Pagination';
import useFetch from '../../hooks/useFetch';
import Queries from '../../types/Queries';
import Post from '../../types/Post';

interface Props {
  queries: Queries,
  layout: 'preview' | 'list',
  page: string,
}

function List({ queries, layout, page }: Props) {
  const [limit, setLimit] = useState<number>(10);
  const initial = `${process.env.REACT_APP_API_URL}/posts?page=${page}&limit=${limit}`;
  const [url, setUrl] = useState<string>(initial);
  const { data: posts, count, loading } = useFetch<Post[]>(url);
  const history = useHistory();

  useEffect(() => {
    // Add queries to the url
    // useFetch is then executed and fetches the corresponding posts.
    let url = initial;

    // If there are no queries, set the initial url and returns.
    if (Object.keys(queries).length === 0) {
      setUrl(initial);
      return;
    }

    (Object.keys(queries) as Array<keyof Queries>).forEach((query: keyof Queries) => {
      if (queries[query] instanceof Array && (queries[query] as string[]).length > 0) {
        url += `&${query}=${(queries[query] as string[]).join(',')}`;
      } else if (!(queries[query] instanceof Array) && queries[query] !== '') {
        url += `&${query}=${queries[query]}`;
      }
    });
    setUrl(url);
  }, [queries, limit, page]);

  // If we are displaying image preview, only display posts 10 per page.
  // If we are displaying the recipe names only, display 100 posts per page.
  useEffect(() => {
    if (layout === 'preview') {
      setLimit(10);
    } else {
      setLimit(20);
    }
  }, [layout]);

  useEffect(() => {
    history.push('/recipes');
  }, [queries]);

  if (!loading && posts && posts.length === 0) {
    return (
      <div>Sorry, there are no recipes fulfilling those conditions yet.</div>
    );
  }

  return (
    <Container>
      {posts
        && (layout === 'preview' ? (
          <Preview posts={posts} hover={false} />
        ) : (
          <Titles posts={posts} />
        ))}

      {Math.ceil(count / limit) > 1 && (
        <Pagination
          current={page}
          total={Math.ceil(count / limit)}
          url="/recipes"
        />
      )}
    </Container>
  );
}

export default List;

List.propTypes = {
  queries: PropTypes.shape({
    sort_by: PropTypes.string,
    search: PropTypes.string,
    order: PropTypes.oneOf(['asc', 'desc']),
    ingredients: PropTypes.arrayOf(PropTypes.string),
  }),
  layout: PropTypes.oneOf(['preview', 'list']),
  page: PropTypes.string,
};

List.defaultProps = {
  queries: {},
  layout: 'preview',
  page: '1',
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

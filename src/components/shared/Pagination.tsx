import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

interface Props {
  current: string,
  total: number,
  url: string,
}

function Pagination({ current, total, url }: Props) {
  return (
    <Container>
      <Previous>
        {[...Array(current).keys()].map((page) => (page + 1 === current ? (
          <Page key={page + 1} $current>
            {page + 1}
          </Page>
        ) : (
          <Page key={page + 1}>
            <Link to={`${url}/${page + 1}`}>{page + 1}</Link>
          </Page>
        )))}
      </Previous>
      <Next>
        {[...Array(total).keys()].slice(current).map((page) => (
          <Page key={page + 1}>
            <Link to={`${url}/${page + 1}`}>{page + 1}</Link>
          </Page>
        ))}
      </Next>
    </Container>
  );
}

export default Pagination;

Pagination.propTypes = {
  current: PropTypes.number,
  total: PropTypes.number,
  url: PropTypes.string.isRequired,
};

Pagination.defaultProps = {
  current: 1,
  total: 1,
};

const Container = styled.div`
  display: flex;
  margin: 2rem 0;
`;

const Previous = styled.ul`
  display: flex;
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const Next = styled(Previous)`
  display: flex;
  align-items: center;

  &:before {
    content: "";
    width: 3rem;
    height: 1px;
    background: ${(props) => props.theme.text_secondary};
    opacity: 0.5;
    margin: 0 0.5rem;
  }
`;

const Page = styled.li`
  margin: 0 0.5rem;

  &:hover {
    color: ${(props) => !props.$current && props.theme.input_border};
  }
`;

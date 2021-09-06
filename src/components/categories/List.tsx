import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

interface Props {
  title: string,
  type: string,
  data: {
    name: string,
    _id: string,
  }
}

function List({ title, type, data }: Props) {
  return (
    <>
      <Header>
        <Heading>{title}</Heading>
      </Header>
      <Ul>
        {data.map((item) => (
          <Li key={item._id}>
            <StyledLink to={`/${type}/${item.name.toLowerCase()}`}>
              {item.name}
            </StyledLink>
          </Li>
        ))}
      </Ul>
    </>
  );
}

export default List;

List.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      _id: PropTypes.string,
    }),
  ).isRequired,
};

const Header = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  &:after {
    content: "";
    position: absolute;
    bottom: 1rem;
    right: 0;
    width: 100%;
    height: 1px;
    background: linear-gradient(
      to left,
      ${(props) => `${props.theme.gradient_primary} 0%, ${props.theme.gradient_secondary} 100%`}
    );
    z-index: -1;
  }
`;

const Heading = styled.h2`
  text-transform: capitalize;
  font-weight: 300;
`;

const Ul = styled.ul`
  display: grid;
  list-style-type: none;

  @media all and (min-width: 400px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media all and (min-width: 550px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Li = styled.li`
  line-height: 1.75rem;

  &:before {
    position: relative;
    bottom: 2px;
    content: "⬧";
    color: ${(props) => props.theme.background_tertiary};
    margin-right: 1rem;
  }
`;

const StyledLink = styled(Link)`
  position: relative;

  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    right: 0;
    width: 0;
    height: 1px;
    background: linear-gradient(
      to left,
      ${(props) => `${props.theme.gradient_primary} 0%, ${props.theme.gradient_secondary} 100%`}
    );
    transition: width 0.5s cubic-bezier(0.25, 1, 0.5, 1);
  }

  &:hover:after {
    left: 0;
    right: auto;
    width: 100%;
  }
`;

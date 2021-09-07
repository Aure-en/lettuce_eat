import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Sidebar from './Sidebar';
import { ReactComponent as IconDown } from '../../../assets/icons/arrow-down.svg';
import LayoutType from '../../../types/Layout';
import Queries from '../../../types/Queries';

interface Props {
  setQueries: (query: Partial<Queries>) => void,
  setLayout: (layout: LayoutType) => void,
}

function Dropdown({ setQueries, setLayout }: Props) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  return (
    <Container>
      <Button type="button" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
        Narrow down your research
        <IconDown />
      </Button>

      <Content $isDropdownOpen={isDropdownOpen}>
        <Sidebar setQueries={setQueries} setLayout={setLayout} />
        <Close type="button" onClick={() => setIsDropdownOpen(false)}>
          Close
        </Close>
      </Content>
    </Container>
  );
}

export default Dropdown;

Dropdown.propTypes = {
  setQueries: PropTypes.func.isRequired,
  setLayout: PropTypes.func.isRequired,
};

interface DropdownProps {
  $isDropdownOpen: boolean,
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;
`;

const Content = styled.div<DropdownProps>`
  display: ${(props) => (props.$isDropdownOpen ? 'flex' : 'none')};
  flex-direction: column;
  align-items: center;
  margin: 1rem 0;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  border: 1px solid ${(props) => props.theme.input_border};

  & > svg {
    margin-left: 0.5rem;
    margin-top: 1px;
  }
`;

const Close = styled(Button)`
  background: ${(props) => props.theme.accent};
  color: ${(props) => props.theme.text_tertiary};
  text-transform: uppercase;
  margin: 1rem 0;
`;

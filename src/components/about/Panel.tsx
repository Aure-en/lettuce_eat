import React, { useState } from 'react';
import styled from 'styled-components';
import About from './About';
import { ReactComponent as NotebookIcon } from '../../assets/icons/panel/notebook.svg';

function Panel() {
  const [active, setActive] = useState(false);

  return (
    <Container
      type="button"
      onClick={() => setActive(!active)}
      $active={active}
    >
      <Content>
        <Inner>
          <About />
        </Inner>
      </Content>
      <Icon $active={active}>
        <NotebookIcon />
      </Icon>
    </Container>
  );
}

export default Panel;

interface ActiveProps {
  $active: boolean,
}

const Container = styled.button<ActiveProps>`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  background: ${(props) => props.theme.background_tertiary};
  display: none;
  transform: translateX(
    ${(props) => (props.$active ? '0' : 'calc(-100% + 6rem)')}
  );
  transition: transform 0.5s ease-out;
  z-index: 10;
  border-right: 1px solid ${(props) => props.theme.background_primary};
  padding: 0;

  & > * {
    z-index: 10;
  }

  @media all and (min-width: 768px) {
    display: flex;
    align-items: center;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: calc(100vw - 6rem);
  max-width: 25rem;
  padding: 0 2rem;
`;

const Inner = styled.div`
  border: 3px solid ${(props) => props.theme.text_tertiary};
  padding: 2rem;
  background: ${(props) => props.theme.panel_left_bg};
  width: 100%;
`;

const Icon = styled.span<ActiveProps>`
  width: ${(props) => (props.$active ? '0' : '6rem')};
  color: ${(props) => props.theme.panel_left_icon};
  transition: width 0.5s linear;
  overflow: hidden;
`;

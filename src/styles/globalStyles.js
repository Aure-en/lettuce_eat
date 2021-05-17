import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

  *, *:before, *:after {
    box-sizing: border-box;
  }

  body {
    font-family: 'Roboto Slab', serif;
    background: ${({ theme }) => theme.bg_app};
    color: ${({ theme }) => theme.text_primary};
    line-height: 1.25rem;
    font-weight: 300;
    font-size: 0.875rem;
  }

  a {
    text-decoration: none;
  }

`;

export default GlobalStyles;

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
    color: inherit;
    text-decoration: none;
  }

  input,
  textarea {
    line-height: 1.25rem;
    font-weight: 300;
    font-size: 0.875rem;
  }

  input:focus,
  textarea:focus,
  button:focus {
    outline: 1px solid transparent;
  }

`;

export default GlobalStyles;

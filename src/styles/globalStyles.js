import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

  *, *:before, *:after {
    box-sizing: border-box;
  }

  body {
    font-family: 'Source Sans Pro', sans-serif;
    background: ${({ theme }) => theme.bg_app};
    color: ${({ theme }) => theme.text_primary};
    line-height: 1.25rem;
    font-weight: 300;
    font-size: 0.9375rem;
  }

  strong {
    font-weight: bold;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    font-family: 'Source Sans Pro', sans-serif;
  }

  input,
  textarea {
    line-height: 1.25rem;
    font-weight: 300;
    font-size: 0.9375rem;
  }

  input:focus,
  textarea:focus,
  button:focus {
    outline: 1px solid transparent;
  }

`;

export default GlobalStyles;

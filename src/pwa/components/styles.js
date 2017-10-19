import { injectGlobal } from 'styled-components';
import normalize from 'styled-normalize';

export default injectGlobal`
  ${normalize}

  html {
    font-size: 16px;
  }

  html, * {
    font-family: -apple-system, BlinkMacSystemFont,"Segoe UI","Roboto", "Droid Sans","Helvetica Neue", Helvetica, Arial, sans-serif;
    line-height: 1.5;
  }

  * {
    font-size: 1rem;
  }

  body {
    background-color: #FFF;
  }

  h1, h2, h3, h4, h5, h6 {
    line-height: 1.25em;
    font-weight: 500;
  }

  h1 {
    font-size: 2.4375rem;
  }

  h2 {
    font-size: 1.935rem;
  }

  h3 {
    font-size: 1.5625rem;
  }

  h4 {
    font-size: 1.25rem;
  }

  h5 {
    font-size: 1rem;
  }

  h6 {
    font-size: 0.8125rem;
  }
`;

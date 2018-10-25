import React from 'react';
import { shape, bool, string, node, arrayOf, number } from 'prop-types';
import { inject } from 'mobx-react';
import styled, { css } from 'styled-components';

const Reviewer = ({ reviewerTheme, linkStyles, scores, children }) => (
  <Container
    reviewerTheme={reviewerTheme}
    linkStyles={linkStyles}
    scores={scores}
  >
    {children}
  </Container>
);

Reviewer.propTypes = {
  reviewerTheme: string.isRequired,
  linkStyles: shape({
    color: string,
    bold: bool,
    underline: bool,
  }),
  children: node.isRequired,
  scores: arrayOf(number),
};

Reviewer.defaultProps = {
  linkStyles: {},
  scores: [],
};

export default inject(({ stores: { settings } }) => ({
  linkStyles: settings.theme.linkStyles,
}))(Reviewer);

const rwpThemeOne = css`
  .rwp-title {
    font-size: 1.5rem;
    em {
      font-style: normal;
    }
  }

  .rwp-header {
    .rwp-overalls {
      display: flex;
      justify-content: center;

      .rwp-overall-score {
        border-radius: 4px;
        margin: 10px 0;
        background-color: ${({ theme, linkStyles }) =>
          linkStyles.color || theme.colors.link};
        color: ${({ theme }) => theme.colors.white};
        width: 6rem;
        height: 6rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .rwp-overlall-score-value {
          font-size: 2.5rem;
          line-height: 2.5rem;
          font-weight: 700;
        }

        .rwp-overlall-score-label {
          font-size: 1rem;
          text-transform: uppercase;
        }
      }
    }

    .rwp-pros-wrap,
    .rwp-cons-wrap {
      .rwp-pros-label,
      .rwp-cons-label {
        font-weight: 700;
        color: ${({ theme, linkStyles }) =>
          linkStyles.color || theme.colors.link};
        text-transform: uppercase;
      }
    }
  }

  .rwp-scores {
    margin-top: 20px;

    .rwp-criterion {
      margin: 5px 0;

      .rwp-criterion-text {
        padding: 0 5px;
        display: flex;
        justify-content: space-between;
      }

      .rwp-criterion-bar-base {
        border-radius: 4px;
        margin: 3px 0 6px 0;
        height: 0.8em;
        background-color: #ccc;

        /* Renders score bar styles for different scores */
        ${({ scores }) =>
          scores.map(
            score => css`
              .rwp-score-bar[data-score="${score}"] {
                border-radius: 4px;
                height: 0.8em;
                width: ${score}%;
                background-color: ${({ theme, linkStyles }) =>
                  linkStyles.color || theme.colors.link};
              }
            `,
          )};
      }
    }
  }
`;

const Container = styled.div`
  ${({ reviewerTheme }) => {
    if (reviewerTheme === 'rwp-theme-1') return rwpThemeOne;
    return null;
  }};
`;

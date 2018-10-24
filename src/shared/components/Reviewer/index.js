import React from 'react';
import { shape, bool, string, node } from 'prop-types';
import { inject } from 'mobx-react';
import styled from 'styled-components';

const Reviewer = ({ scores, reviewerTheme, children, linkStyles }) => (
  <Container reviewerTheme={reviewerTheme} linkStyles={linkStyles}>
    {children}
  </Container>
);

Reviewer.propTypes = {
  children: node.isRequired,
  reviewerTheme: string.isRequired,
  linkStyles: shape({
    color: string,
    bold: bool,
    underline: bool,
  }),
};

Reviewer.defaultProps = {
  linkStyles: {},
};

export default inject(({ stores: { settings } }) => ({
  linkStyles: settings.theme.linkStyles,
}))(Reviewer);

const Container = styled.div`
  .rwp-title {
    font-size: 1.5rem;
    em {
      font-style: normal;
    }
  }

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

  .rwp-scores {
    margin-top: 20px;

    .rwp-criterion {
      margin: 5px 0;

      .rwp-criterion-text {
        display: flex;
        justify-content: space-between;
      }

      .rwp-criterion-bar-base {
        margin: 3px 0 6px 0;
        height: 0.8em;
        background-color: ${({ theme }) => theme.colors.grey};

        .rwp-score-bar {
          height: 0.8em;
          width: 75%;
          background-color: ${({ theme, linkStyles }) =>
            linkStyles.color || theme.colors.link};
        }
      }
    }
  }
`;

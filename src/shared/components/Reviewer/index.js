import React from 'react';
import { shape, bool, string, arrayOf, node } from 'prop-types';
import { inject } from 'mobx-react';
import styled from 'styled-components';

const Reviewer = ({ className, children, linkStyles }) => {
  console.log('className:', className);

  return (
    <Container linkStyles={linkStyles} className={className}>
      {children}
    </Container>
  );
};

Reviewer.propTypes = {
  children: arrayOf(node).isRequired,
  className: string.isRequired,
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
      margin-top: 10px;
      padding: 20px;
      background-color: ${({ theme, linkStyles }) =>
        linkStyles.color || theme.colors.link};
      color: ${({ theme }) => theme.colors.white};
      width: 5rem;

      p {
        margin: 0;
        display: flex;
        flex-direction: column;
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
        background-color: ${({ theme }) => theme.colors.grey};

        .rwp-score-bar {
          width: 75%;
          background-color: ${({ theme, linkStyles }) =>
            linkStyles.color || theme.colors.link};
        }
      }
    }
  }
`;

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { cx, css } from 'react-emotion';
import { dep } from 'worona-deps';
import { Helmet } from 'react-helmet';
import { getThemeProps } from '../../../shared/helpers';

const hidden = css`
  display: none;
`;

const getCss = theme => css`
  .qc-cmp-ui-container {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Droid Sans',
      'Helvetica Neue', Helvetica, Arial, sans-serif;
    align-items: flex-end;

    .qc-cmp-ui {
      margin: 0;

      .qc-cmp-button {
        background-color: ${theme.colors.link};
        border-color: ${theme.colors.link};
        color: ${theme.colors.text};
      }

      .qc-cmp-secondary-button {
        background-color: transparent;
        color: ${theme.colors.link};
      }

      .qc-cmp-alt-action {
        color: ${theme.colors.link};
      }

      .qc-cmp-toggle-status {
        color: ${theme.colors.link};
      }

      .qc-cmp-toggle-on {
        background-color: ${theme.colors.link};
        border-color: ${theme.colors.link};
      }

      .qc-cmp-nav-bar {
        .qc-cmp-nav-bar-publisher-logo-container {
          display: none !important;
        }

        .qc-cmp-alt-action {
          line-height: 56px;
          padding-left: 0;
          display: flex;
          align-items: center;
        }

        .qc-cmp-alt-action::before {
          display: flex;
          position: static;
          margin-right: 5px;
        }

        .qc-cmp-cancel {
          display: flex;
          justify-content: flex-end;
          margin-left: 0;
        }

        .qc-cmp-button {
          margin: 20px auto;
        }
      }

      .qc-cmp-ui-content {
        padding: 30px 30px 0 30px;
      }

      .qc-cmp-alt-buttons {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 56px;
        padding: 0;
      }

      .qc-cmp-qc-link-container {
        display: none !important;
      }

      .qc-cmp-partner-info {
        margin: 20px;
        border-bottom: 1px solid #e8e9ea;

        table {
          border-bottom: none;
        }
      }
    }
  }
`;

class GdprStyles extends Component {
  static propTypes = {
    mainColor: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.css = getCss(getThemeProps(this.props.mainColor));
  }

  render() {
    return (
      <Fragment>
        <Helmet>
          <body className={this.css} />
        </Helmet>
        <span className={cx(hidden, this.css)} />
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  mainColor: dep('settings', 'selectorCreators', 'getSetting')('theme', 'mainColor')(state),
});

export default connect(mapStateToProps)(GdprStyles);

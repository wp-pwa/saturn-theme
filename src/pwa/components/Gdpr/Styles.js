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
  & #smart-cmp-host {
    #smart-cmp-footer {

      font-family: -apple-system,BlinkMacSystemFont,"Segoe UI","Roboto","Droid Sans","Helvetica Neue",Helvetica,Arial,sans-serif;

      padding: 0;
      box-sizing: border-box;
      width: 100vw;
      color: #333;
      position: fixed;
      left: 0;
      bottom: 0;
      box-shadow: ${theme.shadows.bottom};
      z-index: 2147483647;
      background-color: #fff;

      #smart-cmp-header {
        background-color: ${
          theme.colors.background !== '#ffffff' ? theme.colors.background : '#666'
        };
        color: ${theme.colors.background !== '#ffffff' ? theme.colors.text : '#FFF'};
        width: 100%;
        height: ${theme.heights.bar};
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.2rem;
        line-height: 1em;
        padding: 15px;
        margin: 0;
      }

      #smart-cmp-text {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        padding: 10px 20px;
        margin: 10px 0;
        font-size: 0.8rem;
        text-align: center;
      }

      #smart-cmp-buttons {
        width: 100%;
        display: flex;
        flex-direction: column-reverse;
        align-items: center;
        justify-content: center;
        padding: 10px 0;
      }
    }

    #smart-cmp-manage-choices.smart-cmp-manage-btn {
      margin: 0 15px;
      color: #fff;
      padding: 15px;
      font-size: 0.8rem;
      background-color: transparent;
      text-decoration: underline;
      color: ${theme.colors.black};
    }

    .smart-cmp-btn-primary,
    .smart-cmp-btn-primary:hover {
      margin: 0 15px;
      color: #fff;
      background-color: ${theme.colors.background};
      border-color: ${theme.colors.background};
      padding: 20px 80px;
      font-size: 0.9rem;
      background-color: ${theme.colors.background !== '#ffffff' ? theme.colors.background : '#666'};
      color: ${theme.colors.background !== '#ffffff' ? theme.colors.text : '#FFF'};
    }

    #smart-cmp-modal {
      font-family: -apple-system,BlinkMacSystemFont,"Segoe UI","Roboto","Droid Sans","Helvetica Neue",Helvetica,Arial,sans-serif;

      .modal-title {
        margin-bottom: 0 !important;
        line-height: 1.5 !important;
      }

      .smart-cmp-modal-description {
        font-size: 13px !important;
        margin-top: 20px !important;
        margin-bottom: 20px !important;
      }

      .section-title {
        font-size: 12px !important;
        color: #999 !important;
        text-transform: uppercase !important;
        font-weight: 700 !important;
        margin-bottom: 8px !important;
        font-family: Arial Black !important;
      }

      .purpose {
        display: flex !important;
        flex-direction: row !important;
        justify-content: space-between !important;
        align-items: center !important;
        margin-bottom: 8px !important;
        font-weight: 700 !important;
      }

      .vendor {
        display: flex !important;
        flex-direction: row !important;
        justify-content: space-between !important;
        align-items: center !important;
        margin-bottom: 8px !important;
        font-weight: 700 !important;
      }

      input:checked + .slider {
        background-color: ${theme.colors.background} !important;
      }

      .slider {
        background-color: #ccc !important;
      }
    }

    .smart-cmp-reject-btn {
      background-color: #fff !important;
      color: #000;
      border: 1px solid #000 !important;
    }

    .smart-cmp-accept-btn {
      background-color: ${theme.colors.background} !important;
      color: #fff;
      border: 1px solid ${theme.colors.background} !important;
    }

    .qc-cmp-qc-link-container {
      display: none;
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

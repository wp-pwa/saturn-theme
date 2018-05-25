import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { cx, css } from 'react-emotion';
import { dep } from 'worona-deps';
import { Helmet } from 'react-helmet';

const hidden = css`
  display: none;
`;

const getCss = ({ color }) => css`
  .smart-cmp-manage-btn {
    background-color: #924d5f !important;
    color: #fff !important;
  }

  .smart-cmp-btn-primary:hover {
    color: #fff !important;
    background-color: ${color} !important;
    border-color: ${color} !important;
  }

  .smart-cmp-btn-primary {
    color: #fff !important;
    background-color: ${color} !important;
    border-color: ${color} !important;
  }

  #smart-cmp-footer {
    background-color: whitesmoke !important;
    color: #333 !important;
  }

  #smart-cmp-header {
    color: #333 !important;
    font-size: 30px !important;
  }

  #smart-cmp-text {
    color: #333 !important;
    font-size: 15px !important;
  }

  .smart-cmp-reject-btn {
    background-color: #fff !important;
    color: #000;
    border: 1px solid #000 !important;
  }

  .smart-cmp-accept-btn {
    background-color: ${color} !important;
    color: #fff;
    border: 1px solid ${color} !important;
  }

  #smart-cmp-host #smart-cmp-modal .modal-title {
    margin-bottom: 0 !important;
    line-height: 1.5 !important;
  }

  .smart-cmp-modal-description {
    font-size: 13px !important;
    margin-top: 20px !important;
    margin-bottom: 20px !important;
  }

  #smart-cmp-host #smart-cmp-modal .section-title {
    font-size: 12px !important;
    color: #999 !important;
    text-transform: uppercase !important;
    font-weight: 700 !important;
    margin-bottom: 8px !important;
    font-family: Arial Black !important;
  }

  #smart-cmp-host #smart-cmp-modal .purpose {
    display: flex !important;
    flex-direction: row !important;
    justify-content: space-between !important;
    align-items: center !important;
    margin-bottom: 8px !important;
    font-weight: 700 !important;
  }

  #smart-cmp-host #smart-cmp-modal .vendor {
    display: flex !important;
    flex-direction: row !important;
    justify-content: space-between !important;
    align-items: center !important;
    margin-bottom: 8px !important;
    font-weight: 700 !important;
  }

  #smart-cmp-host #smart-cmp-modal input:checked + .slider {
    background-color: ${color} !important;
  }

  #smart-cmp-host #smart-cmp-modal .slider {
    background-color: #ccc !important;
  }
`;

class GdprStyles extends Component {
  static propTypes = {
    mainColor: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.css = getCss({ color: this.props.mainColor });
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

/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { connect } from 'react-redux';
import { compose, shouldUpdate } from 'recompose';
import { Helmet } from 'react-helmet';

const Title = ({ title }) => (
  <Helmet>
    <title>{title}</title>
  </Helmet>
);

Title.propTypes = {
  title: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  ssr: state.build.ssr,
});

export default compose(
  connect(mapStateToProps),
  inject(({ connection }, { ssr }) => ({
    title: ssr ? connection.siteInfo.headTitle : connection.selectedItem.entity.headMeta.title,
  })),
  shouldUpdate((props, nextProps) => props.ssr === nextProps.ssr),
)(Title);

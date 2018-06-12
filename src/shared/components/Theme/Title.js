/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { compose, shouldUpdate } from 'recompose';
import { Helmet } from 'react-helmet';
import { decode } from 'he';

const Title = ({ title }) => (
  <Helmet>
    <title>{decode(title).replace(/<\/?[^>]+(>|$)/g, '')}</title>
  </Helmet>
);

Title.propTypes = {
  title: PropTypes.string.isRequired,
};

export default compose(
  inject(({ stores: { connection, build } }) => {
    const { isSsr } = build;
    return {
      isSsr,
      title: isSsr ? connection.head.title : connection.selectedItem.entity.headMeta.title,
    };
  }),
  shouldUpdate((props, nextProps) => props.isSsr === nextProps.isSsr),
)(Title);

import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { Helmet } from 'react-helmet';

const Title = ({ title }) => (
  <Helmet>
    <title>{title}</title>
  </Helmet>
);

Title.propTypes = {
  title: PropTypes.string.isRequired,
};

export default inject(({ connection }) => ({
  title: connection.selectedItem.entity.headMeta.title,
}))(Title);

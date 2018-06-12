/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { Helmet } from 'react-helmet';

const Head = ({ headContent }) => (
  <Helmet>
    {headContent.map((node, index) => <node.tagName key={index} {...node.attributes} />)}
  </Helmet>
);

Head.propTypes = {
  headContent: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default inject(({ connection }) => ({
  headContent: connection.head.content,
}))(Head);

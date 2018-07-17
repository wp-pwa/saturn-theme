/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { Helmet } from 'react-helmet';
import Shares from './Shares';
import NextButton from './NextButton';
import { Container } from '../../../shared/styled/ShareBar';

const ShareBar = ({ nextColumn }) => [
  <Helmet>
    <script
      async=""
      custom-element="amp-social-share"
      src="https://cdn.ampproject.org/v0/amp-social-share-0.1.js"
    />
  </Helmet>,
  <Container>
    <Shares />
    {nextColumn && <NextButton />}
  </Container>,
];

ShareBar.propTypes = {
  nextColumn: PropTypes.bool.isRequired,
};

export default inject(({ stores: { connection } }) => ({
  nextColumn: !!connection.selectedColumn.nextColumn,
}))(ShareBar);

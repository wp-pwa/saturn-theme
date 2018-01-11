/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { Helmet } from 'react-helmet';
import Shares from './Shares';
import NextButton from './NextButton';
import { Container } from '../../../shared/styled/ShareBar';

const ShareBar = ({ id, type, title, link, next }) => [
  <Helmet>
    <script
      async=""
      custom-element="amp-social-share"
      src="https://cdn.ampproject.org/v0/amp-social-share-0.1.js"
    />
  </Helmet>,
  <Container>
    <Shares id={id} type={type} title={title} link={link} />
    <NextButton next={next} />
  </Container>
];

ShareBar.propTypes = {
  title: PropTypes.string,
  link: PropTypes.string,
  type: PropTypes.string,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  next: PropTypes.string.isRequired
};

ShareBar.defaultProps = {
  title: null,
  link: null,
  type: null,
  id: null,
  next: null
};

export default inject(({ connection }) => ({
  id: connection.selected.id,
  type: connection.selected.type,
  title: connection.selected.single.title,
  link: connection.selected.single._link,
  next: connection.selected.next._link
}))(ShareBar);

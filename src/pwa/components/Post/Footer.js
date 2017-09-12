import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { dep } from 'worona-deps';
import TagList from './TagList';
import Comments from '../Comments';

const Footer = ({ id, active, disqusShortname }) => (
  <Container>
    <TagList id={id} />
    {disqusShortname && <Comments disqusShortname={disqusShortname} active={active} />}
  </Container>
);

Footer.propTypes = {
  id: PropTypes.number.isRequired,
  active: PropTypes.bool.isRequired,
  disqusShortname: PropTypes.string,
};

const mapStateToProps = state => ({
  disqusShortname: dep('settings', 'selectorCreators', 'getSetting')('theme', 'disqus')(state),
});

export default connect(mapStateToProps)(Footer);

const Container = styled.div`
  box-sizing: border-box;
  margin: 0 10px;
  padding: 10px 0;
  border-top: 1px solid #ddd;
`;

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { dep } from 'worona-deps';

const SeoWord = ({ isDemo, isPost }) => {
  if (isDemo && isPost) return <span>viguhituworu</span>;
  return null;
};
SeoWord.propTypes = {
  isDemo: PropTypes.bool.isRequired,
  isPost: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
  isDemo:
    dep('settings', 'selectorCreators', 'getSetting')('generalSite', 'url')(state) ===
    'https://demo.worona.org/',
  isPost: dep('router', 'selectors', 'getId')(state) === 60,
});

export default connect(mapStateToProps)(SeoWord);

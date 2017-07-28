import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { selectorCreators } from '../../deps';
import { blackOrWhite } from '../../libs';

import Header from '../Header';
import Share from '../Share';

import '!!style!css!postcss!mini.css/dist/mini-default.css'; // eslint-disable-line

const Theme = ({ mainColor, children }) => {
  const settings = { color: blackOrWhite(mainColor), bgColor: mainColor };

  return (
    <ThemeProvider theme={settings}>
      <div>
        <Header />
        {children}
        <Share />
      </div>
    </ThemeProvider>
  );
};

Theme.propTypes = {
  children: PropTypes.node.isRequired,
  mainColor: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  mainColor: selectorCreators.getSetting('theme', 'mainColor')(state),
});

export default connect(mapStateToProps)(Theme);

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { dep } from 'worona-deps';
import styled from 'react-emotion';

const Table = ({ children, rtl }) => {
  const filteredChildren = children.filter(child => typeof child !== 'string');
  console.log('filtered children:', filteredChildren);
  return (
    <Container rtl={rtl}>
      <table>{filteredChildren}</table>
    </Container>
  );
};

Table.propTypes = {
  children: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  rtl: PropTypes.bool,
};

Table.defaultProps = {
  rtl: false,
};

const mapStateToProps = state => {
  const localisation =
    dep('settings', 'selectorCreators', 'getSetting')('theme', 'localisation')(state) || {};

  return {
    rtl: localisation.rtl,
  };
};

export default connect(mapStateToProps)(Table);

const Container = styled.div`
  box-sizing: border-box;
  width: calc(100% - 30px);
  margin: 15px;
  overflow: auto;
  ${({ rtl }) => (rtl ? 'direction: rtl' : null)};

  tr:nth-child(even) {
    background-color: #eee;
  }

  tr:nth-child(odd) {
    background-color: #fafafa;
  }

  td {
    border-spacing: 0;
    padding: 10px;
    text-align: center;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;

/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'react-emotion';
import { dep } from 'worona-deps';
import modalStyles from './modalStyles';
import { getThemeProps } from '../../../shared/helpers';

const openGpdrModal = () => window.__cmp('displayConsentUi');

class Gdpr extends Component {
  static propTypes = {
    mainColor: PropTypes.string.isRequired,
    isEnabled: PropTypes.bool,
  };

  static defaultProps = {
    isEnabled: false,
  };

  constructor(props) {
    super(props);
    // Generates a class with GDPR modal styles
    this.modalStyles = modalStyles(getThemeProps(props.mainColor));
  }

  componentDidMount() {
    // Adds the class generated before to body
    window.document.body.classList.add(this.modalStyles);
  }

  render() {
    const { isEnabled } = this.props;
    return isEnabled ? <Button onClick={openGpdrModal}>Opciones de privacidad</Button> : null;
  }
}

const mapStateToProps = state => {
  const gpdr = dep('settings', 'selectorCreators', 'getSetting')('theme', 'gdpr')(state) || {};
  return {
    isEnabled: gpdr.pwa,
    mainColor: dep('settings', 'selectorCreators', 'getSetting')('theme', 'mainColor')(state),
  };
};

export default connect(mapStateToProps)(Gdpr);

const Button = styled.li`
  bottom: 0;
  width: 100%;
  height: ${({ theme }) => theme.heights.bar};
  border-top: 1px solid #ddd;
  background: white;
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: left;
  padding-left: 23px;
  text-align: left;
  font-size: 0.9rem;
`;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';

class ShareItem extends Component {
  static propTypes = {
    El: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    countText: PropTypes.string,
    buttonText: PropTypes.string,
    buttonTextOnClick: PropTypes.string,
  };

  static defaultProps = {
    countText: '',
    buttonText: 'Compartir',
    buttonTextOnClick: '',
  };

  render() {
    const { El, title, link, type, countText, buttonText, buttonTextOnClick } = this.props;
    return (
      <Container>
        <El
          title={title}
          url={link}
          type={type}
          countText={countText}
          buttonText={buttonText}
          buttonTextOnClick={buttonTextOnClick}
        />
      </Container>
    );
  }
}

export default ShareItem;

const Container = styled.li`
  box-sizing: border-box;
  width: 100%;
  max-height: 61px;
  list-style: none;
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
  display: flex;
  justify-content: center;
  align-items: center;

  &:last-child {
    border-bottom: none;
  }
`;

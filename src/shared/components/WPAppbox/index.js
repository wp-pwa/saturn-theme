import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';

const WPAppbox = ({ title, link, developer, developerLink, price, image }) => (
  <Container>
    <IconContainer href={link} rel="noopener" target="_blank">
      <img alt="Icon" src={image} />
    </IconContainer>
    <InfoContainer>
      <a href={link} rel="noopener" target="_blank">
        {title}
      </a>
      <a href={developerLink} rel="noopener" target="_blank">
        {developer}
      </a>
      <p>{price}</p>
    </InfoContainer>
  </Container>
);

WPAppbox.propTypes = {
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  developer: PropTypes.string.isRequired,
  developerLink: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired
};

export default WPAppbox;

const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  margin: 10px;
  box-shadow: 0 1px 3px #333;
`;

const IconContainer = styled.a`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  padding: 5px;
`;

const InfoContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: calc(100% - 80px);
  padding: 5px;
`;

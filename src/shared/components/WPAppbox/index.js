import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import IconDownload from 'react-icons/lib/md/file-download';

const WPAppbox = ({ title, link, developer, price, image }) => (
  <Container>
    <IconContainer href={link} rel="noopener" target="_blank">
      <img alt="Icon" src={image} />
    </IconContainer>
    <InfoContainer>
      <Title>{title}</Title>
      <Developer>Developer: {developer}</Developer>
      <Price>{price}</Price>
    </InfoContainer>
    <DownloadContainer href={link} rel="noopener" target="_blank">
      <IconDownload size={55} />
    </DownloadContainer>
  </Container>
);

WPAppbox.propTypes = {
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  developer: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired
};

export default WPAppbox;

const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  margin: 10px;
  border: 1px solid #ccc;
  border-top: 5px solid #ccc;
`;

const IconContainer = styled.a`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  padding: 10px;
`;

const InfoContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: calc(100% - 160px);
  padding: 10px 5px;
  font-size: 0.9rem;
`;

const Title = styled.div`
  box-sizing: border-box;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  font-weight: 700;
`;

const Developer = styled.div`
  box-sizing: border-box;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const Price = styled.div`
  box-sizing: border-box;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const DownloadContainer = styled.a`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  padding: 10px;
`;

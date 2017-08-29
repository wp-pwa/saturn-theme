import React from 'react';
import PropTypes from 'prop-types';
import IconEnvelope from 'react-icons/lib/fa/envelope';
import styled from 'styled-components';

const ShareEmail = ({ url, title, buttonText }) =>
  <Email href={`mailto:?body=${encodeURIComponent(`${title}\n${url}`)}`}>
    <IconLink>
      <StyledIconEnvelope size={20} color={'white'} />
    </IconLink>
    <StyledButton>
      {buttonText}
    </StyledButton>
  </Email>;

ShareEmail.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
};

export default ShareEmail;

const Email = styled.a`
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  text-decoration: none;
  background: transparent;
  justify-content: space-between;
`;

const IconLink = styled.div`
  border-radius: 20px;
  width: 40px;
  height: 40px;
  background-color: #8fa9ba;
`;

const StyledIconEnvelope = styled(IconEnvelope)`
  margin: 10px 0 0 10px;
`;

const StyledButton = styled.div`
  box-sizing: content-box;
  border-radius: 3px;
  color: #ffffff;
  background-color: #8fa9ba;
  padding: 0 10px;
  min-width: 80px;
  margin: 7px 0;
  height: 26px;
  line-height: 26px;
  text-align: center;
  font-size: .75em;
  text-transform: uppercase;
`;

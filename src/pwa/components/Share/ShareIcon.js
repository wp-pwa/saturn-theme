import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import FacebookIcon from 'react-icons/lib/fa/facebook';
import TwitterIcon from 'react-icons/lib/fa/twitter';
import WhatsappIcon from 'react-icons/lib/fa/whatsapp';
import PinterestIcon from 'react-icons/lib/fa/pinterest';
import LinkedinIcon from 'react-icons/lib/fa/linkedin';
import GooglePlusIcon from 'react-icons/lib/fa/google-plus';
import TelegramIcon from 'react-icons/lib/fa/paper-plane';
import EmailIcon from 'react-icons/lib/fa/envelope';
import CopyIcon from 'react-icons/lib/go/link';

const networksMap = {
  facebook: FacebookIcon,
  twitter: TwitterIcon,
  whatsapp: WhatsappIcon,
  pinterest: PinterestIcon,
  linkedin: LinkedinIcon,
  googlePlus: GooglePlusIcon,
  telegram: TelegramIcon,
  email: EmailIcon,
  copy: CopyIcon,
};

const ShareIcon = ({ network, size }) => {
  const Icon = networksMap[network];
  return (<Circle network={network}>{Icon ? <Icon size={size} /> : null}</Circle>);
};

ShareIcon.propTypes = {
  network: PropTypes.string.isRequired,
  size: PropTypes.number,
};

ShareIcon.defaultProps = {
  size: 20,
};

export default ShareIcon;

const Circle = styled.div`
  flex: 0 0 auto;
  border-radius: 20px;
  width: 40px;
  height: 40px;
  background-color: ${({ theme, network }) => theme.colors[network] || theme.colors.copy};

  display: flex;
  align-items: center;
  justify-content: center;

  svg {
      fill: white;
  }
`;

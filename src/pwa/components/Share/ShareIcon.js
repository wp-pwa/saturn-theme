import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import FacebookIcon from '../../../shared/components/Icons/Facebook';
import TwitterIcon from '../../../shared/components/Icons/Twitter';
import WhatsappIcon from '../../../shared/components/Icons/WhatsApp';
import PinterestIcon from '../../../shared/components/Icons/Pinterest';
import LinkedinIcon from '../../../shared/components/Icons/LinkedIn';
import GooglePlusIcon from '../../../shared/components/Icons/GooglePlus';
import TelegramIcon from '../../../shared/components/Icons/Telegram';
import EmailIcon from '../../../shared/components/Icons/Envelope';
import CopyIcon from '../../../shared/components/Icons/Link';

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
  return (
    <Circle network={network}>{Icon ? <Icon size={size} /> : null}</Circle>
  );
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
  background-color: ${({ theme, network }) =>
    theme.colors[network] || theme.colors.copy};

  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    fill: white;
  }
`;

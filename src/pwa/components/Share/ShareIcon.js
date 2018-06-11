import React from 'react';
import PropTypes from 'prop-types';
import FacebookIcon from 'react-icons/lib/fa/facebook';
import TwitterIcon from 'react-icons/lib/fa/twitter';
import WhatsappIcon from 'react-icons/lib/fa/whatsapp';
import PinterestIcon from 'react-icons/lib/fa/pinterest';
import LinkedinIcon from 'react-icons/lib/fa/linkedin';
import GooglePlusIcon from 'react-icons/lib/fa/google-plus';

const networksMap = {
  facebook: FacebookIcon,
  twitter: TwitterIcon,
  whatsapp: WhatsappIcon,
  pinterest: PinterestIcon,
  linkedin: LinkedinIcon,
  googlePlus: GooglePlusIcon,
};

const ShareIcon = ({ network, size }) => {
  const Icon = networksMap[network];
  return Icon ? <Icon size={size} /> : null;
};

ShareIcon.propTypes = {
  network: PropTypes.string.isRequired,
  size: PropTypes.number,
};

ShareIcon.defaultProps = {
  size: 40,
};

export default ShareIcon;

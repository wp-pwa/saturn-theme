import React from 'react';
import PropTypes from 'prop-types';
import { ShareButtons, generateShareIcon } from 'react-share';
import { connect } from 'react-redux';
import styled from 'styled-components';
import * as selectors from '../../selectors';

const mapTypeToName = {
  facebook: 'Facebook',
  twitter: 'Twitter',
  telegram: 'Telegram',
  whatsapp: 'Whatsapp',
  google: 'GooglePlus',
  linkedin: 'Linkedin',
  pinterest: 'Pinterest',
  vk: 'VK',
  ok: 'OK',
  reddit: 'Reddit',
};

const ShareButton = ({
  url,
  type,
  buttonText,
  countText,
  title,
  description,
  picture,
  via,
  hashtags,
  separator,
  image,
  media,
  counts,
}) => {
  const Icon = generateShareIcon(type);
  const StyledIcon = styled(Icon)`
    flex: 0 0 auto;
  `;

  const Button = ShareButtons[`${mapTypeToName[type]}ShareButton`];
  const StyledButton = styled(Button)`
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    display: inline-flex;
    background: transparent;
    overflow: hidden;
    outline: none;

    &:hover, &:focus {
      background: transparent;
    }
  `;

  return (
    <StyledButton
      url={url}
      title={title}
      description={description}
      picture={picture}
      via={via}
      hashtags={hashtags}
      separator={separator}
      image={image}
      media={media}
    >
      <StyledIcon size={40} round />
      <Counter>
        {countText && !!counts[type]
          ? <CounterValue>
            {counts[type]}
          </CounterValue>
          : ''}
        {countText && !!counts[type]
          ? <CounterText>
            {countText}
          </CounterText>
          : ''}
      </Counter>
      <ShareBadge type={type}>
        {buttonText}
      </ShareBadge>
    </StyledButton>
  );
};

ShareButton.propTypes = {
  url: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  countText: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  picture: PropTypes.string,
  via: PropTypes.string,
  hashtags: PropTypes.string,
  separator: PropTypes.string,
  image: PropTypes.string,
  media: PropTypes.string,
  counts: PropTypes.shape({}),
};

const mapStateToProps = state => ({
  counts: selectors.shareModal.getCurrentCounts(state),
});

export default connect(mapStateToProps)(ShareButton);

const Counter = styled.div`
  flex: 10 1 auto;
  margin-left: 12px;
  padding-top: 8px;
`;

const CounterValue = styled.span`
  color: #363636;
  font-weight: bold;
  font-size: 16px;
  padding-right: 5px;
`;

const CounterText = styled.span`font-size: 13px;`;

const ShareBadge = styled.div`
  flex: 0 0 auto;
  border-radius: 3px;
  box-sizing: content-box;
  color: #ffffff;
  position: relative;
  padding: 0 10px;
  min-width: 80px;
  margin: 7px 0;
  height: 26px;
  text-align: center;
  font-size: .75em;
  line-height: 26px;
  text-transform: uppercase;
  background-color: ${({ type }) =>
    ({
      facebook: '#3b589e',
      twitter: '#55acee',
      whatsapp: '#24c34b',
      telegram: '#0088cc',
      flipboard: '#e12828',
      linkedin: '#0077b5',
      pinterest: '#cb2027',
      reddit: '#5f99cf',
      stumple: '#eb4924',
      google: '#db4437',
      vk: '#567ca4',
      ok: '#f58220',
      email: '#8fa9ba',
      others: '#006ca0',
    }[type] || '#8fa9ba')};
`;

import React from 'react';
import PropTypes from 'prop-types';
import { ShareButtons, generateShareIcon } from 'react-share';
import { connect } from 'react-redux';
import styled from 'react-emotion';
import * as selectors from '../../selectors';

const { PinterestShareButton } = ShareButtons;

const SharePinterest = ({ url, description, media, counts }) => (
  <StyledPinterestShareButton url={url} description={description} media={media}>
    <StyledIcon size={40} round />
    {counts ? (
      <Counter>
        <CounterValue key="value">{counts}</CounterValue>
        <CounterText key="text">{counts}</CounterText>
      </Counter>
    ) : null}
    <Button>Compartir</Button>
  </StyledPinterestShareButton>
);

SharePinterest.propTypes = {
  url: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  media: PropTypes.string.isRequired,
  counts: PropTypes.number
};

SharePinterest.defaultProps = {
  counts: null
};

const mapStateToProps = state => ({
  id: selectors.share.getId(state),
  counts: selectors.share.getCurrentCounts(state).pinterest
});

export default connect(mapStateToProps)(SharePinterest);

const StyledPinterestShareButton = styled(PinterestShareButton)`
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  display: inline-flex;
  justify-content: space-between;
  background: transparent;
  overflow: hidden;
  outline: none;

  &:hover,
  &:focus {
    background: transparent;
  }
`;

const StyledIcon = styled(generateShareIcon('pinterest'))`
  flex: 0 0 auto;
`;

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

const CounterText = styled.span`
  font-size: 13px;
`;

const Button = styled.div`
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
  font-size: 0.75em;
  line-height: 26px;
  text-transform: uppercase;
  background-color: ${({ theme }) => theme.colors.pinterest};
`;

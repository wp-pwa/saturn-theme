import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import styled from 'styled-components';
import { compose, withHandlers } from 'recompose';

const ShareLink = ({ href, onClick, children }) => (
  <Link target="_blank" href={href} onClick={onClick}>
    {children}
  </Link>
);

ShareLink.propTypes = {
  href: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.shape({}).isRequired,
};

export default compose(
  inject(({ stores: { analytics } }) => ({
    sendEvent: analytics.sendEvent,
  })),
  withHandlers({
    onClick: ({ network, sendEvent }) => () => {
      sendEvent({
        label: `method: ${network}`,
        category: 'Share bar',
        action: 'share',
      });
    },
  }),
)(ShareLink);

const Link = styled.a`
  color: white;
`;

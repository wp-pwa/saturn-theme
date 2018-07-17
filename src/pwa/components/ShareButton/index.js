import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { compose, withHandlers } from 'recompose';
import styled from 'react-emotion';

const ShareButton = ({ onClick, children }) => (
  <Button onClick={onClick}>{children}</Button>
);

ShareButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.shape({}).isRequired,
};

export default compose(
  inject(({ stores: { theme, analytics } }) => ({
    open: theme.shareModal.open,
    sendEvent: analytics.sendEvent,
  })),
  withHandlers({
    onClick: ({ open, type, id, sendEvent, component }) => () => {
      sendEvent({ action: 'open share modal', category: component });
      open({ type, id });
    },
  }),
)(ShareButton);

const Button = styled.div``;

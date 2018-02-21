import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'react-emotion';
import IconShare from 'react-icons/lib/md/share';
import * as actions from '../../actions';

const ShareButton = ({ shareModalOpeningRequested }) => (
  <Container onClick={shareModalOpeningRequested}>
    <IconShare size={27} />
  </Container>
);

ShareButton.propTypes = {
  shareModalOpeningRequested: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch, { id, type }) => ({
  shareModalOpeningRequested: () =>
    dispatch(
      actions.share.openingRequested({
        id,
        wpType: type,
      }),
    ),
});

export default connect(null, mapDispatchToProps)(ShareButton);

const Container = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  margin: 0;
  color: ${({ theme }) => theme.colors.white};
  height: 44px;
  width: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
  border-bottom-left-radius: 30%;
`;

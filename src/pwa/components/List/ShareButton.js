import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import IconShare from 'react-icons/lib/md/share';
import * as actions from '../../actions';

class ShareButton extends Component {
  handleShareModalOpening = () =>
    this.props.shareModalOpeningRequested({ id: this.props.id, wpType: this.props.type });

  render() {
    return (
      <Container onClick={this.handleShareModalOpening}>
        <IconShare size={27} />
      </Container>
    );
  }
}

ShareButton.propTypes = {
  id: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  shareModalOpeningRequested: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  shareModalOpeningRequested: payload => dispatch(actions.shareModal.openingRequested(payload))
});

export default connect(null, mapDispatchToProps)(ShareButton);

const Container = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  margin: 0;
  color: ${({ theme }) => theme.postListLight};
  height: ${({ theme }) => theme.shareSize};
  width: ${({ theme }) => theme.shareSize};
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
  border-bottom-left-radius: 30%;
`;

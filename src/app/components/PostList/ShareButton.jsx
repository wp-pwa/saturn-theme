import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import IconShare from 'react-icons/lib/md/share';
import * as actions from '../../actions';

class ShareButton extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.id !== this.props.id || nextProps.wpType !== this.props.wpType;
  }

  render() {
    const { id, wpType, shareModalOpeningRequested } = this.props;

    return (
      <Container
        onClick={() => {
          shareModalOpeningRequested({ id, wpType });
        }}
      >
        <IconShare size={27} />
      </Container>
    );
  }
}

ShareButton.propTypes = {
  id: PropTypes.number.isRequired,
  wpType: PropTypes.string.isRequired,
  shareModalOpeningRequested: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  shareModalOpeningRequested: payload => dispatch(actions.shareModal.openingRequested(payload)),
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

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import styled from 'react-emotion';

class ShareButton extends Component {
  constructor() {
    super();
    this.openShareModal = this.openShareModal.bind(this);
  }

  openShareModal() {
    const { open, type, id } = this.props;
    open({ type, id });
  }

  render() {
    return (
      <Button onClick={this.openShareModal}>
        {this.props.children}
      </Button>
    );
  }
}

ShareButton.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  open: PropTypes.func.isRequired,
  children: PropTypes.shape({}).isRequired,
};

export default inject(({ theme }) => ({
  open: theme.shareModal.open,
}))(ShareButton);

const Button = styled.div`

`;

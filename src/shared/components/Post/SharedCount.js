import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import styled from 'react-emotion';
import Icon from 'react-icons/lib/md/share';
import * as actions from '../../../pwa/actions';

class SharedCount extends Component {
  componentDidMount() {
    const { ready, isSelected, allShareCountRequested } = this.props;

    if (!ready && isSelected) {
      setTimeout(() => allShareCountRequested(), 500);
    }
  }

  shouldComponentUpdate(nextProps) {
    return this.props.isSelected !== nextProps.isSelected || this.props.ready !== nextProps.ready;
  }

  componentDidUpdate(prevProps) {
    const { ready, isSelected, allShareCountRequested } = this.props;

    if (!ready && isSelected && !prevProps.isSelected) {
      setTimeout(() => allShareCountRequested(), 500);
    }
  }

  render() {
    const { ready, total } = this.props;

    return (
      <Container ready={ready}>
        <Icon size={18} verticalAlign="none" />
        <Text>{`${total} compartidos`}</Text>
      </Container>
    );
  }
}

SharedCount.propTypes = {
  ready: PropTypes.bool.isRequired,
  total: PropTypes.number.isRequired,
  allShareCountRequested: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired,
};

const mapDispatchToProps = (dispatch, { type, id }) => ({
  allShareCountRequested: () =>
    dispatch(actions.share.allShareCountRequested({ id, wpType: type })),
});

export default compose(
  connect(null, mapDispatchToProps),
  inject(({ connection, theme }, { type, id }) => ({
    ready: theme.share.getReady(type, id),
    total: theme.share.getTotalCounts(type, id),
    isSelected: connection.selectedContext.getItem({ item: { type, id } }).isSelected,
  })),
)(SharedCount);

const Container = styled.div`
  margin: 0;
  padding: 5px 15px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  box-sizing: border-box;
  transition: opacity 0.3s;
  opacity: ${({ ready }) => (ready ? 1 : 0)};
`;

const Text = styled.span`
  font-weight: 300;
  font-size: 0.9rem;
  padding-left: 5px;
`;

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import styled from 'react-emotion';
import IconShare from 'react-icons/lib/md/share';
import * as actions from '../../actions';
import * as selectorCreators from '../../selectorCreators';

class Shares extends PureComponent {
  static propTypes = {
    active: PropTypes.bool.isRequired,
    ready: PropTypes.bool.isRequired,
    total: PropTypes.number.isRequired,
    shareModalOpeningRequested: PropTypes.func.isRequired,
    allShareCountRequested: PropTypes.func.isRequired
  };

  componentDidMount() {
    const { active, allShareCountRequested, ready } = this.props;

    if (!ready && active) {
      setTimeout(() => allShareCountRequested(), 500);
    }
  }

  componentDidUpdate(prevProps) {
    const { active, allShareCountRequested, ready } = this.props;

    if (!ready && active && !prevProps.active) {
      setTimeout(() => allShareCountRequested(), 500);
    }
  }

  render() {
    const { ready, total, shareModalOpeningRequested } = this.props;

    return (
      <Container ready={ready} onClick={shareModalOpeningRequested}>
        <IconShare size={18} />
        <Text>{`${total} compartidos`}</Text>
      </Container>
    );
  }
}

const mapStateToProps = (state, { id }) => ({
  total: selectorCreators.share.getTotalCounts(id)(state),
  ready: selectorCreators.share.areCountsReady(id)(state)
});

const mapDispatchToProps = (dispatch, { id }) => ({
  shareModalOpeningRequested: () =>
    dispatch(actions.share.openingRequested({ id, wpType: 'posts' })),
  allShareCountRequested: () =>
    dispatch(actions.share.allShareCountRequested({ id, wpType: 'posts' }))
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  inject(({ connection }, { id }) => ({
    active: connection.context.column.selected.id === id
  }))
)(Shares);

const Container = styled.p`
  margin: 0;
  padding: 5px 15px;
  color: ${({ theme }) => theme.postGrey};
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

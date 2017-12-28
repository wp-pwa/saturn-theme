import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import IconClose from 'react-icons/lib/md/close';
import styled from 'react-emotion';
import { dep } from 'worona-deps';
import * as selectors from '../../selectors';

class CloseButton extends PureComponent {
  static propTypes = {
    listType: PropTypes.string.isRequired,
    listId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    context: PropTypes.shape({}).isRequired,
    Link: PropTypes.func.isRequired
  };

  render() {
    const { listType, listId, context, Link } = this.props;
    return (
      <Link selected={{ listType, listId }} context={context}>
        <a>
          <Container>
            <IconClose size={33} />
          </Container>
        </a>
      </Link>
    );
  }
}

const mapStateToProps = state => ({
  context: selectors.contexts.home(state),
  Link: dep('connection', 'components', 'Link')
});

export default compose(
  connect(mapStateToProps),
  inject(({ connection }) => {
    const { listType, listId } = connection.selected.fromList;

    return {
      listType,
      listId
    };
  })
)(CloseButton);

const Container = styled.div`
  box-sizing: border-box;
  height: ${({ theme }) => theme.titleSize};
  width: ${({ theme }) => theme.titleSize};
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 50;
  color: ${({ theme }) => theme.color};
`;

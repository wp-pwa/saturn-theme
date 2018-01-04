import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { connect } from 'react-redux';
import IconClose from 'react-icons/lib/md/close';
import styled from 'react-emotion';
import { dep } from 'worona-deps';
import * as contexts from '../../contexts';
import * as selectors from '../../selectors';

const CloseButton = ({ selected, context, Link }) => (
  <Link selected={selected} context={context}>
    <a>
      <Container>
        <IconClose size={33} />
      </Container>
    </a>
  </Link>
);

CloseButton.propTypes = {
  selected: PropTypes.shape({}).isRequired,
  context: PropTypes.shape({}).isRequired,
  Link: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  context: selectors.contexts.home(state),
  Link: dep('connection', 'components', 'Link')
});

export default connect(mapStateToProps)(
  inject(({ connection }) => {
    const { listType, listId } = connection.selected.fromList || connection.selected;

    return {
      selected: { listType, listId }
    };
  })(CloseButton)
);

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

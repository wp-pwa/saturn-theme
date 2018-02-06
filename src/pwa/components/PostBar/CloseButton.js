import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { connect } from 'react-redux';
import IconClose from 'react-icons/lib/md/close';
import styled from 'react-emotion';
import { dep } from 'worona-deps';
import { Container } from '../../../shared/styled/PostBar/CloseButton';
import * as selectors from '../../selectors';

const CloseButton = ({ selected, context, method, Link }) => (
  <Link selected={selected} context={context} method={method}>
    <Hyperlink>
      <Container>
        <IconClose size={33} color="inherit" />
      </Container>
    </Hyperlink>
  </Link>
);

CloseButton.propTypes = {
  selected: PropTypes.shape({}).isRequired,
  context: PropTypes.shape({}).isRequired,
  Link: PropTypes.func.isRequired,
  method: PropTypes.string,
};

CloseButton.defaultProps = {
  method: "push",
}

const mapStateToProps = state => ({
  context: selectors.contexts.home(state),
  Link: dep('connection', 'components', 'Link'),
});

export default connect(mapStateToProps)(
  inject(({ connection }) => {
    const { listType, listId } = connection.selected.fromList || connection.selected;

    return {
      selected: { listType, listId },
    };
  })(CloseButton),
);

const Hyperlink = styled.a`
  color: inherit;
`;

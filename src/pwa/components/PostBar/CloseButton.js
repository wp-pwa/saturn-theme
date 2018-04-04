import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import IconClose from 'react-icons/lib/md/close';
import styled from 'react-emotion';
import { dep } from 'worona-deps';
import { Container } from '../../../shared/styled/PostBar/CloseButton';
import { home } from '../../contexts';

const CloseButton = ({ item, context, method, Link, component, action }) => (
  <Link item={item} context={context} method={method} event={{ category: component, action }}>
    <Hyperlink>
      <Container>
        <IconClose size={33} color="inherit" />
      </Container>
    </Hyperlink>
  </Link>
);

CloseButton.propTypes = {
  item: PropTypes.shape({}).isRequired,
  context: PropTypes.shape({}).isRequired,
  Link: PropTypes.func.isRequired,
  method: PropTypes.string,
  component: PropTypes.string.isRequired,
  action: PropTypes.string.isRequired,
};

CloseButton.defaultProps = {
  method: 'push',
};

const mapStateToProps = state => {
  const menu = dep('settings', 'selectorCreators', 'getSetting')('theme', 'menu')(state);

  return {
    context: home(menu),
    Link: dep('connection', 'components', 'Link'),
  };
};

export default compose(
  connect(mapStateToProps),
  inject(({ connection }) => {
    const { type, id, page } = connection.selectedItem.fromList || connection.selectedItem;

    return {
      item: { type, id, page },
    };
  }),
)(CloseButton);

const Hyperlink = styled.a`
  color: inherit;
`;

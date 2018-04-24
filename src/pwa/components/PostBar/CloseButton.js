import React from 'react';
import PropTypes from 'prop-types';
import { computed } from 'mobx';
import { inject } from 'mobx-react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import IconClose from 'react-icons/lib/md/close';
import styled from 'react-emotion';
import { dep } from 'worona-deps';
import { Container } from '../../../shared/styled/PostBar/CloseButton';
import { home } from '../../contexts';

const CloseButton = ({ type, id, page, context, method, Link, eventCategory, eventAction }) => (
  <Link
    type={type}
    id={id}
    page={page}
    context={context}
    method={method}
    eventCategory={eventCategory}
    eventAction={eventAction}
  >
    <Hyperlink>
      <Container>
        <IconClose size={33} color="inherit" />
      </Container>
    </Hyperlink>
  </Link>
);

CloseButton.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  page: PropTypes.number.isRequired,
  context: PropTypes.shape({}).isRequired,
  Link: PropTypes.func.isRequired,
  method: PropTypes.string,
  eventCategory: PropTypes.string.isRequired,
  eventAction: PropTypes.string.isRequired,
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
    const type = computed(() => connection.selectedItem.fromList.type).get();
    const id = computed(() => connection.selectedItem.fromList.id).get();

    return {
      type,
      id,
      page: 1,
    };
  }),
)(CloseButton);

const Hyperlink = styled.a`
  color: inherit;
`;

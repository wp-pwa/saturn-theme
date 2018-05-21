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
import { home } from '../../../shared/contexts';

const CloseButton = ({
  type,
  id,
  page,
  selectedContextIndex,
  context,
  method,
  Link,
  eventCategory,
  eventAction,
  previousContextRequested,
}) =>
  selectedContextIndex === 0 ? (
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
  ) : (
    <Hyperlink onClick={previousContextRequested}>
      <Container>
        <IconClose size={33} color="inherit" />
      </Container>
    </Hyperlink>
  );

CloseButton.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  page: PropTypes.number.isRequired,
  selectedContextIndex: PropTypes.number.isRequired,
  context: PropTypes.shape({}).isRequired,
  Link: PropTypes.func.isRequired,
  method: PropTypes.string,
  eventCategory: PropTypes.string.isRequired,
  eventAction: PropTypes.string.isRequired,
  previousContextRequested: PropTypes.func.isRequired,
};

CloseButton.defaultProps = {
  method: 'push',
};

const mapDispatchToProps = dispatch => ({
  previousContextRequested: () =>
    dispatch(dep('connection', 'actions', 'previousContextRequested')()),
});

export default compose(
  connect(null, mapDispatchToProps),
  inject(({ connection, settings }) => {
    const type = computed(() => connection.selectedItem.fromList.type).get();
    const id = computed(() => connection.selectedItem.fromList.id).get();
    const selectedContextIndex = computed(() => connection.selectedContext.index).get();
    const { menu } = settings.theme;

    return {
      type,
      id,
      page: 1,
      selectedContextIndex,
      context: home(menu),
      Link: dep('connection', 'components', 'Link'),
    };
  }),
)(CloseButton);

const Hyperlink = styled.a`
  color: inherit;
`;

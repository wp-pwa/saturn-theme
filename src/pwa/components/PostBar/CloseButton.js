/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';
import { computed } from 'mobx';
import { inject } from 'mobx-react';
import IconClose from 'react-icons/lib/md/close';
import styled from 'react-emotion';
import Link from '../Link';
import { Container } from '../../../shared/styled/PostBar/CloseButton';
import { home } from '../../../shared/contexts';

const CloseButton = ({
  type,
  id,
  page,
  selectedContextIndex,
  context,
  method,
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
  method: PropTypes.string,
  eventCategory: PropTypes.string.isRequired,
  eventAction: PropTypes.string.isRequired,
  previousContextRequested: PropTypes.func.isRequired,
};

CloseButton.defaultProps = {
  method: 'push',
};

export default inject(({ stores: { connection, settings } }) => {
  const type = computed(
    () =>
      connection.selectedItem.fromList
        ? connection.selectedItem.fromList.type
        : 'latest',
  ).get();

  const id = computed(
    () =>
      connection.selectedItem.fromList
        ? connection.selectedItem.fromList.id
        : 'post',
  ).get();

  const selectedContextIndex = computed(
    () => connection.selectedContext.index,
  ).get();

  const { menu } = settings.theme;

  return {
    type,
    id,
    page: 1,
    selectedContextIndex,
    context: home(menu),
    previousContextRequested: connection.previousContextRequested,
  };
})(CloseButton);

const Hyperlink = styled.a`
  color: inherit;
`;

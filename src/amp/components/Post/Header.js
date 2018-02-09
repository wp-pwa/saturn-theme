import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import fecha from 'fecha';
import SharedCount from '../../../shared/components/SharedCount';
import ReadingTime from '../../../shared/components/ReadingTime';
import {
  Container,
  Title,
  InnerContainer,
  Author,
  StyledDate,
} from '../../../shared/styled/Post/Header';

const Header = ({ id, title, author, date }) => (
  <Container>
    <Title dangerouslySetInnerHTML={{ __html: title }} />
    <InnerContainer>
      <Author>{author}</Author>
      <StyledDate>{date}</StyledDate>
    </InnerContainer>
    <InnerContainer>
      <SharedCount id={id} />
      <ReadingTime id={id} />
    </InnerContainer>
  </Container>
);

Header.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};

export default inject(({ connection }, { id }) => ({
  title: connection.single.post[id].title,
  author: connection.single.post[id].author.name,
  date: fecha.format(new Date(connection.single.post[id].creationDate), 'DD.MM.YYYY - HH:mm[h]'),
}))(Header);

import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import fecha from 'fecha';
import readingTime from 'reading-time';
import IconClock from 'react-icons/lib/md/access-time';
import IconShare from 'react-icons/lib/md/share';
import {
  Container,
  Title,
  InnerContainer,
  Author,
  StyledDate,
  TotalShares,
  TotalSharesText,
  ReadingTime,
  ReadingTimeText
} from '../../../shared/styled/Post/Header';
import * as selectorCreators from '../../../pwa/selectorCreators';

const Header = ({ title, author, date, time, totalCounts }) => (
  <Container>
    <Title dangerouslySetInnerHTML={{ __html: title }} />
    <InnerContainer>
      <Author>{author}</Author>
      <StyledDate>{date}</StyledDate>
    </InnerContainer>
    <InnerContainer>
      <TotalShares isTotalReady={totalCounts}>
        <IconShare size={18} verticalAlign="none" />
        <TotalSharesText>{`${totalCounts} compartidos`}</TotalSharesText>
      </TotalShares>
      <ReadingTime>
        <IconClock size={18} verticalAlign="none" />
        <ReadingTimeText>{`${time} minutos`}</ReadingTimeText>
      </ReadingTime>
    </InnerContainer>
  </Container>
);

Header.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.number.isRequired,
  totalCounts: PropTypes.number.isRequired
};

const mapStateToProps = (state, { id }) => ({
  totalCounts: selectorCreators.share.getTotalCounts(id)(state)
});

export default compose(
  connect(mapStateToProps),
  inject(({ connection }, { id }) => ({
    title: connection.single.post[id].title,
    author: connection.single.post[id].author.name,
    date: fecha.format(new Date(connection.single.post[id].creationDate), 'DD.MM.YYYY - HH:mm[h]'),
    time: Math.round(readingTime(connection.single.post[id].content).minutes)
  }))
)(Header);

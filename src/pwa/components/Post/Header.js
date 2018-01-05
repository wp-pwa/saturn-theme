import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { connect } from 'react-redux';
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
} from '../../../shared/components/Post/Header/styled';
import * as actions from '../../actions';
import * as selectorCreators from '../../selectorCreators';

class Header extends Component {
  constructor() {
    super();

    this.handleModalOpening = this.handleModalOpening.bind(this);
  }

  handleModalOpening() {
    return this.props.shareModalOpeningRequested({ id: this.props.id, wpType: 'posts' });
  }

  render() {
    const { title, author, date, time, totalCounts, areCountsReady } = this.props;
    return (
      <Container>
        <Title dangerouslySetInnerHTML={{ __html: title }} />
        <InnerContainer>
          <Author>{author}</Author>
          <StyledDate>{date}</StyledDate>
        </InnerContainer>
        <InnerContainer>
          <TotalShares isTotalReady={areCountsReady} onClick={this.handleModalOpening}>
            <IconShare size={18} />
            <TotalSharesText>{`${totalCounts} compartidos`}</TotalSharesText>
          </TotalShares>
          <ReadingTime>
            <IconClock size={18} />
            <ReadingTimeText>{`${time} minutos`}</ReadingTimeText>
          </ReadingTime>
        </InnerContainer>
      </Container>
    );
  }
}

Header.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.number.isRequired,
  totalCounts: PropTypes.number.isRequired,
  areCountsReady: PropTypes.bool.isRequired,
  shareModalOpeningRequested: PropTypes.func.isRequired
};

const mapStateToProps = (state, { id }) => ({
  totalCounts: selectorCreators.share.getTotalCounts(id)(state),
  areCountsReady: selectorCreators.share.areCountsReady(id)(state)
});

const mapDispatchToProps = dispatch => ({
  shareModalOpeningRequested: payload => dispatch(actions.share.openingRequested(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(
  inject(({ connection }, { id }) => ({
    title: connection.single.post[id].title,
    author: connection.single.post[id].author.name,
    date: fecha.format(new Date(connection.single.post[id].creationDate), 'DD.MM.YYYY - HH:mm[h]'),
    time: Math.round(readingTime(connection.single.post[id].content).minutes)
  }))(Header)
);

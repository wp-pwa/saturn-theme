/* eslint-disable jsx-a11y/no-static-element-interactions, react/no-danger */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'react-emotion';
import IconClock from 'react-icons/lib/md/access-time';
import IconShare from 'react-icons/lib/md/share';
import { dep } from 'worona-deps';
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
    const { title, author, date, readingTime, totalCounts, areCountsReady, active } = this.props;

    return (
      <PostTitle>
        {active ? (
          <ActiveTitle dangerouslySetInnerHTML={{ __html: title }} />
        ) : (
          <InactiveTitle dangerouslySetInnerHTML={{ __html: title }} />
        )}
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
            <ReadingTimeText>{`${readingTime} minutos`}</ReadingTimeText>
          </ReadingTime>
        </InnerContainer>
      </PostTitle>
    );
  }
}

Header.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  readingTime: PropTypes.number.isRequired,
  totalCounts: PropTypes.number.isRequired,
  areCountsReady: PropTypes.bool.isRequired,
  shareModalOpeningRequested: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired,
};

const mapStateToProps = (state, { id }) => ({
  title: selectorCreators.post.getTitle(id)(state),
  date: selectorCreators.post.getFormattedDate(id)(state),
  readingTime: selectorCreators.post.getReadingTime(id)(state),
  author: selectorCreators.post.getAuthor(id)(state),
  authorId: selectorCreators.post.getAuthorId(id)(state),
  totalCounts: selectorCreators.shareModal.getTotalCounts(id)(state),
  areCountsReady: selectorCreators.shareModal.areCountsReady(id)(state),
  Link: dep('connection', 'components', 'Link'),
});

const mapDispatchToProps = dispatch => ({
  shareModalOpeningRequested: payload => dispatch(actions.shareModal.openingRequested(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);

const PostTitle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const InnerContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: top;
`;

// There are two titles because of SEO (No more than one <h1> per page).

const ActiveTitle = styled.h1`
  box-sizing: border-box;
  width: 100%;
  margin: 0;
  margin-bottom: 10px;
  padding: 20px 15px;
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 1.8rem;
  line-height: 2.2rem;
  border-bottom: 1px solid #ddd;
`;

const InactiveTitle = styled.h2`
  box-sizing: border-box;
  width: 100%;
  margin: 0;
  margin-bottom: 10px;
  padding: 20px 15px;
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 1.8rem;
  line-height: 2.2rem;
  border-bottom: 1px solid #ddd;
`;

const Author = styled.a`
  font-weight: 300;
  padding: 5px 15px;
  color: ${({ theme }) => theme.postGrey};
  margin: 0;
  font-size: 0.9rem;
  text-transform: uppercase;
`;

const StyledDate = styled.p`
  font-weight: 300;
  margin: 0;
  padding: 5px 15px;
  color: ${({ theme }) => theme.postGrey};
  font-size: 0.9rem;
  text-align: right;
`;

const ReadingTime = styled.p`
  margin: 0;
  padding: 5px 15px;
  color: ${({ theme }) => theme.postGrey};
  display: flex;
  justify-content: flex-end;
  align-items: center;
  box-sizing: border-box;
`;

const ReadingTimeText = styled.span`
  font-weight: 300;
  font-size: 0.9rem;
  padding-left: 5px;
`;

const TotalShares = styled.p`
  margin: 0;
  padding: 5px 15px;
  color: ${({ theme }) => theme.postGrey};
  display: flex;
  justify-content: flex-start;
  align-items: center;
  box-sizing: border-box;
  transition: opacity 0.3s;
  opacity: ${({ isTotalReady }) => (isTotalReady ? 1 : 0)};
`;

const TotalSharesText = styled.span`
  font-weight: 300;
  font-size: 0.9rem;
  padding-left: 5px;
`;

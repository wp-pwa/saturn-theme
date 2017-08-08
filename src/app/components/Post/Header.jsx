/* eslint react/no-danger: 0 */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import IconClock from 'react-icons/lib/md/access-time';
import IconShare from 'react-icons/lib/md/share';
import styled from 'styled-components';

const Header = ({ title, author, date, readingTime, totalShares, totalSharesReady, sharePost }) =>
  <PostTitle>
    <Title dangerouslySetInnerHTML={{ __html: title }} />
    <InnerContainer>
      <Link to={`?author=${author.id}`}>
        <Author>
          {author.name}
        </Author>
      </Link>
      <StyledDate>
        {date}
      </StyledDate>
    </InnerContainer>
    <InnerContainer>
      <TotalShares onClick={sharePost}>
        <IconShare size={18} />
        <TotalSharesText isTotalReady={totalSharesReady}>
          {`${totalShares} compartidos`}
        </TotalSharesText>
      </TotalShares>
      <ReadingTime>
        <IconClock size={18} />
        <ReadingTimeText>{`${readingTime} minutos`}</ReadingTimeText>
      </ReadingTime>
    </InnerContainer>
  </PostTitle>;

Header.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.shape({}).isRequired,
  date: PropTypes.string.isRequired,
  readingTime: PropTypes.number,
  totalShares: PropTypes.number,
  totalSharesReady: PropTypes.bool,
  sharePost: PropTypes.func,
};

export default Header;

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

const Title = styled.h1`
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

const Author = styled.p`
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
`;

const TotalSharesText = styled.span`
  font-weight: 300;
  font-size: 0.9rem;
  transition: opacity 0.3s;
  padding-left: 5px;
  opacity: ${({ isTotalReady }) => (isTotalReady ? 1 : 0)};
`;

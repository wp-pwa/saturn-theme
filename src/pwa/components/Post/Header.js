import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import styled from 'react-emotion';
import fecha from 'fecha';
import readingTime from 'reading-time';
import IconClock from 'react-icons/lib/md/access-time';
import Shares from './Shares';

class Header extends PureComponent {
  static propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    time: PropTypes.number.isRequired
  };

  render() {
    const { id, title, author, date, time } = this.props;
    return (
      <PostTitle>
        <Title dangerouslySetInnerHTML={{ __html: title }} />
        <InnerContainer>
          <Author>{author}</Author>
          <StyledDate>{date}</StyledDate>
        </InnerContainer>
        <InnerContainer>
          <Shares id={id} />
          <ReadingTime>
            <IconClock size={18} />
            {time ? <ReadingTimeText>{`${time} minutos`}</ReadingTimeText> : null}
          </ReadingTime>
        </InnerContainer>
      </PostTitle>
    );
  }
}

export default inject(({ connection }, { id }) => ({
  title: connection.single.post[id].title,
  author: connection.single.post[id].author.name,
  date: fecha.format(new Date(connection.single.post[id].creationDate), 'DD.MM.YYYY - HH:mm[h]'),
  time: Math.round(readingTime(connection.single.post[id].content).minutes)
}))(Header);

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
  border-bottom: 1px solid #eee;
`;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'react-emotion';
import { dep } from 'worona-deps';
import Media from '../Media';
import ShareButton from './ShareButton';
import { innerText } from '../../libs';

class ListItemAlt extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    media: PropTypes.number.isRequired,
    excerpt: PropTypes.string.isRequired,
    selected: PropTypes.shape({}).isRequired,
    context: PropTypes.shape({}).isRequired,
    Link: PropTypes.func.isRequired,
  };

  constructor() {
    super();

    this.parseExcerpt = this.parseExcerpt.bind(this);
  }

  parseExcerpt() {
    const { excerpt } = this.props;
    return innerText(excerpt)
      .split('. ')[0]
      .concat('.');
  }

  render() {
    const { id, title, media, selected, context, Link } = this.props;
    const excerpt = this.parseExcerpt();

    return (
      <Post>
        <Link selected={selected} context={context}>
          <A>
            <Media lazy offsetHorizontal={-50} id={media} height="30vh" width="100%" />
            <Info>
              <Title dangerouslySetInnerHTML={{ __html: title }} />
              <Excerpt>{excerpt}</Excerpt>
            </Info>
          </A>
        </Link>
        <ShareButton id={id} type="posts" />
      </Post>
    );
  }
}

const mapStateToProps = () => ({
  Link: dep('connection', 'components', 'Link'),
});

export default connect(mapStateToProps)(ListItemAlt);

const Post = styled.div`
  box-sizing: border-box;
  min-height: 20vh;
  margin-bottom: 5px;
  background-color: ${({ theme }) => theme.postListLight};
  box-shadow: ${({ theme }) => `0 0 3px 0 ${theme.shadowColor}`};
  position: relative;
  display: flex;
  flex-direction: column;
`;

const A = styled.a`
  all: inherit;
  box-shadow: none;
  margin: 0;
`;

const Info = styled.div`
  box-sizing: border-box;
  width: 100%;
  min-height: 10vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Title = styled.h2`
  box-sizing: border-box;
  margin: 0;
  padding: 10px;
  padding-bottom: 5px;
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 1.2rem;
  line-height: 1.5rem;
  color: ${({ theme }) => theme.postListDark};
`;

const Excerpt = styled.p`
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-weight: 300;
  margin: 0;
  padding: 0 10px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.postListGrey};
  font-size: 0.8rem;
  hyphens: auto;
`;

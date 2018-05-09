import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import styled from 'react-emotion';
import { dep } from 'worona-deps';
import Image from '../../../shared/components/Image';
import ShareButton from './ShareButton';
import { getInnerText } from '../../../shared/helpers';

class ListItem extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    media: PropTypes.number,
    excerpt: PropTypes.string.isRequired,
    item: PropTypes.shape({}).isRequired,
    context: PropTypes.shape({}).isRequired,
    listShareButtonDisplay: PropTypes.bool,
    listExcerptDisplay: PropTypes.bool,
    Link: PropTypes.func.isRequired,
  };

  static defaultProps = {
    media: null,
    listShareButtonDisplay: true,
    listExcerptDisplay: true,
  };

  constructor() {
    super();

    this.parseExcerpt = this.parseExcerpt.bind(this);
  }

  parseExcerpt() {
    const { excerpt } = this.props;

    return getInnerText(excerpt)
      .split('. ')[0]
      .concat('.');
  }

  render() {
    const {
      type,
      id,
      title,
      media,
      item,
      context,
      listShareButtonDisplay,
      listExcerptDisplay,
      Link,
    } = this.props;
    const excerpt = this.parseExcerpt();

    return (
      <Post>
        <Link
          type={item.type}
          id={item.id}
          page={item.page}
          context={context}
          eventCategory="List"
          eventAction="open single"
        >
          <A>
            <Image lazy offsetHorizontal={-50} id={media} width="40%" height="auto" />
            <Info>
              <Title dangerouslySetInnerHTML={{ __html: title }} />
              {listExcerptDisplay ? <Excerpt>{excerpt}</Excerpt> : null}
            </Info>
          </A>
        </Link>
        {listShareButtonDisplay ? <ShareButton id={id} type={type} /> : null}
      </Post>
    );
  }
}

export default inject(({ settings }) => {
  const listShareButton = settings.theme.listShareButton || {};
  const listExcerpt = settings.theme.listExcerpt || {};

  return {
    listShareButtonDisplay: listShareButton.display,
    listExcerptDisplay: listExcerpt.display,
    Link: dep('connection', 'components', 'Link'),
  };
})(ListItem);

const Post = styled.div`
  box-sizing: border-box;
  min-height: 20vh;
  margin-bottom: 5px;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => `0 0 3px 0 ${theme.colors.shadow}`};
  position: relative;
  display: flex;
`;

const A = styled.a`
  box-shadow: none;
  display: flex;
  flex-direction: row-reverse;
  margin: 0;
  width: 100%;
`;

const Info = styled.div`
  box-sizing: border-box;
  width: 60%;
  height: 100%;
`;

const Title = styled.h2`
  box-sizing: border-box;
  margin: 0;
  padding: 10px;
  padding-right: 20px;
  padding-bottom: 5px;
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 1.1rem;
  line-height: 1.4rem;
  color: ${({ theme }) => theme.colors.black};
`;

const Excerpt = styled.p`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-weight: 300;
  padding: 0 10px;
  margin: 0;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.colors.grey};
  font-size: 0.8rem;
  hyphens: auto;
`;

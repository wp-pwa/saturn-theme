/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import styled from 'styled-components';
import Link from '../Link';
import ShareButton from './ListItemShareButton';
import { getInnerText } from '../../../shared/helpers';

class ListItemNoMedia extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    excerpt: PropTypes.string.isRequired,
    item: PropTypes.shape({}).isRequired,
    context: PropTypes.shape({}).isRequired,
    listShareButtonDisplay: PropTypes.bool,
    listExcerptDisplay: PropTypes.bool,
  };

  static defaultProps = {
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
      item,
      context,
      listShareButtonDisplay,
      listExcerptDisplay,
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
            <Info>
              <Title dangerouslySetInnerHTML={{ __html: title }} />
              {listExcerptDisplay ? <Excerpt>{excerpt}</Excerpt> : null}
            </Info>
          </A>
        </Link>
        {listShareButtonDisplay ? (
          <ShareButton id={id} type={type} itemType="alternative" />
        ) : null}
      </Post>
    );
  }
}

export default inject(({ stores: { settings } }) => {
  const listShareButton = settings.theme.listShareButton || {};
  const listExcerpt = settings.theme.listExcerpt || {};

  return {
    listShareButtonDisplay: listShareButton.display,
    listExcerptDisplay: listExcerpt.display,
  };
})(ListItemNoMedia);

const Post = styled.div`
  box-sizing: border-box;
  padding: 15px;
  background-color: ${({ theme }) => theme.colors.white};
  position: relative;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #999;

  img {
    border-radius: 4px;
  }
`;

const A = styled.a`
  all: inherit;
  box-shadow: none;
  margin: 0;
  border: none;
  padding: 0;
`;

const Info = styled.div`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-right: calc(15px + 44px);
  padding-bottom: 8px;
`;

const Title = styled.h2`
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  font-weight: 700;
  font-size: 1.1rem;
  line-height: 1.4rem;
  color: ${({ theme }) => theme.colors.black};
`;

const Excerpt = styled.p`
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-weight: 300;
  margin: 0;
  padding: 10px 0 0 0;
  color: ${({ theme }) => theme.colors.black};
  font-size: 0.8rem;
  hyphens: auto;
`;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { connect } from 'react-redux';
import styled from 'react-emotion';
import { dep } from 'worona-deps';
import ListItem from './ListItem';
import ListItemFirst from './ListItemFirst';
import ListItemAlt from './ListItemAlt';
import LoadMore from './LoadMore';
import Ad from '../../../shared/components/Ad';
import Spinner from '../../elements/Spinner';

class List extends Component {
  static propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    type: PropTypes.string.isRequired,
    ready: PropTypes.bool.isRequired,
    extract: PropTypes.bool,
    list: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    active: PropTypes.bool.isRequired,
    adsOptions: PropTypes.shape({}),
    adsFormats: PropTypes.arrayOf(PropTypes.shape({})),
    listContext: PropTypes.shape({}).isRequired,
  };

  static defaultProps = {
    extract: false,
    adsOptions: null,
    adsFormats: [],
  };

  constructor() {
    super();

    this.renderListItems = this.renderListItems.bind(this);
  }

  renderListItems(post, index) {
    const { type, id } = this.props;
    const { adsOptions, adsFormats, listContext } = this.props;
    const { firstAdPosition, postsBeforeAd } = adsOptions;
    const { id: postId, title, featured, excerpt, content } = post;
    const selected = { singleId: postId, singleType: 'post' };
    let ListItemType;

    if (!index) ListItemType = ListItemFirst;
    else if (index % 3 === 0) ListItemType = ListItemAlt;
    else ListItemType = ListItem;

    let adConfig = null;

    if (adsFormats.length > 0) {
      const currentIndex = index - firstAdPosition;
      const validIndex = currentIndex >= 0 && currentIndex % postsBeforeAd === 0;

      if (validIndex) {
        adConfig = adsFormats[Math.floor((index - firstAdPosition) / postsBeforeAd)];
      }
    }

    return [
      adConfig && <Ad key="ad" {...adConfig} item={{ type, id }} />,
      <ListItemType
        key={postId}
        id={postId}
        title={title}
        media={featured && featured.id}
        excerpt={excerpt || content}
        selected={selected}
        context={listContext}
      />,
    ];
  }

  render() {
    const { id, type, extract, ready, list, active } = this.props;

    return ready && !extract ? (
      <Container>
        {list.map(this.renderListItems)}
        {active && <LoadMore id={id} type={type} />}
      </Container>
    ) : (
      <SpinnerContainer>
        <Spinner />
      </SpinnerContainer>
    );
  }
}

const mapStateToProps = (state, { type }) => {
  const ads = dep('settings', 'selectorCreators', 'getSetting')('theme', 'adsConfig')(state);

  return {
    adsOptions: ads.options,
    adsFormats: ads.formats[type] || ads.formats.default,
  };
};

export default connect(mapStateToProps)(
  inject(({ connection }, { type, id }) => ({
    ready: connection.list[type][id].ready,
    list: connection.list[type][id].entities,
    listContext: {
      items: connection.list[type][id].page.map((e, k) => ({
        listId: id,
        listType: type,
        page: k + 1,
        extract: true,
      })),
      options: {
        bar: 'single',
      },
    },
  }))(List),
);

const Container = styled.div`
  box-sizing: border-box;
  z-index: -1;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;

  a {
    text-decoration: none;
    color: inherit;
    margin: 0;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;

const SpinnerContainer = styled.div`
  margin-top: 100%;
`;

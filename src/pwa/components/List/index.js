import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { connect } from 'react-redux';
import styled from 'react-emotion';
import ListItem from './ListItem';
import ListItemFirst from './ListItemFirst';
import ListItemAlt from './ListItemAlt';
import LoadMore from './LoadMore';
import Ad from '../../../shared/components/Ad';
import Spinner from '../../elements/Spinner';
import * as selectors from '../../selectors';

class List extends Component {
  static propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    type: PropTypes.string.isRequired,
    ready: PropTypes.bool.isRequired,
    extract: PropTypes.bool,
    list: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    active: PropTypes.bool.isRequired,
    adList: PropTypes.arrayOf(PropTypes.shape({})),
    firstAdPosition: PropTypes.number,
    postsBeforeAd: PropTypes.number,
    listContext: PropTypes.shape({}).isRequired,
  };

  static defaultProps = {
    adList: null,
    extract: false,
    firstAdPosition: null,
    postsBeforeAd: null,
  };

  constructor() {
    super();

    this.renderListItems = this.renderListItems.bind(this);
  }

  renderListItems(post, index) {
    const { type, id } = this.props;
    const { firstAdPosition, postsBeforeAd, adList, listContext } = this.props;
    const { id: postId, title, featured, excerpt, content } = post;
    const selected = { singleId: postId, singleType: 'post' };
    let ListItemType;

    if (!index) ListItemType = ListItemFirst;
    else if (index % 3 === 0) ListItemType = ListItemAlt;
    else ListItemType = ListItem;

    let adConfig = null;

    if (adList.length > 0) {
      const currentIndex = index - firstAdPosition;
      const validIndex = currentIndex >= 0 && currentIndex % postsBeforeAd === 0;

      if (validIndex) {
        adConfig = adList[Math.floor((index - firstAdPosition) / postsBeforeAd)];
      }
    }

    return [
      adConfig && <Ad key='ad' {...adConfig} item={{ type, id }} />,
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

const mapStateToProps = state => ({
  adList: selectors.ads.getList(state),
  firstAdPosition: selectors.ads.firstAdPosition(state),
  postsBeforeAd: selectors.ads.postsBeforeAd(state),
});

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

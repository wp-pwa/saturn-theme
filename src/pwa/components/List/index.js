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
import * as selectorCreators from '../../selectorCreators';

class List extends Component {
  static propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    type: PropTypes.string.isRequired,
    ready: PropTypes.bool.isRequired,
    extract: PropTypes.bool,
    list: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    active: PropTypes.bool.isRequired,
    adsOptions: PropTypes.shape({}),
    adsContentFormats: PropTypes.arrayOf(PropTypes.shape({})),
    listContext: PropTypes.shape({}).isRequired,
    bar: PropTypes.string.isRequired,
    RouteWaypoint: PropTypes.func.isRequired,
    menu: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  };

  static defaultProps = {
    extract: false,
    adsOptions: null,
    adsContentFormats: [],
  };

  constructor() {
    super();

    this.renderListItems = this.renderListItems.bind(this);
  }

  renderListItems(post, index) {
    const { type, id } = this.props;
    const { adsOptions, adsContentFormats, listContext } = this.props;
    const { id: postId, title, featured, excerpt, content } = post;
    const selected = { singleId: postId, singleType: 'post' };
    let ListItemType;

    if (!index) ListItemType = ListItemFirst;
    else if (index % 3 === 0) ListItemType = ListItemAlt;
    else ListItemType = ListItem;

    let adConfig = null;

    if (adsOptions && adsContentFormats.length > 0) {
      const { firstAdPosition, postsBeforeAd } = adsOptions;

      const currentIndex = index - firstAdPosition;
      const validIndex = currentIndex >= 0 && currentIndex % postsBeforeAd === 0;

      if (validIndex) {
        adConfig = adsContentFormats[Math.floor((index - firstAdPosition) / postsBeforeAd)];
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
    const { id, type, extract, ready, list, active, bar, RouteWaypoint, menu } = this.props;

    if (ready && !extract) {
      if (bar === 'single') {
        return (
          <RouteWaypoint
            active={active}
            entity={{ listType: type, listId: id }}
            event={{
              category: 'Post',
              action: 'scroll to latest',
            }}
          >
            <Container>
              <Header>{`Más en ${menu[0].label}`}</Header>
              {list.map(this.renderListItems)}
              {active && <LoadMore id={id} type={type} />}
            </Container>
          </RouteWaypoint>
        );
      }

      return (
        <Container>
          {list.map(this.renderListItems)}
          {active && <LoadMore id={id} type={type} />}
        </Container>
      );
    }

    return (
      <SpinnerContainer>
        <Spinner />
      </SpinnerContainer>
    );
  }
}

const mapStateToProps = (state, { type }) => ({
  adsOptions: selectorCreators.ads.getOptions(type)(state),
  adsContentFormats: selectorCreators.ads.getContentFormats(type)(state),
  RouteWaypoint: dep('connection', 'components', 'RouteWaypoint'),
  menu: dep('settings', 'selectorCreators', 'getSetting')('theme', 'menu')(state),
});

export default connect(mapStateToProps)(
  inject(({ connection }, { type, id }) => ({
    ready: connection.list[type][id].ready,
    list: connection.list[type][id].entities,
    bar: connection.context.options.bar,
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

const Header = styled.h4`
  margin: 0;
  margin-top: 20px;
  padding: 0 15px 10px 15px;
`;

const SpinnerContainer = styled.div`
  height: calc(100vh - ${({ theme }) => `${theme.heights.bar} - ${theme.heights.navbar}`});
  display: flex;
  justify-content: center;
  align-items: center;
`;

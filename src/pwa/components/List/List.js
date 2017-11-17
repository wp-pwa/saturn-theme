/* eslint-disable react/require-default-props */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'react-emotion';
import { dep } from 'worona-deps';
import ListItem from './ListItem';
import ListItemFirst from './ListItemFirst';
import ListItemAlt from './ListItemAlt';
import LoadMore from './LoadMore';
import Ad from '../../elements/Ad';
import Footer from '../Footer';
import Spinner from '../../elements/Spinner';
import * as selectors from '../../selectors';

class List extends Component {
  renderListItems = (id, index) => {
    const { firstAdPosition, postsBeforeAd, adList } = this.props;

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

    return (
      <div key={id}>
        {adConfig && <Ad {...adConfig} />}
        <ListItemType id={id} />
      </div>
    );
  };

  render() {
    const { isReady, postList, name, active } = this.props;

    return isReady ? (
      <Container>
        {postList.map(this.renderListItems)}
        {active && <LoadMore name={name} />}
        <Footer />
      </Container>
    ) : (
      <SpinnerContainer>
        <Spinner />
      </SpinnerContainer>
    );
  }
}

List.propTypes = {
  active: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  isReady: PropTypes.bool.isRequired,
  postList: PropTypes.arrayOf(PropTypes.number).isRequired,
  adList: PropTypes.arrayOf(PropTypes.shape({})),
  firstAdPosition: PropTypes.number,
  postsBeforeAd: PropTypes.number,
};

const mapStateToProps = (state, { name }) => ({
  isReady: dep('connection', 'selectorCreators', 'isListReady')(name)(state),
  postList: dep('connection', 'selectorCreators', 'getListResults')(name)(state),
  adList: selectors.ads.getList(state),
  firstAdPosition: selectors.ads.firstAdPosition(state),
  postsBeforeAd: selectors.ads.postsBeforeAd(state),
});

export default connect(mapStateToProps)(List);

const Container = styled.div`
  box-sizing: border-box;
  padding-top: ${({ theme }) => `calc(${theme.titleSize} + ${theme.navbarSize})`};
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

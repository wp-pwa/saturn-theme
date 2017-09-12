/* eslint-disable react/require-default-props */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
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
  shouldComponentUpdate(nextProps) {
    return (
      nextProps.isReady !== this.props.isReady ||
      JSON.stringify(nextProps.postList) !== JSON.stringify(this.props.postList)
    );
  }

  renderListItems = (id, index) => {
    const { postsBeforeAd, adList } = this.props;

    let ListItemType;

    if (!index) ListItemType = ListItemFirst;
    else if (index % 3 === 0) ListItemType = ListItemAlt;
    else ListItemType = ListItem;

    const adConfig =
      adList.length > 0 && (index + 1) % postsBeforeAd === 0
        ? adList[Math.floor(index / postsBeforeAd)]
        : null;

    return (
      <div key={id}>
        <ListItemType id={id} />
        {adConfig && <Ad {...adConfig} />}
      </div>
    );
  };

  render() {
    if (!this.props.isReady)
      return (
        <SpinnerContainer>
          <Spinner />
        </SpinnerContainer>
      );

    return (
      <Container>
        {this.props.postList.map(this.renderListItems)}
        <LoadMore />
        <Footer />
      </Container>
    );
  }
}

List.propTypes = {
  isReady: PropTypes.bool.isRequired,
  postList: PropTypes.arrayOf(PropTypes.number).isRequired,
  adList: PropTypes.arrayOf(PropTypes.shape({})),
  postsBeforeAd: PropTypes.number,
};

const mapStateToProps = state => ({
  isReady: dep('connection', 'selectorCreators', 'isListReady')('currentList')(state),
  postList: dep('connection', 'selectorCreators', 'getListResults')('currentList')(state),
  adList: selectors.ads.getList(state),
  postsBeforeAd: selectors.ads.postsBeforeAd(state),
});

export default connect(mapStateToProps)(List);

const Container = styled.div`
  box-sizing: border-box;
  padding-top: calc(${props => props.theme.titleSize} + ${props => props.theme.navbarSize});
  height: 100vh;
  z-index: 0;

  a {
    text-decoration: none;
    color: inherit;
    margin: 0;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;

const SpinnerContainer = styled.div`margin-top: 100%;`;

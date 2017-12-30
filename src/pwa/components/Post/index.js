import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import styled from 'react-emotion';
import { dep } from 'worona-deps';
import Media from '../Media';
import Header from './Header';
import Content from '../../elements/Content';
import SeoWord from '../../elements/SeoWord';
import TagList from './TagList';
import Spinner from '../../elements/Spinner';
import Comments from '../Comments';
import Carousel from '../Carousel';
import Footer from '../Footer';
import * as selectors from '../../selectors';

class Post extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    media: PropTypes.number,
    slide: PropTypes.number.isRequired,
    ready: PropTypes.bool.isRequired,
    menuLists: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    fromListId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    fromListType: PropTypes.string.isRequired,
    disqusShortname: PropTypes.string
  };

  static defaultProps = {
    media: null,
    disqusShortname: null
  };

  constructor() {
    super();

    this.state = {
      currentList: null,
      carouselLists: null
    };

    this.setLists = this.setLists.bind(this);
  }

  componentWillMount() {
    this.setLists();
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.menuLists !== nextProps.menuLists ||
      this.props.fromListId !== nextProps.fromListId ||
      this.props.fromListType !== nextProps.fromListType
    ) {
      this.setLists(nextProps);
    }
  }

  componentDidUpdate(prevProps) {
    const update = {};

    console.log('Post componentDidUpdate:', this.props.id);

    for (const key in prevProps) {
      if (prevProps[key] !== this.props[key])
        update[key] = { prev: prevProps[key], current: this.props[key] };
    }

    console.log(update);
  }

  setLists(nextProps = this.props) {
    const listType = nextProps.fromListType;
    const listId = nextProps.fromListId;
    const index = nextProps.menuLists.findIndex(
      item => item.type === listType && item.id === listId
    );
    const extendedLists = nextProps.menuLists.concat(nextProps.menuLists.slice(0, 2));
    const carouselLists = extendedLists.slice(index, index + 3);
    const currentList = carouselLists.splice(0, 1)[0];

    this.setState({
      currentList,
      carouselLists
    });
  }

  render() {
    const { id, media, slide, ready, disqusShortname } = this.props;
    const { currentList, carouselLists } = this.state;

    return ready ? (
      <Container>
        <Placeholder />
        <Media id={media} height="55vh" width="100%" />
        <Header id={id} />
        <Content
          id={id}
          type="post"
          slide={slide}
          elementsToInject={[
            {
              index: 3,
              doNotPlaceAtTheEnd: true,
              value: (
                <Carousel
                  title="Te puede interesar..."
                  size="small"
                  type={currentList.type}
                  id={currentList.id}
                  excludeTo={id}
                  limit={5}
                />
              )
            }
          ]}
        />
        <TagList id={id} />
        {disqusShortname && <Comments id={id} shortname={disqusShortname} />}
        <Carousel
          title="Siguientes artículos"
          size="small"
          type={currentList.type}
          id={currentList.id}
          excludeTo={id}
          limit={5}
        />
        {carouselLists.map(list => (
          <Carousel
            key={list.id}
            title={`Más en ${list.title}`}
            size="medium"
            type={list.type}
            id={list.id}
            exclude={id}
            limit={5}
          />
        ))}
        <SeoWord />
        <Footer />
      </Container>
    ) : (
      <SpinnerContainer>
        <Spinner />
      </SpinnerContainer>
    );
  }
}

const mapStateToProps = state => ({
  menuLists: selectors.list.getMenuLists(state),
  disqusShortname: dep('settings', 'selectorCreators', 'getSetting')('theme', 'disqus')(state)
});

export default compose(
  connect(mapStateToProps),
  inject(({ connection }, { id }) => ({
    ready: connection.single.post[id] && connection.single.post[id].ready,
    media: connection.single.post[id] && connection.single.post[id].featured.id,
    fromListId: connection.selected.fromList.listId,
    fromListType: connection.selected.fromList.listType
  }))
)(Post);

const Container = styled.div`
  box-sizing: border-box;
  padding-bottom: ${({ theme }) => theme.shareBarHeight};
  background-color: ${({ theme }) => theme.postLight};
  color: ${({ theme }) => theme.postDark};
  transition: padding-top 0.5s ease;
  z-index: 0;
  position: relative;
`;

const Placeholder = styled.div`
  width: 100%;
  height: ${({ theme }) => theme.titleSize};
  background-color: ${({ theme }) => theme.bgColor};
`;

const SpinnerContainer = styled.div`
  width: 100%;
  height: 100vh;
`;

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Lightbox from 'react-image-lightbox';
import Item from './Item';
import XofY from '../XofY';
import LightBoxStyles from '../../styles/lightbox';

class ItemList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mediaIndex: 0,
      isOpen: false,
    };

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.previous = this.previous.bind(this);
    this.next = this.next.bind(this);
  }

  open(index) {
    this.setState({
      mediaIndex: index,
      isOpen: true,
    });
  }

  close() {
    this.setState({ isOpen: false });
  }

  previous() {
    const { length } = this.props.mediaAttributes;
    const { mediaIndex } = this.state;
    this.setState({
      mediaIndex: (mediaIndex + length - 1) % length,
    });
  }

  next() {
    const { length } = this.props.mediaAttributes;
    const { mediaIndex } = this.state;
    this.setState({
      mediaIndex: (mediaIndex + 1) % length,
    });
  }

  render() {
    const { mediaIndex, isOpen } = this.state;
    const { mediaAttributes } = this.props;
    const { length } = mediaAttributes;
    const mediaSrc = mediaAttributes.map(({ src }) => src);
    const items = mediaAttributes.map(({ alt, sizes, src, srcset }, index) => (
      <Item
        onClick={() => this.open(index)}
        key={src}
        alt={alt}
        sizes={sizes}
        src={src}
        srcset={srcset}
        first={index === 0}
        length={mediaAttributes.length}
      />
    ));

    return (
      <Container>
        <List length={items.length}>{items}</List>
        {isOpen && (
          <Fragment>
            <LightBoxStyles />
            <Lightbox
              wrapperClassName="lightbox"
              enableZoom={false}
              imageTitle={
                <Header>
                  <XofY x={mediaIndex + 1} y={length} />
                </Header>
              }
              mainSrc={mediaSrc[mediaIndex]}
              nextSrc={mediaSrc[(mediaIndex + 1) % length]}
              prevSrc={mediaSrc[(mediaIndex + length - 1) % length]}
              onCloseRequest={this.close}
              onMovePrevRequest={this.previous}
              onMoveNextRequest={this.next}
              reactModalStyle={{
                overlay: {
                  backgroundColor: '#0e0e0e',
                },
                content: {
                  outline: 'none !important',
                },
              }}
            />
          </Fragment>
        )}
      </Container>
    );
  }
}

ItemList.propTypes = {
  mediaAttributes: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default ItemList;

const Container = styled.div`
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  overflow-x: scroll;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const List = styled.ul`
  height: 100%;
  width: calc(
    16px + 8px + (290px * ${({ length }) => length}) +
      (8px * ${({ length }) => length})
  );
  display: flex;
  flex-flow: row nowrap;
  justify-content: left;
  align-items: stretch;
  list-style: none;
  margin: 0;
  padding: 0 16px;
`;

const Header = styled.div`
  position: fixed;
  top: 0;
  left: ${({ theme }) => theme.heights.bar};
  height: ${({ theme }) => theme.heights.bar};
  width: calc(100vw - (2 * ${({ theme }) => theme.heights.bar}));
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
`;

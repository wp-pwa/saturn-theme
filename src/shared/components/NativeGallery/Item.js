import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'react-emotion';
import { dep } from 'worona-deps';

const Item = ({ alt, sizes, src, srcset }) => (
  <Container>
    <Media alt={alt} sizes={sizes} src={src} srcset={srcset} />
  </Container>
);

Item.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  sizes: PropTypes.string,
  srcset: PropTypes.string,
};

Item.defaultProps = {
  alt: '',
  sizes: null,
  srcset: null,
}

const mapStateToProps = () => ({
  Link: dep('connection', 'components', 'Link'),
});

export default connect(mapStateToProps)(Item);

const Container = styled.li`
  box-sizing: border-box;
  width: 40vmin;
  height: 100%;
  margin-right: 1.5vmin;
  flex-shrink: 0;
  background-color: ${({ theme }) => theme.colors.white};
  position: relative;
`;

const Media = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'react-emotion';
import { dep } from 'worona-deps';
import Media from '../Media';

const Item = ({ id, Link }) => (
  <Container>
    <Link selected={{ singleType: 'media', singleId: id }} context={null}>
      <Media lazy offsetHorizonal={30} id={id} width="40vw" height="100%" />
    </Link>
  </Container>
);

Item.propTypes = {
  Link: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};

const mapStateToProps = () => ({
  Link: dep('connection', 'components', 'Link'),
});

export default connect(mapStateToProps)(Item);

const Container = styled.li`
  box-sizing: border-box;
  width: 40vw;
  height: calc(100% - 15px);
  margin: 15px;
  flex-shrink: 0;
  background-color: ${({ theme }) => theme.colors.white};
  position: relative;
`;

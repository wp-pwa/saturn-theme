import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'react-emotion';
import { dep } from 'worona-deps';
import Media from '../Media';

const Item = ({ id, Link, context }) => (
  <Container>
    <Link selected={{ singleType: 'media', singleId: id }} context={context}>
      <a>
        <Media lazy offsetHorizonal={30} id={id} width="30vmin" height="100%" />
      </a>
    </Link>
  </Container>
);

Item.propTypes = {
  context: PropTypes.shape({}).isRequired,
  Link: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};

const mapStateToProps = () => ({
  Link: dep('connection', 'components', 'Link'),
});

export default connect(mapStateToProps)(Item);

const Container = styled.li`
  box-sizing: border-box;
  width: 30vmin;
  height: 100%;
  margin-right: 1.5vmin;
  flex-shrink: 0;
  background-color: ${({ theme }) => theme.colors.white};
  position: relative;
`;

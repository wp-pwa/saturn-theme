import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'react-emotion';
import { dep } from 'worona-deps';
import Image from '../Image';

const Item = ({ id, Link, context }) => (
  <Container>
    <Link
      selected={{ singleType: 'media', singleId: id }}
      context={context}
      event={{ category: 'Post', action: 'open media' }}
    >
      <a>
        <Image lazy offsetHorizonal={30} id={id} width="40vmin" height="100%" />
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
  width: 40vmin;
  height: 100%;
  margin-right: 1.5vmin;
  flex-shrink: 0;
  background-color: ${({ theme }) => theme.colors.white};
  position: relative;

  &:last-child {
    margin-right: 0;
  }
`;

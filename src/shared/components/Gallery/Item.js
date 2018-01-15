import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { inject } from 'mobx-react';
import { compose } from 'recompose';
import { dep } from 'worona-deps';
import Media from '../Media';

const Item = ({ ready, id, Link }) =>
  ready && id ? (
    <Link selected={{ singleType: 'media', singleId: id }} context={null}>
      <Media lazy offsetHorizonal={30} id={id} width="60vw" height="100%" />
    </Link>
  ) : <p>Not ready</p>;

Item.propTypes = {
  Link: PropTypes.func.isRequired,
  ready: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired,
}



const mapStateToProps = () => ({
  Link: dep('connection', 'components', 'Link'),
});

export default compose(
  connect(mapStateToProps),
  inject((stores, { id }) => ({
    ready: stores.connection.single.media[id].ready,
  })),
)(Item);

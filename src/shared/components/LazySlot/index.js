import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LazyLoad from 'react-lazy-fastdom';
import { connect } from 'react-redux';
import { Slot } from 'react-slot-fill';
import { dep } from 'worona-deps';

class LazySlot extends Component {
  constructor(props) {
    super(props);
    const { ssr } = props;
    this.state = { ssr };
  }

  render() {

    const { name, className } = this.props;
    const { ssr } = this.state;

    if (ssr) return <Slot name={name} className={className}/>

    return (
      <LazyLoad offsetHorizontal={-50} throttle={50} className={className}>
        <Slot name={name} className={className}/>
      </LazyLoad>
    );
  }
};

LazySlot.propTypes = {
  name: PropTypes.string.isRequired,
  ssr: PropTypes.bool.isRequired,
  className: PropTypes.string,
};

LazySlot.defaultProps = {
  className: '',
};

const mapStateToProps = state => ({
  ssr: dep('build', 'selectors', 'getSsr')(state),
});

export default connect(mapStateToProps)(LazySlot);

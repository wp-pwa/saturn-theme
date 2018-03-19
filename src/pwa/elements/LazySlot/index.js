import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LazyLoad from 'react-lazy-fastdom';
import { connect } from 'react-redux';
import { inject } from 'mobx-react';
import { Slot } from 'react-slot-fill';
import { dep } from 'worona-deps';

class LazySlot extends Component {
  constructor(props) {
    super(props);
    const { active, ssr } = props;
    this.state = { active, ssr };
  }

  componentWillReceiveProps(nextProps) {
    const active = this.state.active || nextProps.active;
    this.setState({ active });
  }

  render() {

    const { name, className } = this.props;
    // const { active, ssr } = this.state;

    // if (!active) return <div className={className} style={{ visibility: 'hidden' }} />;

    // if (ssr) return <Slot name={name} className={className}/>

    return (
      <LazyLoad offsetHorizontal={-1} throttle={50} className={className}>
        <Slot name={name} className={className}/>
      </LazyLoad>
    );
  }
};

LazySlot.propTypes = {
  active: PropTypes.bool.isRequired,
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

export default connect(mapStateToProps)(
  inject(({ connection: { selected } }, { type, id }) => ({
    active: selected.type === type && selected.id === id,
  }))(LazySlot),
);

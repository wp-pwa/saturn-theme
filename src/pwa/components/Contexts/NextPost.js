import React, { Component } from 'react';
import PropTypes from 'prop-types';
import universal from 'react-universal-component';
import { inject } from 'mobx-react';
import Waypoint from 'react-waypoint';

import Spinner from '../../elements/Spinner';
import { SpinnerContainer } from './styled';

const loading = (
  <SpinnerContainer>
    <Spinner />
  </SpinnerContainer>
);

const DynamicPost = universal(import('../Post'), { loading });

class NextPost extends Component {
  constructor(props) {
    super(props);
    this.state = { active: false };
    this.activate = this.activate.bind(this);
    this.deactivate = this.deactivate.bind(this);
  }

  activate() {
    this.setState({ active: true });
  }

  deactivate() {
    this.setState({ active: false });
  }

  render() {
    const { activate, deactivate } = this;
    const { id, slide } = this.props;
    const { active } = this.state;
    return [
      active ? <DynamicPost key={id} id={id} active={false} slide={slide} /> : null,
      <Waypoint offsetTop={-200} onEnter={activate} onLeave={deactivate} />,
    ];
  }
}

NextPost.propTypes = {
  id: PropTypes.number.isRequired,
  slide: PropTypes.number.isRequired,
};

export default inject(({ connection }, { selected }) => {
  const { columns } = connection.context;
  const { column, next } = connection.context.getItem(selected);
  const { id } = next;
  const slide = columns.indexOf(column);
  return { id, slide };
})(NextPost);

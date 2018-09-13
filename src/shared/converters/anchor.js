import React from 'react';
import Anchor from '../components/Anchor';

export default {
  test: ({ component, props }) =>
    component === 'a' && props.href && /^#(\S+)/.test(props.href),
  process: (element, { extraProps }) => {
    const {
      props: { href, className },
    } = element;

    return children => (
      <Anchor
        key={href}
        hash={href}
        item={extraProps.item}
        className={className}
      >
        {children}
      </Anchor>
    );
  },
};

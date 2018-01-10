import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';

class AdSense extends PureComponent {
  static propTypes = {
    client: PropTypes.string.isRequired,
    slot: PropTypes.string.isRequired,
    format: PropTypes.string,
    width: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    height: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  };

  static defaultProps = {
    format: null,
    width: 300,
    height: 250,
  };

  static push() {
    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    } catch (e) {
      // console.warn(e);
    }
  }

  componentDidMount() {
    if (window) AdSense.push();
  }

  componentWillUnmount() {
    // Removes Google's handler for this ad
    const iframe = this.node.querySelector('iframe');
    if (iframe) {
      const { google_iframe_oncopy: { handlers } } = window;
      delete handlers[iframe.id];
    }
  }

  render() {
    const { client, slot, width, height, format } = this.props;
    return (
      <StyledIns
        innerRef={ins => {
          this.node = ins;
        }}
        className="adsbygoogle"
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format={format}
        width={width}
        height={height}
      />
    );
  }
}

export default AdSense;

const StyledIns = styled.ins`
  display: inline-block;
  background: white;
  width: ${({ width }) => (typeof width === 'number') ? `${width}px` : width};
  height: ${({ height }) => (typeof height === 'number') ? `${height}px` : height};
`;

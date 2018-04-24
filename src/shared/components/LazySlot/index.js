import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import { connect } from 'react-redux';
import { Slot } from 'react-slot-fill';
import { dep } from 'worona-deps';
import LazyLoad from '@frontity/lazyload';
import Spinner from '../../../pwa/elements/Spinner';

class LazySlot extends Component {
  constructor(props) {
    super(props);
    const { ssr } = props;
    this.state = { ssr, loaded: ssr };
    this.onLoad = this.onLoad.bind(this);
  }

  onLoad() {
    this.setState({ loaded: true });
  }

  render() {
    const { name, className, fillChildProps } = this.props;
    const { ssr, loaded } = this.state;

    if (ssr) return <Slot name={name} className={className} fillChildProps={fillChildProps} />;

    return (
      <Slot name={name} className={className} fillChildProps={fillChildProps}>
        {([element]) =>
          !ssr ? (
            <Container className={className}>
              <StyledLazy
                offsetHorizontal={-50}
                throttle={50}
                loaded={loaded}
                debounce={false}
                className={className}>
                {React.cloneElement(element, { onLoad: this.onLoad })}
              </StyledLazy>
              {!loaded && (
                <SpinnerContainer>
                  <Spinner />
                </SpinnerContainer>
              )}
            </Container>
          ) : (
            element
          )
        }
      </Slot>
    );
  }
}

LazySlot.propTypes = {
  name: PropTypes.string.isRequired,
  ssr: PropTypes.bool.isRequired,
  className: PropTypes.string,
  fillChildProps: PropTypes.shape({}),
};

LazySlot.defaultProps = {
  className: '',
  fillChildProps: {},
};

const mapStateToProps = state => ({
  ssr: dep('build', 'selectors', 'getSsr')(state),
});

export default connect(mapStateToProps)(LazySlot);

const StyledLazy = styled(LazyLoad)`
  filter: ${({ loaded }) => (loaded ? 'opacity(100%)' : 'opacity(0)')};
  transition: filter 300ms ease-in;
`;

const Container = styled.div`
  display: block;
  position: relative;
  width: 100%;
  height: 100%;
`

const SpinnerContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
`;

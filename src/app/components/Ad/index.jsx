/* global window */
import React, { PropTypes } from 'react';
import uniqid from 'uniqid';
import styled from 'styled-components';
import LoadUnload from '../../elements/LoadUnload';

const create = args => {
  const sas = (window.sas = window.sas || {});
  sas.cmd = sas.cmd || [];
  sas.cmd.push(() => {
    sas.call('iframe', {
      ...args,
      async: true,
    });
  });
};

// const remove = ({ tagId }) => {
//   const ad = window.document.getElementById(tagId);
//   while (ad.firstChild) {
//     ad.removeChild(ad.firstChild);
//   }
// };

const Ad = props => {
  const { siteId, pageId, formatId, target, width, height } = props;
  const tagId = `${formatId}_${uniqid.time()}`;

  return (
    <Container width={width} height={height}>
      <IconContainer>
        <IconText>
          {'ad'}
        </IconText>
      </IconContainer>
      <StyledLoadUnload
        once
        width={width}
        height={height}
        topOffset={-200}
        bottomOffset={-200}
        onEnter={() => {
          console.log('enter', tagId);
          create({ siteId, pageId, formatId, target, width, height, tagId });
        }}
      >
        <InnerContainer id={tagId} width={width} height={height} />
      </StyledLoadUnload>
    </Container>
  );
};

Ad.propTypes = {
  siteId: PropTypes.number.isRequired,
  pageId: PropTypes.number.isRequired,
  formatId: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  target: PropTypes.string,
};

export default Ad;

const Container = styled.div`
  margin: 30px auto;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 100%;
  height: ${({ height }) => height}px;
  width: ${({ width }) => width}px;
  background-color: #f5f5f5;

  * {
    max-width: 100%;
  }
`;

const IconContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const IconText = styled.span`
  margin: 0;
  padding: 3px 5px;
  font-size: 20px;
  line-height: 20px;
  color: #fff;
  text-transform: uppercase;
  border: 3px solid #fff;
  border-radius: 10px;
`;

const StyledLoadUnload = styled(LoadUnload)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
`;

const InnerContainer = styled.div`
  width: 100%;
  height: 100%;

  iframe {
    max-width: 100%;
  }
`;

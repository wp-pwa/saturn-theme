/* eslint-disable jsx-a11y/no-static-element-interactions, react/no-danger,  no-confusing-arrow */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import IconClose from 'react-icons/lib/md/close';
import styled from 'styled-components';
import Media from '../Media';

import * as selectors from '../../selectors';
import * as actions from '../../actions';

import ShareLink from './ShareLink';
import ShareButton from './ShareButton';
import ShareEmail from './ShareEmail';

const Share = ({ isOpen, entity, goBack, countsReady, totalShares }) =>
  <Container isOpen={isOpen}>
    <Overlay onClick={goBack} />
    <Modal isOpen={isOpen}>
      <Header>
        <Shares isVisible={countsReady}>
          <SharesValue>{totalShares}</SharesValue> Compartidos
        </Shares>
        <CloseButton size={33} onClick={goBack} />
      </Header>
      {!!entity &&
        <Body>
          <Preview>
            <Media id={entity.featured_media} width="50%" />
            <Title dangerouslySetInnerHTML={{ __html: entity.title.rendered }} />
          </Preview>
          <List>
            <ListItem>
              <ShareLink url={entity.link} buttonText="Copiar link" buttonTextOnClick="Copiado" />
            </ListItem>
            <ListItem>
              <ShareButton
                title={entity.title.rendered}
                url={entity.link}
                type="facebook"
                countText="Compartidos"
                buttonText="COMPARTIR"
              />
            </ListItem>
            <ListItem>
              <ShareButton
                title={entity.title.rendered}
                url={entity.link}
                type="twitter"
                buttonText="TUITEAR"
              />
            </ListItem>
            <ListItem>
              <ShareButton
                title={entity.title.rendered}
                url={entity.link}
                type="whatsapp"
                buttonText="Compartir"
              />
            </ListItem>
            <ListItem>
              <ShareButton
                title={entity.title.rendered}
                url={entity.link}
                type="telegram"
                buttonText="Compartir"
              />
            </ListItem>
            <ListItem>
              <ShareButton
                title={entity.title.rendered}
                url={entity.link}
                type="linkedin"
                countText="Compartidos"
                buttonText="COMPARTIR"
              />
            </ListItem>
            <ListItem>
              <ShareButton
                title={entity.title.rendered}
                url={entity.link}
                type="google"
                countText="Compartidos"
                buttonText="COMPARTIR"
              />
            </ListItem>
            <ListItem>
              <ShareEmail title={entity.title.rendered} url={entity.link} buttonText="ENVIAR" />
            </ListItem>
          </List>
        </Body>}
    </Modal>
  </Container>;

Share.propTypes = {
  isOpen: PropTypes.bool,
  entity: PropTypes.shape({}),
  goBack: PropTypes.func,
  countsReady: PropTypes.bool,
  totalShares: PropTypes.number,
};

const mapStateToProps = state => ({
  isOpen: selectors.shareModal.isOpen(state),
  entity: selectors.shareModal.getEntity(state),
  countsReady: selectors.shareModal.areCurrentCountsReady(state),
  totalShares: selectors.shareModal.getCurrentTotalShares(state),
});

const mapDispatchToProps = dispatch => ({
  goBack: () => dispatch(actions.shareModal.close()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Share);

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 100;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  transition: ${({ isOpen }) =>
    isOpen ? 'opacity 300ms' : 'opacity 300ms, visibility 0s linear 300ms'};
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
`;

const Modal = styled.div`
  width: 100%;
  position: absolute;
  transform: ${({ isOpen }) => (isOpen ? 'translateY(0)' : 'translateY(100%)')};
  bottom: 0;
  background-color: white;
  -webkit-transition: transform 300ms;
  transition: transform 300ms;
`;

const Header = styled.div`
  background-color: white;
  height: 70px;
  padding: 0 15px;
  position: relative;
  box-sizing: border-box;
  top: 0;
  width: 100%;
  border-bottom: 1px solid #ddd;
`;

const Shares = styled.div`
  font-size: 1.115em;
  line-height: 70px;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transition: opacity 300ms;
`;

const SharesValue = styled.span`
  font-weight: bold;
  font-size: 1em;
`;

const CloseButton = styled(IconClose)`
  position: absolute;
  right: 5px;
  top: 50%;
  transform: translateY(-50%);
`;

const Body = styled.div`
  max-height: 320px;
  display: block;
  overflow-x: hidden;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
`;

const Preview = styled.div`
  padding-top: 15px;
  min-height: 90px;
  padding: 15px 15px 0 15px;
  display: flex;
`;

const Title = styled.h1`
  box-sizing: border-box;
  flex-shrink: 0;
  padding-left: 15px;
  width: 50%;
  font-size: 16px;
  line-height: 1.2353;
  margin: 0;
`;

const List = styled.ul`
  padding: 0;
  margin: 1em;
  margin-bottom: 0;
`;

const ListItem = styled.li`
  list-style: none;
  border-top: 1px solid #dddddd;
  height: 40px;
  padding: 12px 0 11px;
  position: relative;
  text-align: left;
`;

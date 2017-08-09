/* eslint-disable jsx-a11y/no-static-element-interactions, react/no-danger,  no-confusing-arrow */
import React, { PropTypes } from "react";
import { connect } from "react-redux";
import styled, { keyframes } from "styled-components";
import Transition from "react-transition-group/Transition";
import IconClose from "react-icons/lib/md/close";
import Media from "../Media";
import ShareLink from "./ShareLink";
import ShareButton from "./ShareButton";
import ShareEmail from "./ShareEmail";
import * as selectors from "../../selectors";
import * as actions from "../../actions";

const Share = ({ isOpen, entity, goBack, countsReady, totalShares }) =>
  <Transition in={isOpen} timeout={1000} mountOnEnter unmountOnExit>
    {status =>
      <Container>
        <Overlay status={status} onClick={goBack} />
        <Modal status={status}>
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
                <Title
                  dangerouslySetInnerHTML={{ __html: entity.title.rendered }}
                />
              </Preview>
              <List>
                <ListItem>
                  <ShareLink
                    url={entity.link}
                    buttonText="Copiar link"
                    buttonTextOnClick="Copiado"
                  />
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
                  <ShareEmail
                    title={entity.title.rendered}
                    url={entity.link}
                    buttonText="ENVIAR"
                  />
                </ListItem>
              </List>
            </Body>}
        </Modal>
      </Container>}
  </Transition>;

Share.propTypes = {
  isOpen: PropTypes.bool,
  entity: PropTypes.shape({}),
  goBack: PropTypes.func,
  countsReady: PropTypes.bool,
  totalShares: PropTypes.number
};

const mapStateToProps = state => ({
  isOpen: selectors.shareModal.isOpen(state),
  entity: selectors.shareModal.getEntity(state),
  countsReady: selectors.shareModal.areCurrentCountsReady(state),
  totalShares: selectors.shareModal.getCurrentTotalShares(state)
});

const mapDispatchToProps = dispatch => ({
  goBack: () => dispatch(actions.shareModal.close())
});

export default connect(mapStateToProps, mapDispatchToProps)(Share);

const fadeIn = keyframes`
  from {
    filter: opacity(0%);
  } to {
    filter: opacity(50%);
  }
`;

const fadeOut = keyframes`
  from {
    filter: opacity(50%);
  } to {
    filter: opacity(0%);
  }
`;

const getIn = keyframes`
  from {
    transform: translateY(100%)
  } to {
    transform: translateY(0%);
  }
`;

const getOut = keyframes`
  from {
    transform: translateY(0%)
  } to {
    transform: translateY(100%);
  }
`;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 100;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: filter 1000ms ease;
  background-color: #000;

  animation-name: ${({ status }) =>
    status.startsWith("enter") ? fadeIn : fadeOut};
  animation-duration: 1000ms;
  animation-fill-mode: forwards;
  animation-iteration-count: 1;
`;

const Modal = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;
  background-color: white;
  transition: transform 0.3s;

  animation-name: ${({ status }) =>
    status.startsWith("enter") ? getIn : getOut};
  animation-duration: 1000ms;
  animation-fill-mode: forwards;
  animation-iteration-count: 1;
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
  filter: opacity(${({ isVisible }) => (isVisible ? 100 : 0)}%);
  transition: filter 0.3s ease 0.3s;
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

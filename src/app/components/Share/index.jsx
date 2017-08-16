/* eslint-disable jsx-a11y/no-static-element-interactions, react/no-danger,  no-confusing-arrow */
import React, { PropTypes, PureComponent } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Transition from 'react-transition-group/Transition';
import Media from '../Media';
import ShareLink from './ShareLink';
import ShareButton from './ShareButton';
import ShareEmail from './ShareEmail';
import CloseButton from './CloseButton';
import * as selectors from '../../selectors';
import * as actions from '../../actions';

class Share extends PureComponent {
  constructor() {
    super();

    this.shares = [
      {
        El: ShareLink,
        type: 'copy',
        buttonText: 'Copiar link',
        buttonTextOnClick: 'Copiado',
      },
      {
        El: ShareButton,
        type: 'facebook',
        countText: 'Compartidos',
        buttonText: 'Compartir',
      },
      {
        El: ShareButton,
        type: 'twitter',
        buttonText: 'Tuitear',
      },
      {
        El: ShareButton,
        type: 'whatsapp',
        buttonText: 'Compartir',
      },
      {
        El: ShareButton,
        type: 'telegram',
        buttonText: 'Compartir',
      },
      {
        El: ShareButton,
        type: 'linkedin',
        countText: 'Compartidos',
        buttonText: 'Compartir',
      },
      {
        El: ShareButton,
        type: 'google',
        countText: 'Compartidos',
        buttonText: 'Compartir',
      },
      {
        El: ShareEmail,
        type: 'email',
        buttonText: 'Enviar',
      },
    ];
  }

  render() {
    const {
      isOpen,
      entity,
      countsReady,
      totalShares,
      shareModalOpeningStarted,
      shareModalOpeningFinished,
      shareModalClosingRequested,
      shareModalClosingStarted,
      shareModalClosingFinished,
    } = this.props;

    return (
      <Transition
        in={isOpen}
        timeout={350}
        mountOnEnter
        unmountOnExit
        onEnter={node => node.scrollTop}
        onEntering={shareModalOpeningStarted}
        onEntered={shareModalOpeningFinished}
        onExiting={shareModalClosingStarted}
        onExited={shareModalClosingFinished}
      >
        {status =>
          <Container>
            <Overlay status={status} onClick={shareModalClosingRequested} />
            <Modal status={status}>
              <Header>
                <Shares isVisible={countsReady}>
                  <SharesValue>{totalShares}</SharesValue> Compartidos
                </Shares>
                <CloseButton />
              </Header>
              {!!entity &&
                <Body>
                  <Preview>
                    <Media id={entity.featured_media} width="50%" />
                    <Title dangerouslySetInnerHTML={{ __html: entity.title.rendered }} />
                  </Preview>
                  <List>
                    {this.shares.map(({ El, type, countText, buttonText, buttonTextOnClick }) =>
                      <ListItem key={type}>
                        <El
                          title={entity.title.rendered}
                          url={entity.link}
                          type={type}
                          countText={countText}
                          buttonText={buttonText}
                          buttonTextOnClick={buttonTextOnClick}
                        />
                      </ListItem>
                    )}
                  </List>
                </Body>}
            </Modal>
          </Container>}
      </Transition>
    );
  }
}

Share.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  entity: PropTypes.shape({}),
  countsReady: PropTypes.bool,
  totalShares: PropTypes.number,
  shareModalOpeningStarted: PropTypes.func.isRequired,
  shareModalOpeningFinished: PropTypes.func.isRequired,
  shareModalClosingRequested: PropTypes.func.isRequired,
  shareModalClosingStarted: PropTypes.func.isRequired,
  shareModalClosingFinished: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isOpen: selectors.shareModal.isOpen(state),
  entity: selectors.shareModal.getEntity(state),
  countsReady: selectors.shareModal.areCurrentCountsReady(state),
  totalShares: selectors.shareModal.getCurrentTotalCounts(state),
});

const mapDispatchToProps = dispatch => ({
  shareModalOpeningStarted: payload => dispatch(actions.shareModal.openingStarted(payload)),
  shareModalOpeningFinished: payload => dispatch(actions.shareModal.openingFinished(payload)),
  shareModalClosingRequested: () => dispatch(actions.shareModal.closingRequested()),
  shareModalClosingStarted: payload => dispatch(actions.shareModal.closingStarted(payload)),
  shareModalClosingFinished: payload => dispatch(actions.shareModal.closingFinished(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Share);

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
  filter: opacity(${({ status }) => (status.startsWith('enter') ? 50 : 0)}%);
  transition: filter 300ms ease-out;
  background-color: #000;
`;

const Modal = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;
  background-color: #fff;
  transform: translateY(${({ status }) => (status.startsWith('enter') ? 0 : 100)}%);
  transition: transform 300ms ease-out;
`;

const Header = styled.div`
  background-color: white;
  height: ${({ theme }) => theme.titleSize};
  position: relative;
  box-sizing: border-box;
  top: 0;
  width: 100%;
  border-bottom: 1px solid #ddd;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Shares = styled.div`
  font-size: 1.115em;
  line-height: 70px;
  filter: opacity(${({ isVisible }) => (isVisible ? 100 : 0)}%);
  transition: filter 0.3s ease 0.3s;
  padding-left: 15px;
`;

const SharesValue = styled.span`
  font-weight: bold;
  font-size: 1em;
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

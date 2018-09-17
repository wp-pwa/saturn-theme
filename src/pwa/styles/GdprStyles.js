import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  .qc-cmp-ui-container {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
      'Droid Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    align-items: flex-end;
    background-color: rgba(33, 41, 52, 0.5);
    overflow: auto;
    width: 100vw;

    .qc-cmp-ui {
      margin: 0;
      max-height: 100vh;
      max-width: 100vw;

      .qc-cmp-button {
        background-color: ${({ theme }) => theme.colors.link};
        border-color: ${({ theme }) => theme.colors.link};
      }

      .qc-cmp-button:focus {
        color: #fff;
      }

      .qc-cmp-secondary-button {
        background-color: transparent;
        color: ${({ theme }) => theme.colors.link};
      }

      .qc-cmp-secondary-button:focus {
        color: ${({ theme }) => theme.colors.link};
      }

      .qc-cmp-alt-action {
        color: ${({ theme }) => theme.colors.link};
      }

      .qc-cmp-toggle-status {
        color: ${({ theme }) => theme.colors.link};
      }

      .qc-cmp-toggle-on {
        background-color: ${({ theme }) => theme.colors.link};
        border-color: ${({ theme }) => theme.colors.link};
      }

      .qc-cmp-nav-bar {
        position: absolute;
        left: 0;
        background-color: #fff;
        z-index: 100;

        .qc-cmp-nav-bar-publisher-logo-container {
          display: none !important;
        }

        .qc-cmp-alt-action {
          line-height: 56px;
          padding-left: 0;
          display: flex;
          align-items: center;
          margin: 0;
          flex-grow: 0;
        }

        .qc-cmp-alt-action::before {
          display: flex;
          position: static;
          margin-right: 5px;
        }

        .qc-cmp-cancel {
          display: flex;
          justify-content: flex-end;
          margin-left: 0;
        }

        .qc-cmp-button {
          margin: 20px 0;
          flex-grow: 0 !important;
        }

        .qc-cmp-nav-bar-div-child {
          width: 100%;
          display: flex;
          justify-content: space-around;

          * {
            flex-grow: 0;
          }
        }
      }

      .qc-cmp-nav-bar.qc-cmp-bottom {
        display: flex;
        justify-content: space-around;
      }

      .qc-cmp-top {
        top: 0;
      }

      .qc-cmp-bottom {
        bottom: 0;
      }

      .qc-cmp-ui-content {
        padding: 30px 30px 0 30px;
      }

      .qc-cmp-purposes-page-content {
        padding: 100px 20px 170px 20px;
        max-height: 100%;
        height: 100%;
        -webkit-overflow-scrolling: touch;
      }

      .qc-cmp-alt-buttons {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 56px;
        padding: 0;
      }

      .qc-cmp-qc-link-container {
        display: none !important;
      }

      .qc-cmp-vendor-list-container {
        overflow: auto;
      }

      .qc-cmp-all-vendors-list {
        height: auto;
      }

      .qc-cmp-partner-info {
        padding: 100px 20px 170px 20px;
        margin: 0;
        overflow: auto;
        -webkit-overflow-scrolling: touch;
      }
    }
  }
`;

import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import * as selectors from '../../selectors';
import * as deps from '../../deps';
import styles from './style.css';

const Notification = ({ children, color, icon, refresh, loading }) => (
  <div className={`notification ${color}`}>
    <div className="level">
      <div className="level-left">
        {children}
      </div>
      <div className="level-right is-marginless">
        <button className={`button ${color} ${loading && 'is-loading'}`} onClick={refresh}>
          {icon &&
            <span className={`icon ${styles.fetchInfoButtons}`}>
              <i className="fa fa-refresh" />
            </span>
          }
        </button>
      </div>
    </div>
  </div>
);

Notification.propTypes = {
  children: React.PropTypes.node.isRequired,
  color: React.PropTypes.string,
  refresh: React.PropTypes.func,
  loading: React.PropTypes.bool,
  icon: React.PropTypes.bool,
};

const FetchInfo = ({ status, refresh }) => {
  if (status === 'fetching')
    return (
      <Notification color="is-warning" refresh={refresh} loading>
        Please wait, we are synchronizing your pages, tags and categories.
      </Notification>
    );
  else if (status === 'succeed')
    return (
      <Notification color="is-light" refresh={refresh} icon>
        Pages, tags and categories synchronized successfully.
      </Notification>
    );
  else if (status === 'error')
    return (
      <Notification color="is-danger" refresh={refresh} icon>
        <span>
          Something went wrong while synchronizing your pages, tags and categories.
          Please contact with {' '}
          <a
            href="https://www.worona.org/get-help"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'white', fontWeight: 'bold' }}
          >
            Worona support.
          </a>
        </span>
      </Notification>
    );
  return null;
};
FetchInfo.propTypes = {
  status: React.PropTypes.string.isRequired,
  refresh: React.PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  status: selectors.getStatus(state),
  siteId: deps.selectors.getSelectedSiteId(state),
});

const mergeProps = ({ siteId, status }, { dispatch }) => ({
  status,
  refresh() {
    dispatch(actions.categoriesListRequested({ siteId }));
    dispatch(actions.pagesListRequested({ siteId }));
    dispatch(actions.tagsListRequested({ siteId }));
  },
});

export default connect(mapStateToProps, dispatch => ({ dispatch }), mergeProps)(FetchInfo);

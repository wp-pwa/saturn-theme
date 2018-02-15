/* eslint-disable react/jsx-no-target-blank, react/no-danger */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { inject } from 'mobx-react';
import { dep } from 'worona-deps';
import sha256 from 'fast-sha256';
import GoogleAnalytics from './GoogleAnalytics';

const hashFunc = obj => sha256(JSON.stringify(obj)).slice(0, 13);

const Analytics = ({
  trackingId,
  title,
  documentLocation,
  generalTitle,
  generalLocation,
  debug,
  anonymize,
  extraUrlParams,
}) => (
  <Fragment>
    <GoogleAnalytics
      trackingId={debug ? 'UA-91312941-5' : 'UA-91312941-6'}
      title={anonymize ? title : title}
      documentLocation={anonymize ? documentLocation : documentLocation}
      extraUrlParams={extraUrlParams}
    />
    {trackingId && (
      <GoogleAnalytics trackingId={trackingId} title={title} documentLocation={documentLocation} />
    )}
  </Fragment>
);

Analytics.propTypes = {
  trackingId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  documentLocation: PropTypes.string.isRequired,
  generalTitle: PropTypes.string.isRequired,
  generalLocation: PropTypes.string.isRequired,
  debug: PropTypes.bool.isRequired,
  anonymize: PropTypes.bool.isRequired,
  extraUrlParams: PropTypes.shape({}).isRequired,
};

const mapStateToProps = (state, { selected, title, documentLocation: url }) => {
  const getSetting = (namespace, setting) =>
    dep('settings', 'selectorCreators', 'getSetting')(namespace, setting);
  const gtm = getSetting('theme', 'gtm');
  const site = getSetting('generalSite', 'url');
  const trackingId = getSetting('theme', 'trackingId')(state);
  const debug = !(state.build.dev === false && state.build.env === 'prod');
  // Getting values for custom dimensions
  const anonymize = (gtm && gtm.analytics && gtm.analytics.anonymize) || false;
  const siteId = getSetting('generalSite', '_id');
  const userIds = getSetting('generalSite', 'userIds');
  const theme = getSetting('theme', 'woronaInfo').name;
  const extensions = dep('build', 'selectors', 'getPackages').toString();
  const pageType = 'amp';
  const plan = 'enterprise';

  const { route, type, id, page } = selected;
  const hash = hashFunc({ site, title, url, route, type, id, page });
  const generalTitle = anonymize
    ? `anonymous - ${route} - ${type} - ${hash}`
    : `${site} - ${route} - ${type} - ${id}${page ? ` - page ${page}` : ''}`;
  const generalLocation = anonymize ? `anonymous/${hash}` : url;
  return {
    trackingId,
    anonymize,
    debug,
    hash,
    generalTitle,
    generalLocation,
    title,
    extraUrlParams: {
      cd1: anonymize ? 'anonymous' : userIds,
      cd2: anonymize ? 'anonymous' : siteId,
      cd3: anonymize ? 'anonymous' : theme,
      cd4: anonymize ? 'anonymous' : extensions,
      // cd5: experiment,
      cd6: pageType,
      cd7: anonymize ? 'anonymous' : plan,
    },
  };
};

export default connect(mapStateToProps)(
  inject(({ connection }) => {
    const title =
      (connection.selected.single && connection.selected.single.meta.title) ||
      connection.siteInfo.home.title;
    const [documentLocation] = connection.siteInfo.headContent
      .filter(({ tagName, attributes }) => tagName === 'link' && attributes.rel === 'canonical')
      .map(({ attributes }) => attributes.href);
    const { selected } = connection.context;
    return { selected, title, documentLocation };
  })(Analytics),
);

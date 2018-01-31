import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { inject } from 'mobx-react';
import { dep } from 'worona-deps';
import { defer } from 'lodash';
import adler32 from 'adler-32';
import LinkedItemList from './LinkedItemList';

const getGalleryName = mediaIds =>
  `Gallery [${adler32.buf(
    mediaIds
      .slice()
      .sort((a, b) => a - b)
      .toString(),
  )}]`;

class GalleryWithLinks extends Component {
  constructor(props) {
    super(props);
    this.state = { listRequested: false };
  }
  componentWillMount() {
    const { mediaIds, requestMedia, galleryExists } = this.props;
    if (galleryExists) {
      this.setState(this.setState({ listRequested: true }));
    } else {
      requestMedia(mediaIds).then(() => this.setState({ listRequested: true }));
    }
  }
  render() {
    const { mediaIds, ssr } = this.props;
    const { listRequested } = this.state;
    const name = getGalleryName(mediaIds);
    return !ssr && listRequested ? <LinkedItemList name={name} mediaIds={mediaIds} /> : null;
  }
}

GalleryWithLinks.propTypes = {
  ssr: PropTypes.bool.isRequired,
  mediaIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  requestMedia: PropTypes.func.isRequired,
  galleryExists: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  ssr: dep('build', 'selectors', 'getSsr')(state),
});

const mapDispatchToProps = dispatch => ({
  requestMedia: mediaIds =>
    new Promise(resolve =>
      defer(() => {
        dispatch(
          dep('connection', 'actions', 'customRequested')({
            name: getGalleryName(mediaIds),
            singleType: 'media',
            params: {
              include: mediaIds,
              per_page: mediaIds.length,
              _embed: true,
            },
          }),
        );
        resolve();
      }),
    ),
});

export default connect(mapStateToProps, mapDispatchToProps)(
  inject((stores, { mediaIds }) => {
    const name = getGalleryName(mediaIds);
    return {
      galleryExists: !!stores.connection.custom[name] && stores.connection.custom[name].ready,
    };
  })(GalleryWithLinks),
);

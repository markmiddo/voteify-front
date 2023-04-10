import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getProfileContentAction, envProfileContentSelector, envProfileLoadingSelector } from 'domain/env';
import FileSaver from 'file-saver';
import I from 'immutable';

import {
  Container,
} from 'components/grid';
import {
  Button, Title, Loader,
} from 'components/ui';
import Facebook from 'components/icons/social/facebook.svg';
import Instagram from 'components/icons/social/instagram-linear.svg';

import cx from 'classnames';
import styles from './styles.scss';

class PatronContentComponent extends PureComponent {

  shareEvent = (resource) => {
    const event = resource.get('event');
    const sharingImage = resource.getIn(['sharing_image', 'url'], event.getIn(['sharing_image', 'url']));

    FB.ui({
      method: 'share',
      href: `${process.env.FRONTEND_URL}/event/${event.get('id')}?image=${sharingImage}`,
    }, (response) => {
      if (response && response.error_message) {
        console.warn('Vote sharing - failed');
      }
    });
  };

  tryDownload = (event) => {
    const imageURL = event.getIn(['square_sharing_image', 'url']);
    const imageExt = imageURL.split('.').pop();
    const imageName = event.getIn(['event', 'name']).replace(' ', '_');

    FileSaver.saveAs(imageURL, `${imageName}.${imageExt}`);
  };

  render() {
    const { events, loading } = this.props;

    if (loading && events.size === 0) return (<div className={styles.loading}><Loader /></div>);

    return (
      <Container>
        <Title size="lg" className="pl40 text-center">My Votes</Title>
        <div className={cx(styles.content, 'pt40', 'pb40')}>
          { !loading && events.size === 0
          && (
            <div className={styles.emptyEvent}>
              <Title size="lg" className={styles.placeholder}>
                You haven&apos;t voted in any events yet, click the icon in the top right and select
                &apos;All Events&apos; from the drop down to vote
              </Title>
            </div>
          )}

          { events.map(event => (
            <div key={event.get('id')} className={styles.eventBlock}>
              <header className={styles.blockHeader}>
                <h2 className={styles.blockTitle}>{event.getIn(['event', 'share_title'])}</h2>
                <h3 className={styles.eventTitle}>{event.getIn(['event', 'name'])}</h3>
                <h3 className={styles.eventSubtitle}>I voted for:</h3>
              </header>
              <section className={styles.blockImageWrapper}>
                <img
                  src={event.getIn(['square_sharing_image', 'url'])}
                  alt="eventImage"
                  className={styles.blockImage}
                />
              </section>
              <div className={styles.blockDescription}>
                {event.getIn(['event', 'share_description'])}
              </div>
              <footer className={styles.blockFooter}>
                <Button
                  onClick={() => this.shareEvent(event)}
                  type="secondary"
                >
                  Share on
                  <Facebook className="ml10" style={{ backgroundColor: '#ffffff' }} />
                </Button>
                <div className="ml25 d-none d-sm-inline-flex" />
                <Button
                  onClick={() => this.tryDownload(event)}
                  type="primary"
                >
                  Save & Share
                  <Instagram className="ml10" style={{ fill: '#ffffff' }} />
                </Button>
              </footer>
            </div>
          ))}
        </div>
      </Container>
    );
  }
}

const mapDispatchToProps = {
  getProfileContent: getProfileContentAction,
};

PatronContentComponent.propTypes = {
  events: PropTypes.instanceOf(I.List),
  loading: PropTypes.bool,
};

export const PatronContent = connect(
  createStructuredSelector({
    events: envProfileContentSelector,
    loading: envProfileLoadingSelector,
  }), mapDispatchToProps,
)(PatronContentComponent);

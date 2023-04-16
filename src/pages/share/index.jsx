import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { voteSelector, voteLoadingSelector } from 'domain/vote/selectors';
import { getVoteAction, shareVoteAction } from 'domain/vote/actions';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { normalizeURL } from 'libs/ui';
import FileSaver from 'file-saver';
import I from 'immutable';

import {
  Container,
} from 'components/grid';
import { Loader } from 'components/ui/Loader';
import { Button } from 'components/ui/Button';
import Facebook from 'components/icons/social/facebook.svg';
import Instagram from 'components/icons/social/instagram-linear.svg';
import Ticket from 'components/icons/ticket.svg';
import DocTitle from 'components/ui/DocTitle';

import cx from 'classnames';
import styles from './styles.scss';

class SharePage extends Component {
  static async getInitialProps({ ctx }) {
    const { id } = ctx.query;
    if (id) {
      ctx.store.dispatch(getVoteAction(id));
    }
  }

  state = {
    isBusy: false,
    shouldBuyTicketsButtonShown: false,
  };

  componentDidMount() {
    const { vote } = this.props;

    if (vote.get('status') === 'shared') {
      // Purchase button is temporary disabled
      // FIXME: uncomment when ticket purchase button is enabled again
      // this.showTicketPurchaseButton();
    }
  }

  shareEvent = () => {
    const { vote } = this.props;

    FB.ui({
      method: 'share',
      href: `${process.env.FRONTEND_URL}/event/${vote.getIn(['event', 'id'])}?image=${vote.getIn(['sharing_image', 'url'])}`,
    }, (response) => {
      if (response && !response.error_message) {
        this.updateVoteStatus();
      } else {
        console.warn('Vote sharing - failed');
      }
    });
  };

  showTicketPurchaseButton = () => {
    this.setState({ shouldBuyTicketsButtonShown: true });
  };

  updateVoteStatus = () => {
    const { shareVote, vote } = this.props;
    this.setState({ isBusy: true });

    new Promise((resolve, reject) => {
      shareVote({ data: { id: vote.get('id'), resource: { status: 'shared' } }, resolve, reject });
    }).then(() => {
      // Purchase button is temporary disabled
      // FIXME: uncomment when ticket purchase button is enabled again
      // this.showTicketPurchaseButton();
    }).catch(() => {
      console.warn('Update vote status - failed');
    }).finally(() => this.setState({ isBusy: false }));
  };

  redirectToTicketURL = () => {
    const { vote } = this.props;
    const url = normalizeURL(vote.getIn(['event', 'ticket_url']));

    window.open(url, '_blank', 'noopener');
  };

  tryDownload = () => {
    const { vote } = this.props;
    const imageURL = vote.getIn(['square_sharing_image', 'url']);
    const imageExt = imageURL.split('.').pop();
    const imageName = vote.getIn(['event', 'name']).replace(' ', '_');

    FileSaver.saveAs(imageURL, `${imageName}.${imageExt}`);
  };

  render() {
    const { vote, voteIsBusy } = this.props;
    const { isBusy, shouldBuyTicketsButtonShown } = this.state;
    const isShared = vote.get('status') === 'shared';

    if (voteIsBusy) {
      return (<Loader />);
    }

    return (
      <Container>
        <DocTitle>
          {vote.get('name', 'Event')}
        </DocTitle>
        <div>
          <h1 className="text-center">{vote.getIn(['event', 'share_title'])}</h1>
          <div className="text-center pt15 pb15">
            {vote.getIn(['event', 'share_description'])}
          </div>
          <div className={styles.imageFrame}>
            <img
              src={vote.getIn(['square_sharing_image', 'url'])}
              alt="vote tracks"
              className={styles.image}
            />
          </div>
          <div className="text-center mt25 mb25">
            {shouldBuyTicketsButtonShown ? (
              <a
                href={normalizeURL(vote.getIn(['event', 'ticket_url']))}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  type="accent"
                  className={cx(styles.shareButton, vote.getIn(['event', 'color']))}
                >
                  Get the ticket
                  <Ticket className="ml10" style={{ fill: '#ffffff' }} />
                </Button>
              </a>
            ) : (
              // <Button
              //   onClick={() => this.shareEvent()}
              //   disabled={isBusy || isShared}
              //   type="secondary"
              //   className={cx(styles.shareButton)}
              // >
              //   Share on
              //   <Facebook className="ml10" style={{ backgroundColor: '#ffffff' }} />
              // </Button>
              <></>
            )}
            <div className="ml25 d-none d-sm-inline-flex" />
            <Button
              onClick={this.tryDownload}
              type="primary"
            >
              Save & Share On Social
              {/* <Instagram className="ml10" style={{ fill: '#ffffff' }} /> */}
            </Button>
          </div>
        </div>
      </Container>
    );
  }
}

SharePage.propTypes = {
  vote: PropTypes.instanceOf(I.Map).isRequired,
  voteIsBusy: PropTypes.bool.isRequired,
  shareVote: PropTypes.func.isRequired,
};

export default connect(createStructuredSelector({
  vote: voteSelector,
  voteIsBusy: voteLoadingSelector,
}), { shareVote: shareVoteAction })(SharePage);

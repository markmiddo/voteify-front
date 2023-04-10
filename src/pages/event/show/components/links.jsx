/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';
import { Flex } from 'components/grid';
import { Button } from 'components/ui';
import I from 'immutable';

import { Link } from 'routes';

import cx from 'classnames';
import styles from '../styles.scss';

export const Links = ({ event, ...rest }) => {
  // If user already voted for current event, should be redirected to the vote share page
  // and to the vote page in other case
  const shouldRedirectToVoteSharePage = !!event.getIn(['vote', 'id'], 0);

  const VoteButton = props => (
    <Button className={cx(styles.button, event.get('color'))} {...props}>
      Vote now
    </Button>
  );

  return (
    <Flex {...rest}>
      {shouldRedirectToVoteSharePage ? (
        <Link
          route="share"
          params={{ id: event.getIn(['vote', 'id'], 0) }}
          prefetch
        >
          <VoteButton />
        </Link>
      ) : (
        <Link
          route="vote"
          params={{ id: event.get('id', ' ') }}
          prefetch
        >
          <VoteButton disabled={event.get('isDisabledVoting')} />
        </Link>
      )}
    </Flex>
  );
};

Links.propTypes = {
  event: PropTypes.instanceOf(I.Map),
};

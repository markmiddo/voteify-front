import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

import GA from './ga';

const FbPixelHead = ({ ID }) => (
  ID && (
    <Head>
      <GA ID={ID} />
    </Head>
  )
);

FbPixelHead.propTypes = {
  ID: PropTypes.string,
};

export default FbPixelHead;

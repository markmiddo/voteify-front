import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

import PIXEL from './pixel';

const FbPixelHead = ({ ID }) => (
  ID && (
    <Head>
      <PIXEL ID={ID} />
    </Head>
  )
);

FbPixelHead.propTypes = {
  ID: PropTypes.string,
};

export default FbPixelHead;

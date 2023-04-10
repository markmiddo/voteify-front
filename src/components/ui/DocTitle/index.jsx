import React from 'react';
import Head from 'next/head';

const DocTitle = ({ children }) => (
  <Head>
    <title>
      {children}
    </title>
  </Head>
);


export default DocTitle;

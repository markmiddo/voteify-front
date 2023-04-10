import React from 'react';
import PropTypes from 'prop-types';

const GA_SCRIPT = ({ ID }) => (
  <React.Fragment>
    <script async src={`https://www.googletagmanager.com/gtag/js?id=${ID}`} />

    <script dangerouslySetInnerHTML={{
      __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${ID}');
      `,
    }}
    />
  </React.Fragment>
);

GA_SCRIPT.propTypes = {
  ID: PropTypes.string,
};

export default GA_SCRIPT;

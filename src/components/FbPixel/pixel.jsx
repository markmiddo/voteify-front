import React from 'react';
import PropTypes from 'prop-types';

const PIXEL_SCRIPT = ({ ID }) => (
  <React.Fragment>
    <script dangerouslySetInnerHTML={{
      __html: `!function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '${ID}');
      fbq('track', 'PageView');`,
    }}
    />
    <noscript dangerouslySetInnerHTML={{
      __html: `<img height="1" width="1" style="display:none"
      src="https://www.facebook.com/tr?id=${ID}&ev=PageView&noscript=1" />`,
    }}
    />
  </React.Fragment>
);

PIXEL_SCRIPT.propTypes = {
  ID: PropTypes.string,
};

export default PIXEL_SCRIPT;

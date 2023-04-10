import React from 'react';
import { Col, Container, Row } from 'components/grid';
import { Button, Text } from 'components/ui';
import { Input } from 'components/form/index';
import { compose } from 'redux';
import { Field, reduxForm } from 'redux-form/immutable';

import Logo from 'static/logo-v5.svg';
import SrcVotersIMG from './icon1.png';
import SrcFB from 'static/social-fb.png';
import SrcInstagram from 'static/social-instagram.png';
import SrcYoutube from 'static/social-youtube.png';
import SrcSoundCloud from 'static/social-soundcloud.png';

import cx from 'classnames';
import styles from './styles.scss';

const currentYear = new Date().getFullYear();

const Footer = () => (
  <div className={cx(styles.root, 'layout-footer')}>
    <Container className={cx(styles.rowcontainer, '')}>
      <Row className={cx(styles.row, 'first_row')}>
        <Col all={12} md={4} className="pt15">
          <div className="mb15">
            <a href="/">
              <Logo style={{ width: '260px', height: '55px', fill: '#b74a8c' }} />
            </a>
          </div>
          <p className={styles.firstColumn}>
	Through interactive countdown events, Voteify takes you on a musical journey back to the time where the weekend was all that mattered.
          </p>
        </Col>

        <Col all={12} md={5} className="pt15">
          <div className="d-flex flex-column align-items-center ">
          	<h4 className={styles.third_heading}>SUBSCRIBE FOR UPDATES</h4>
		<form action="https://reminisce.us4.list-manage.com/subscribe/post?u=9da39eb013c914a785a65a221&amp;id=0f706d6bf5" method="post" id="mc-embedded-subscribe-form">
			<div>
			<Field name="FNAME" component={Input} className={styles.footer_input} placeholder="First Name"  />
		</div>
		<div>
			<Field name="EMAIL" component={Input} className={styles.footer_input} placeholder="Email"   />
		</div>
		<div className={styles.footer_div_hidden}  aria-hidden="true">
			<Field name="b_9da39eb013c914a785a65a221_1a26e00502" component={Input} tabindex="-1" className={styles.footer_input} value="" type="text"  />
		</div> 
		<div>
			 <Button htmlType="submit" className={styles.cta_btn}>subscribe</Button>
		</div>
		<p><small>(<span className="fa fa-lock"></span> Infomation never shared with 3rd parties)</small></p>

		</form>
	  </div>
        </Col>

        <Col all={12} md={3} className="pt15">
	  <h4 className={styles.third_heading}>STAY CONNECTED</h4>
          <div className="d-flex align-items-center">
            <a className={styles.socialLink} href="https://www.facebook.com/reminisce.event/" target="_blank" rel="noopener noreferrer">
              <img className={styles.socialIcon} src={SrcFB} alt="facebook" />
            </a>
            <a className={styles.socialLink} href="https://soundcloud.com/reminisceevent" target="_blank" rel="noopener noreferrer">
              <img className={styles.socialIcon} src={SrcSoundCloud} alt="soundcloud" />
            </a>
            <a className={styles.socialLink} href="https://www.instagram.com/reminisce.events/" target="_blank" rel="noopener noreferrer">
              <img className={styles.socialIcon} src={SrcInstagram} alt="instagram" />
            </a>
            <a className={styles.socialLink} href="https://www.youtube.com/channel/UCr8YLo7PmFqZlzCjEliuFdA" target="_blank" rel="noopener noreferrer">
              <img className={styles.socialIcon} src={SrcYoutube} alt="youtube" />
            </a>
          </div>

        </Col>
      </Row>
    </Container>
	<Row className={cx(styles.row, 'align-items-center m-0 pb-4')}>
		<Col all={12} md={12} className="pt15">
			<div className={styles.saperator}>
			 
			</div>
		</Col>
	</Row>
<Container>
	<Row className={cx(styles.row, 'align-items-center m-0 pb-4')}>
		<Col all={12} md={12} className="pt15">
			<p className={styles.bottom_p}>
				<a href="https://reminisce.dj/">Reminisce Entertainment Pty Ltd</a> | 
				<a href="https://reminisce.dj/contact/"> Contact Us</a> <p className="m-0">Copyright Reminisce 2021. Registered Trademark No. 1992577. All rights reserved.</p>
				<a href="https://reminisce.dj/privacy-policy"> Privacy Policy</a> | 
				<a href="https://reminisce.dj/disclaimer/"> Disclaimer</a> | 
				<a href="https://reminisce.dj/website-terms-conditions/"> Voting &amp; Website Terms and Conditions</a> | 
				<a href="https://reminisce.dj/event-terms-carnivale/"> Event Terms and Conditions</a>
			</p>
			<div className="mt-4">
				<p className={styles.bottom_p}>
                	                <p className="m-0">This site is not a part of the Facebook™ website or Facebook™ Inc.</p>
        	                        <p className="m-0">Additionally, this site is NOT endorsed by Facebook™ in any way. FACEBOOK™ is a trademark of FACEBOOK™ Inc.</p>
	                        </p>
			</div>
		</Col>
	</Row>
</Container>
</div>
);
export default compose(
  reduxForm({
    form: 'footer',
 }),
)(Footer);

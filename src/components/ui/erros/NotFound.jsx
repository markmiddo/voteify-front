import React from 'react';

import cx from 'classnames';
import { Button } from 'components/ui/Button';
import { Container, Row, Col } from 'components/grid';
import Link from 'next/link';

import styles from './styles.scss';

const NotFound = () => (
  <>
    <Container fluid className={styles.wrapper}>
      <Row style={{ height: '100%', textAlign: 'center' }}>
        <Col sm={5}>
          <div className={styles.image} />
        </Col>
        <Col sm={7} className={styles.pageRight}>
          <main>
            <h1>404</h1>
            <h2>Whoops!</h2>
            <p>We can’t seem to find that page, please try again.</p>
            <Link href="/">
              <Button type="primary">Go Back</Button>
            </Link>
          </main>
        </Col>
      </Row>
    </Container>

  </>
);

export default NotFound;

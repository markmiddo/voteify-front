import React from 'react';
import { Col, Row, Container } from 'components/grid';


import styles from './styles.scss';

class Page extends React.Component {
  static Header = ({ children }) => <h1>{children}</h1>;

  static Content = ({ children }) => <>{children}</>;

  render() {
    const { children: [header, content] } = this.props;
    return (
      <div className={styles.root}>
        <Container>
          <Row className={styles.header}>
            <Col auto>
              {header}
            </Col>
          </Row>
          {content}
        </Container>
      </div>
    );
  }
}

export default Page;

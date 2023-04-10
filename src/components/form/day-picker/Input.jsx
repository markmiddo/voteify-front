import React, { Component } from 'react';
import styles from './styles.scss';
import Icon from './calendar.svg';

export default class Input extends Component {
  render() {
    const { setRef, ...rest } = this.props;
    return (
      <div className={styles.wrapper}>
        <input ref={setRef} className={styles.input} {...rest} />
        <Icon className={styles.icon} />
      </div>
    );
  }
}

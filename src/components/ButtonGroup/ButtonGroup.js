import React, { Component } from 'react';
import classNames from 'classnames';
import styles from './ButtonGroup.css';

class ButtonGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 'cheapest',
    };
  }

  render() {
    const { type } = this.state;
    return (
      <div className={styles.buttonGroup}>
        <span className={classNames({ [styles.active]: (type === 'cheapest') }, styles.button)}>Cheapest</span>
        <span className={classNames({ [styles.active]: (type === 'fastest') }, styles.button)}>Fastest</span>
      </div>
    );
  }
}

export default ButtonGroup;

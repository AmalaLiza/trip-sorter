import React, { Component } from 'react';
import classNames from 'classnames';
import styles from './ButtonGroup.css';

class ButtonGroup extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { onClick, type } = this.props;
    return (
      <div className={styles.buttonGroup}>
        <span className={classNames({ [styles.active]: (type === 'cheapest') }, styles.button)} onClick={() => onClick('cheapest')}>Cheapest</span>
        <span className={classNames({ [styles.active]: (type === 'fastest') }, styles.button)} onClick={() => onClick('fastest')}>Fastest</span>
      </div>
    );
  }
}

export default ButtonGroup;

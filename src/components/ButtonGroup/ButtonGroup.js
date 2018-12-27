import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import styles from './ButtonGroup.css';

const ButtonGroup = ({ onClick, type }) => (
  <div className={styles.buttonGroup}>
    <span
      className={classNames({ [styles.active]: (type === 'cheapest') }, styles.button)}
      onClick={() => onClick('cheapest')}
    >
      Cheapest
    </span>
    <span
      className={classNames({ [styles.active]: (type === 'fastest') }, styles.button)}
      onClick={() => onClick('fastest')}
    >
        Fastest
    </span>
  </div>
);

export default ButtonGroup;

ButtonGroup.propTypes = {
  type: PropTypes.string,
  onClick: PropTypes.func,
};

ButtonGroup.defaultProps = {
  type: '',
  onClick: f => f,
};

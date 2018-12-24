import React from 'react';
import PropTypes from 'prop-types';
import styles from './ErrorPopup.css';

export default class ErrorPopup extends React.Component {
  static propTypes = {
    hideError: PropTypes.func,
    error: PropTypes.string,
  };

  static defaultProps = {
    hideError: f => f,
    error: '',
  };

  componentDidMount() {
    window.setTimeout(this.props.hideError, 3000);
  }

  render() {
    const { error } = this.props;

    return (
      <div className={styles.wrapper}>
        <span className={styles.error}>{error}</span>
      </div>
    );
  }
}

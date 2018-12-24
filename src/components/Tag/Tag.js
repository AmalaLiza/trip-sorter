import React from 'react';
import * as PropTypes from 'prop-types';
import styles from './Tag.css';

const Tag = ({ value }) => <span className={styles.tag}>{value}</span>;

Tag.propTypes = {
  value: PropTypes.string,
};

Tag.defaultProps = {
  value: '',
};

export default Tag;

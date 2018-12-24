import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import styles from './Gist.css';
import { getDate } from '../../utils';

const GistDetails = ({ gist, className }) => (
  <div className={className}>
    <div>
      <span className={styles.label}>Description : </span>
      <span
        className={styles.value}
      >
        {gist.get('description') && gist.get('description').length ? gist.get('description') : 'No description provided.'}
      </span>
    </div>
    <div>
      <span className={styles.label}>Created At :</span>
      <span className={styles.value}>
        {' '}
        {getDate(gist.get('created_at'))}
      </span>
    </div>
    <div>
      <span className={styles.label}>Gist URL :</span>
      <span
        className={`${styles.value} url`}
        onClick={() => window.open(gist.get('html_url'))}
      >
        {' '}
        {gist.get('html_url')}
      </span>
    </div>
  </div>
);

export default GistDetails;

GistDetails.propTypes = {
  className: PropTypes.string,
  gist: PropTypes.instanceOf(Immutable.Map),
};

GistDetails.defaultProps = {
  className: '',
  gist: Immutable.fromJS({}),
};

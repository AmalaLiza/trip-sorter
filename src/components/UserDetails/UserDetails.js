import Immutable from 'immutable';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import styles from './UserDetails.css';
import Avatar from '../Avatar/Avatar';

const UserDetails = ({ user, clearGists }) => (
  <div className={styles.userDetails}>
    <i className={classNames('fa fa-arrow-left', styles.backBtn)} onClick={clearGists} />
    <Avatar
      className={styles.avatar}
      src={user.get('avatar_url')}
    />

    <div className={styles.detailsWrapper}>
      <div className={styles.properties}>
        <span>Name : </span>
        <span className={styles.value}>{user.get('login')}</span>
      </div>
      <div>
        <span>User URL : </span>
        <span
          className={`${styles.value} url`}
          onClick={() => window.open(user.get('url'))}
        >
          {user.get('url')}
        </span>
      </div>
    </div>
  </div>
);

UserDetails.propTypes = {
  user: PropTypes.instanceOf(Immutable.Map),
  clearGists: PropTypes.func,
};

UserDetails.defaultProps = {
  user: Immutable.fromJS({}),
  clearGists: f => f,
};

export default UserDetails;

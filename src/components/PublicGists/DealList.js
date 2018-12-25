import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import Gist from '../Gist/Gist';
import UserDetails from '../UserDetails/UserDetails';
import { clearGists } from '../../actions/action-creator';
import { selector } from './deals.selector';
import styles from './DealList.css';

const GistCount = ({ count }) => (
  <div className={`${styles.gistCount} bold`}>
    <h3 className={styles.gistCountHeading}>
      GISTS (
      {count}
      )
    </h3>
  </div>
);

GistCount.propTypes = {
  count: PropTypes.number,
};

GistCount.defaultProps = {
  count: 0,
};

const GistWrapper = ({ className, children }) => (
  <div className={className}>
    {children}
  </div>
);

GistWrapper.propTypes = {
  className: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

const PublicGistsWrapper = ({ children, className }) => (
  <div className={className}>
    {children}
  </div>
);

PublicGistsWrapper.propTypes = {
  className: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

const DealList = ({ deals, user, dispatch }) => (
  <PublicGistsWrapper className={styles.wrapper}>
    {deals.size ? <UserDetails user={user} clearGists={() => dispatch(clearGists())} /> : null}
    {deals.size ? <GistCount count={deals.size} /> : null}

    <GistWrapper className={styles.gistWrapper}>
      {deals
        .valueSeq()
        .map(gist => (
          <Gist
            key={gist.get('id')}
            gist={gist}
          />
        ))}

    </GistWrapper>

  </PublicGistsWrapper>
);

DealList.propTypes = {
  gists: PropTypes.instanceOf(Immutable.Map).isRequired,
  dispatch: PropTypes.func.isRequired,
  user: PropTypes.instanceOf(Immutable.Map).isRequired,
};

const mapStateToProps = state => selector(state);
export default connect(mapStateToProps)(DealList);

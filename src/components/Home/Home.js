import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import connect from 'react-redux/es/connect/connect';
import styles from '../PublicGists/PublicGists.css';
import TextField from '../TextField/TextField';
import { loadPublicGistsOfUser } from '../../actions/action-creator';
import { selectGists } from '../PublicGists/gists.selector';
import banner from '../../assets/banner.png';
import Footer from '../Footer/Footer';

const Home = ({ dispatch }) => (
  <Fragment>
    <div className={styles.bannerWrapper}>
      <img className={styles.bannerImg} src={banner} />
    </div>
    <div className={styles.searchWrapper}>
      <span className={styles.searchHint}>
            Search gists by typing username and hit enter
      </span>
      <TextField
        onclick={value => dispatch(loadPublicGistsOfUser(value))}
        type="text"
        className={styles.searchBox}
        onEnter={value => dispatch(loadPublicGistsOfUser(value))}
      />
    </div>
    <Footer />
  </Fragment>
);

Home.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => selectGists(state);
export default connect(mapStateToProps)(Home);

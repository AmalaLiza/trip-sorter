import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import connect from 'react-redux/es/connect/connect';
import AutoInput from '../AutoInput/AutoInput';
import ButtonGroup from '../ButtonGroup/ButtonGroup';
import styles from '../PublicGists/PublicGists.css';
import TextField from '../TextField/TextField';
import { loadPublicGistsOfUser } from '../../actions/action-creator';
import { selectGists } from '../PublicGists/gists.selector';
import banner from '../../assets/banner.png';
import Footer from '../Footer/Footer';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      from: '',
      to: '',
    };
    this.getFromValue = this.getFromValue.bind(this);
    this.getToValue = this.getToValue.bind(this);
    this.onSearchClick = this.onSearchClick.bind(this);
  }

  getFromValue(from) {
    console.log(from);
    this.setState({
      from,
    });
  }

  getToValue(to) {
    console.log(to);
    this.setState({
      to,
    });
  }

  onSearchClick() {
    this.props.data;
    console.log(this.state.from, this.state.to);
  }

  render() {
    const { dispatch, departure, arrival } = this.props;
    return (
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
        <section className={styles.search}>
          <AutoInput
            suggestions={departure}
            placeHolder="From"
            classes={{ wrapper: styles.departure }}
            onSelect={this.getFromValue}
          />
          <AutoInput
            suggestions={arrival}
            placeHolder="To"
            classes={{ wrapper: styles.arrival }}
            onSelect={this.getToValue}
          />
          <ButtonGroup />
          <i className={classNames('fa fa-search', styles.icon)} onClick={this.onSearchClick} />
        </section>
        <Footer />
      </Fragment>
    );
  }
}

Home.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => selectGists(state);
export default connect(mapStateToProps)(Home);

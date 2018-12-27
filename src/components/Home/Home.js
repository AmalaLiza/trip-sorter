import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import connect from 'react-redux/es/connect/connect';
import AutoInput from '../AutoInput/AutoInput';
import styles from './Home.css';
import { selector } from '../DealList/deals.selector';
import Footer from '../Footer/Footer';
import { setFilters, showError } from '../../actions/action-creator';

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
    this.setState({
      from,
    });
  }

  getToValue(to) {
    this.setState({
      to,
    });
  }

  onSearchClick() {
    const { to, from } = this.state;
    if (to && from) {
      this.props.dispatch(setFilters(to, from));
    } else {
      let error = '';
      if (!from) error = 'Please enter your boarding point.';
      else if (!to) error = 'Please enter your destination point.';
      this.props.dispatch(showError(error));
    }
  }

  render() {
    const { departure, arrival } = this.props;
    return (
      <Fragment>
        <div className={styles.bannerWrapper}>
          <div className={styles.heading}>
            Trip Sorter
          </div>
          <div className={styles.banner} />
          <div className={styles.text}>
                What's your next dream destination?
          </div>
        </div>
        <section className={styles.search}>
          <AutoInput
            suggestions={departure}
            placeHolder="From where?"
            classes={{ wrapper: styles.input }}
            onSelect={this.getFromValue}
          />
          <AutoInput
            suggestions={arrival}
            placeHolder="To where?"
            classes={{ wrapper: styles.input }}
            onSelect={this.getToValue}
          />
          <i className={classNames('fa fa-search', styles.icon)} onClick={this.onSearchClick} />
        </section>
        <Footer />
      </Fragment>
    );
  }
}

Home.propTypes = {
  departure: PropTypes.instanceOf(Array),
  arrival: PropTypes.instanceOf(Array),
  dispatch: PropTypes.func,
};

Home.defaultProps = {
  departure: [],
  arrival: [],
  dispatch: f => f,
};

const mapStateToProps = state => selector(state);
export default connect(mapStateToProps)(Home);

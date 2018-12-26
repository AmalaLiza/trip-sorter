import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import connect from 'react-redux/es/connect/connect';
import AutoInput from '../AutoInput/AutoInput';
import styles from '../DealList/DealList.css';
import { selector } from '../DealList/deals.selector';
import Footer from '../Footer/Footer';
import {setFilters} from "../../actions/action-creator";

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
    console.log(this.state.from, this.state.to);
    this.props.dispatch(setFilters(this.state.to, this.state.from))
  }

  render() {
    const { dispatch, departure, arrival } = this.props;
    return (
      <Fragment>
        <div className={styles.bannerWrapper}>
          <div className={styles.bannerImg} >
            Trip Sorter
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
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => selector(state);
export default connect(mapStateToProps)(Home);

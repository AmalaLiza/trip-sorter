import PropTypes from 'prop-types';
import Immutable from 'immutable';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import ErrorPopup from '../../components/ErrorPopup/ErrorPopup';
import PublicGists from '../../components/PublicGists/DealList';
import { getError } from '../../components/PublicGists/deals.selector';
import {hideError, loadDeals} from '../../actions/action-creator';
import '../../global.css';
import Home from '../../components/Home/Home';

// const departure = [...new Set(response.deals.map(item => item.departure))];
// const arrival = [...new Set(response.deals.map(item => item.departure))];

class App extends Component {
  static propTypes = {
    error: PropTypes.string,
    gists: PropTypes.instanceOf(Immutable.Map),
    dispatch: PropTypes.func,
  };

  static defaultProps = {
    error: '',
    gists: Immutable.fromJS({}),
    dispatch: f => f,
  };

  constructor(props) {
    super(props);
    this.hideError = this.hideError.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(loadDeals());
  }

    /**
   * Function to hide error component
   * It dispatches action to store to hide error.
   * */

  hideError() {
    this.props.dispatch(hideError());
  }

  render() {
    const { filteredDeals, error } = this.props;
    return (
      <Fragment>
        {filteredDeals.size ? <PublicGists /> : <Home />}
        {error ? (
          <ErrorPopup
            error={error}
            hideError={this.hideError}
          />
        ) : null}
      </Fragment>
    );
  }
}

const mapStateToProps = state => getError(state);
export default connect(mapStateToProps)(App);

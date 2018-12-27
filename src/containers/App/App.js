import PropTypes from 'prop-types';
import Immutable from 'immutable';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import ErrorPopup from '../../components/ErrorPopup/ErrorPopup';
import DealList from '../../components/DealList/DealList';
import Home from '../../components/Home/Home';
import { appSelector } from '../../components/DealList/deals.selector';
import { hideError, loadDeals } from '../../actions/action-creator';
import '../../global.css';

class App extends Component {
    static propTypes = {
      error: PropTypes.string,
      filteredDeals: PropTypes.instanceOf(Immutable.Map),
      dispatch: PropTypes.func,
      noResults: PropTypes.bool,
    };

    static defaultProps = {
      error: '',
      filteredDeals: Immutable.fromJS({}),
      dispatch: f => f,
      noResults: false,
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
      const { filteredDeals, error, noResults } = this.props;
      return (
        <Fragment>
          {filteredDeals.size ? <DealList /> : <Home />}
          {error || noResults ? (
            <ErrorPopup
              error={error || 'Oops! No results found for the search. Please try again.'}
              hideError={this.hideError}
            />
          ) : null}
        </Fragment>
      );
    }
}

const mapStateToProps = state => appSelector(state);
export default connect(mapStateToProps)(App);

import PropTypes from 'prop-types';
import Immutable from 'immutable';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import ErrorPopup from '../../components/ErrorPopup/ErrorPopup';
import PublicGists from '../../components/PublicGists/PublicGists';
import { getError } from '../../components/PublicGists/gists.selector';
import { hideError } from '../../actions/action-creator';
import '../../global.css';
import Home from '../../components/Home/Home';

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

  /**
   * Function to hide error component
   * It dispatches action to store to hide error.
   * */

  hideError() {
    this.props.dispatch(hideError());
  }

  render() {
    const { gists, error } = this.props;
    return (
      <Fragment>
        {gists.size ? <PublicGists /> : <Home />}
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

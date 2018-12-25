import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { selector } from '../PublicGists/deals.selector';
import styles from './Gist.css';

/**
 * Function to get tag from file type
 * @param type
 * @return string
 * if file type is plain/text, tag will be TEXT
 * if file type is application/javascript, tag will be JAVASCRIPT
 * if file type is application/python, tag will be PYTHON
 * */

export const getTag = (type) => {
  const tag = type.split('/')[1];
  if (tag === 'plain') return 'text';
  return tag;
};

class Gist extends Component {
  static propTypes = {
    gist: PropTypes.instanceOf(Immutable.Map),
    dispatch: PropTypes.func,

  };

  static defaultProps = {
    gist: Immutable.fromJS({}),
    dispatch: f => f,

  };

  render() {
    const { deals } = this.props;

    return (
      <div className={styles.gist}>
          {deals}
      </div>
    );
  }
}

const mapStateToProps = state => selector(state);
export default connect(mapStateToProps)(Gist);

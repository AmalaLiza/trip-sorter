import React, { Component } from 'react';
import * as ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import styles from './Gist.css';
import { getTag } from './Gist';
import Tag from '../Tag/Tag';

class List extends Component {
  static propTypes = {
    gist: PropTypes.instanceOf(Immutable.Map),
  };

  static defaultProps = {
    gist: Immutable.fromJS({}),
  };

  constructor(props) {
    super(props);
    this.state = {
      showList: '',
    };
    this.hideAllLists = this.hideAllLists.bind(this);
    this.showList = this.showList.bind(this);
  }

  /**
   * Function to handle Off click.
   * */
  hideAllLists(e) {
    const domNode = ReactDOM.findDOMNode(this);
    if (!domNode || !domNode.contains(e.target)) {
      this.setState({ showList: '' });
    }
  }

  /**
   * Function to show and hide list items.
   * */
  showList(e) {
    if (this.state.showList !== this.props.gist.get('id')) {
      this.setState({ showList: this.props.gist.get('id') });
    } else {
      this.setState({ showList: '' });
    }
    e.stopPropagation();
  }

  componentDidMount() {
    // Binds click action to component.
    document.addEventListener('click', this.hideAllLists, false);
  }

  componentWillUnmount() {
    // Unbinds click action from. component
    document.removeEventListener('click', this.hideAllLists, false);
  }

  render() {
    const { gist } = this.props;

    return (
      <div className={styles.extraTags}>
        <span
          className={styles.extra}
          onClick={this.showList}
        >
        +
          {gist.get('files').size - 3}
        </span>

        {gist.get('id') === this.state.showList ? (
          <div className={styles.list}>

            {gist.get('files')
              .valueSeq()
              .filter((a, index) => index >= 3)
              .map((file, index) => (
                <Tag
                  key={index}
                  value={file.get('language') && file.get('language').length
                    ? file.get('language') : getTag(file.get('type'))}
                />
              ))
            }

          </div>
        ) : null}
      </div>
    );
  }
}

export default List;

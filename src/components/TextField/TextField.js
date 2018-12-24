import * as React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import * as styles from './TextField.css';

export default class TextField extends React.Component {
  static propTypes = {
    type: PropTypes.string,
    id: PropTypes.string,
    className: PropTypes.string,
    onChange: PropTypes.func,
    onclick: PropTypes.func,
    onEnter: PropTypes.func,
    onEsc: PropTypes.func,
    placeholder: PropTypes.string,
  };

  static defaultProps = {
    type: '',
    id: '',
    className: '',
    onChange: f => f,
    onclick: f => f,
    onEnter: f => f,
    onEsc: f => f,
    placeholder: 'Enter username',
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      value: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  /**
   * Function to handle on change event of input box.
   * */
  handleChange(event) {
    if (this.props.onChange) {
      let value = event.target.value;
      this.setState({ value });

      if (this.props.type === 'number') value = value ? +value : null;

      this.props.onChange(value);
    }
  }

  /**
   * Function to handle on key down event of input box.
   * Handles on enter functionality.
   * @param event
   * */
  handleKeyDown(event) {
    if (event.keyCode === 13 && this.props.onEnter) {
      this.props.onEnter(event.target.value, event);
    } else if (event.keyCode === 27 && this.props.onEsc) {
      this.props.onEsc(event.target.value, event);
    }
  }

  render() {
    const {
      id,
      type,
      className,
      placeholder,
      onclick,
    } = this.props;

    const { value } = this.state;

    return (
      <div className={styles.inputWrapper}>
        <input
          type={type}
          id={id}
          className={className}
          onKeyDown={this.handleKeyDown}
          onChange={this.handleChange}
          placeholder={placeholder}
          autoFocus
        />
        <i className={classNames('fa fa-search', styles.icon)} onClick={() => onclick(value)} />
      </div>
    );
  }
}

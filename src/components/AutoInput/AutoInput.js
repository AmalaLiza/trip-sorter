import PropTypes from 'prop-types';
import classNames from 'classnames';
import React from 'react';
import AutoSuggest from 'react-autosuggest';
import * as styles from './AutoInput.css';

const escapeRegexCharacters = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const getSuggestions = (list, value) => {
  const escapedValue = escapeRegexCharacters(value.trim());

  if (escapedValue === '') return [];

  const regex = new RegExp(`^${escapedValue}`, 'i');
  const suggestions = list.filter(item => regex.test(item));

  if (suggestions.length === 0) {
    return [
      { isAddNew: true },
    ];
  }

  return suggestions;
};

class AutoInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      focused: false,
      value: '',
      suggestions: this.props.suggestions,
    };
  }

    static propTypes = {
      suggestions: PropTypes.instanceOf(Array),
      classes: PropTypes.instanceOf(Object),
      placeHolder: PropTypes.string,
      onSelect: PropTypes.func,
    };

    static defaultProps = {
      suggestions: [],
      classes: {},
      placeHolder: '',
      onSelect: f => f,
    };

    onChange = (event, { newValue }) => {
      this.setState({
        value: newValue,
      });
    };

    onBlur = () => {
      this.setState({
        focused: false,
      });
    };

    onClick = () => {
      this.setState({
        focused: true,
      });
    };

    getSuggestionValue = (suggestion) => {
      if (suggestion.isAddNew) {
        return this.state.value;
      }

      return suggestion;
    };

    renderSuggestion = (suggestion) => {
      if (suggestion.isAddNew) {
        return (
          <span>
            <strong>No place found</strong>
          </span>
        );
      }

      return suggestion;
    };

    onSuggestionsFetchRequested = ({ value }) => {
      this.setState({
        suggestions: getSuggestions(this.props.suggestions, value),
      });
    };

    onSuggestionsClearRequested = () => {
      this.setState({
        suggestions: [],
      });
    };

    onSuggestionSelected = (event, { suggestion }) => {
      this.props.onSelect(suggestion);
    };

    render() {
      const { value, suggestions, focused } = this.state;
      const isFocused = focused || value ? 'focused' : 'notFocused';
      const { classes, placeHolder } = this.props;
      const inputProps = {
        value,
        onChange: this.onChange,
        onBlur: this.onBlur,
      };

      return (
        <div
          placeholder={placeHolder}
          className={
                    classNames(classes.wrapper,
                      styles.wrapper,
                      styles[isFocused])}
          onClick={this.onClick}
        >
          <AutoSuggest
            theme={styles}
            suggestions={suggestions}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            getSuggestionValue={this.getSuggestionValue}
            renderSuggestion={this.renderSuggestion}
            onSuggestionSelected={this.onSuggestionSelected}
            inputProps={inputProps}
          />
        </div>
      );
    }
}

export default AutoInput;

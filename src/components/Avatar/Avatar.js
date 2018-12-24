import React from 'react';
import PropTypes from 'prop-types';

// Stateless component
const Avatar = ({ className, onClick, src }) => (
  <img
    className={className}
    onClick={onClick}
    src={src}
  />
);

export default Avatar;

Avatar.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  src: PropTypes.string,
};

Avatar.defaultProps = {
  className: '',
  onClick: f => f,
  src: '',
};

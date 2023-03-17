import React from 'react';
import PropTypes from 'prop-types';

const errorStyle = {
  backgroundColor: 'red',
};

const infoStyle = {
  backgroundColor: 'lightGreen',
};

const textStyle = {
  padding: 8,
};

function Notification({ notification }) {
  const { message, isError } = notification;
  if (!message) return null;
  return (
    <div style={isError ? errorStyle : infoStyle}>
      <p style={textStyle}>{message}</p>
    </div>
  );
}

Notification.propTypes = {
  notification: PropTypes.shape({
    message: PropTypes.string,
    isError: PropTypes.bool,
  }),

};

Notification.defaultProps = {
  notification: {
    message: null,
    isError: null,
  },
};

export default Notification;

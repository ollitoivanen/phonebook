import React from 'react';
import PropTypes from 'prop-types';

function Contact({ contact, handleDelete }) {
  const { name, number } = contact;
  return (
    <tr>
      <td>{name}</td>
      <td>{number}</td>
      <td>
        <button onClick={handleDelete}>Delete</button>
      </td>
    </tr>
  );
}

Contact.propTypes = {
  contact: PropTypes.shape({
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }).isRequired,

  handleDelete: PropTypes.func.isRequired,

};
export default Contact;

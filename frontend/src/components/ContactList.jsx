import React from 'react';
import PropTypes from 'prop-types';

import Contact from './Contact';

function ContactList({ contactsToShow, handleDelete }) {
  return (
    <>
      <h2>Contacts</h2>
      <table>
        <tbody>
          {contactsToShow.map((contact) => (
            <Contact
              key={contact.id}
              contact={contact}
              handleDelete={() => handleDelete(contact)}
            />
          ))}
        </tbody>
      </table>
    </>
  );
}

ContactList.propTypes = {
  contactsToShow: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }).isRequired,

  ).isRequired,

  handleDelete: PropTypes.func.isRequired,
};
export default ContactList;

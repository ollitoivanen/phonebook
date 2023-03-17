import React from 'react';
import PropTypes from 'prop-types';

function NewContactForm({
  newName,
  newNumber,
  handleNameChange,
  handleNumberChange,
  handleSubmit,

}) {
  return (
    <>
      <h2>Add new</h2>
      <form onSubmit={handleSubmit}>
        <p>Name</p>
        <input value={newName} onChange={handleNameChange} />
        <p>Phone number</p>
        <input value={newNumber} onChange={handleNumberChange} />
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );
}

NewContactForm.propTypes = {
  newName: PropTypes.string.isRequired,
  newNumber: PropTypes.string.isRequired,
  handleNameChange: PropTypes.func.isRequired,
  handleNumberChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,

};

export default NewContactForm;

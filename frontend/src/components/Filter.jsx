import React from 'react';
import PropTypes from 'prop-types';

function Filter({ filter, handleFilterChange }) {
  return (
    <>
      <p>Filter by name</p>
      <input value={filter} onChange={handleFilterChange} />
    </>
  );
}

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  handleFilterChange: PropTypes.func.isRequired,
};

export default Filter;

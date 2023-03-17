import axios from 'axios';

const baseUrl = '/api/persons';

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((res) => res.data);
};

const addContact = (contactData) => {
  const request = axios.post(baseUrl, contactData);
  return request.then((res) => res.data);
};

const deleteContact = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then((res) => res.data);
};

const updateContact = (updatedContact) => {
  const request = axios.put(`${baseUrl}/${updatedContact.id}`, updatedContact);
  return request.then((res) => res.data);
};

const contactService = {
  getAll, addContact, deleteContact, updateContact,
};

export default contactService;

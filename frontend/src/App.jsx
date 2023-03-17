import React, { useState, useEffect } from 'react';

import ContactList from './components/ContactList';
import Filter from './components/Filter';
import NewContactForm from './components/NewContactForm';
import Notification from './components/Notification';
import Title from './components/Title';
import contactService from './services/contact';

function App() {
  const [contacts, setContacts] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const [filter, setFilter] = useState('');
  const [notification, setNotification] = useState({
    message: null,
    isError: null,
  });

  const showNotification = (message, isError) => {
    setNotification({
      message,
      isError,
    });
    setTimeout(() => {
      setNotification({ message: null, isError: null });
    }, 3000);
  };

  const handleInitialLoad = () => {
    contactService.getAll().then((initialContacts) => {
      setContacts(initialContacts);
    }).catch((e) => {
      showNotification(e.response.data, true);
    });
  };

  useEffect(() => {
    handleInitialLoad();
  }, []);

  const contactInfoGiven = () => (newName.length && newNumber.length) !== 0;

  const contactExists = () => contacts.find((contact) => contact.name === newName);

  const confirmUpdate = () => window.confirm(
    `${newName} is already added to the phonebook. Do you want to replace the old number with a new one?`,
  );

  const handleContactUpdate = (existingContact) => {
    if (!confirmUpdate()) return;

    const contactObject = { ...existingContact, number: newNumber };
    contactService
      .updateContact(contactObject)
      .then((updatedContact) => {
        setContacts(
          contacts.map((contact) => (contact.id !== updatedContact.id ? contact : updatedContact)),
        );
        showNotification(
          `Contact ${existingContact.name} was updated succesfully.`,
          false,
        );
        setNewName('');
        setNewNumber('');
      })
      .catch((e) => {
        const message = e.response.data;
        showNotification(
          message,
          true,
        );

        if (e.response.status === 404) {
          setContacts(contacts.filter((contact) => contact.id !== existingContact.id));
        }
      });
  };

  const handleNewContact = () => {
    const contactObject = {
      name: newName,
      number: newNumber,
    };

    contactService
      .addContact(contactObject)
      .then((newContact) => {
        setContacts(contacts.concat(newContact));
        showNotification(
          `Contact ${newContact.name} was added succesfully.`,
          false,
        );
        setNewName('');
        setNewNumber('');
      })
      .catch((e) => {
        showNotification(e.response.data, true);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!contactInfoGiven()) {
      showNotification('Add name and phone number', true);
      return;
    }

    const existingContact = contactExists();
    if (existingContact) {
      handleContactUpdate(existingContact);
      return;
    }

    handleNewContact();
  };

  const handleDelete = (contactToDelete) => {
    const { name, id } = contactToDelete;
    if (!window.confirm(`Do you really want to delete ${name}?`)) return;
    contactService.deleteContact(id).then(() => {
      setContacts(contacts.filter((contact) => contact.id !== id));
      showNotification(
        `Contact ${contactToDelete.name} was deleted succesfully.`,
        false,
      );
    }).catch((e) => {
      showNotification(e.response.data, true);
    });
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const contactsToShow = filter.length === 0
    ? contacts
    : contacts.filter((contact) => contact.name.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div>
      <Title />
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <Notification notification={notification} />
      <NewContactForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        handleSubmit={handleSubmit}
      />
      <ContactList contactsToShow={contactsToShow} handleDelete={handleDelete} />
    </div>
  );
}

export default App;

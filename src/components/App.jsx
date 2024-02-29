import React, { useState, useEffect } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { nanoid } from 'nanoid';
import { setLocalStorage, getLocalStorage } from '../helpers/localStorage';

import styles from './styles.module.css';

const LS_KEY = 'contacts';
export const App = () => {
  const [contacts, setContacts] = useState(getLocalStorage(LS_KEY) || []);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    setLocalStorage(LS_KEY, contacts);
  }, [contacts]);

  const handleFilterChange = event => {
    const { value } = event.target;
    setFilter(value);
  };

  const checkNameDuplicate = name => {
    return contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
  };

  const addContact = ({ name, number }) => {
    if (checkNameDuplicate(name)) {
      alert(`${name} is already in contacts`);
      return;
    }
    setContacts(prevState => {
      return [
        {
          id: nanoid(),
          name,
          number,
        },
        ...prevState,
      ];
    });
  };

  const deleteContact = id => {
    setContacts(prevState => {
      return prevState.filter(contact => contact.id !== id);
    });
  };

  const filteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  return (
    <div className={styles['main-container']}>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContact} />
      <h2>Contacts</h2>
      <Filter filter={filter} onChange={handleFilterChange} />
      <ContactList
        contacts={filteredContacts()}
        deleteContact={deleteContact}
      />
    </div>
  );
};

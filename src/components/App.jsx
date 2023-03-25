import { useState, useEffect } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { GlobalStyle } from './GlobalStyle/GlobalStyle';
import { Layout } from './Layout/Layout';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { getFilteredArray } from 'utils/getFilteredArray';

export const App = () => {
  const [contacts, setContacts] = useState(
    () => JSON.parse(window.localStorage.getItem('contacts')) ?? []
  );
  const [filter, setFilter] = useState('');

  const addContact = newContact => {
    if (
      contacts.find(
        contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
      )
    ) {
      return Report.warning(
        'Warning',
        'The contact to that name already exists!',
        'Okay'
      );
    }

    setContacts([newContact, ...contacts]);
  };

  const deleteContact = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };

  const editContact = updatedContact => {
    setContacts(() =>
      contacts.map(contact => {
        if (contact.id === updatedContact.id) {
          const newContact = { ...contact, ...updatedContact };
          return newContact;
        }
        return contact;
      })
    );
  };

  const chengeFilter = event => {
    setFilter(event.currentTarget.value);
  };

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const filteredContacts = getFilteredArray(contacts, 'name', filter);

  return (
    <Layout>
      <h1>Phonebook</h1>
      <ContactForm onSave={addContact} />
      <h2>Contacts</h2>
      <Filter onChange={chengeFilter} value={filter} />
      <ContactList
        contacts={filteredContacts}
        onDelete={deleteContact}
        editContact={editContact}
      />
      <GlobalStyle />
    </Layout>
  );
};

import React from 'react';
import { ContactsList } from './ContactList.styled';
import { ContactListItem } from './ContactListItem';
import { useSelector } from 'react-redux';
import { selectFilteredContacts } from 'redux/selectors';

export const ContactList = () => {
  const contacts = useSelector(selectFilteredContacts);

  return (
    <ContactsList>
      {contacts.map(contact => {
        return <ContactListItem key={contact.id} contact={contact} />;
      })}
    </ContactsList>
  );
};

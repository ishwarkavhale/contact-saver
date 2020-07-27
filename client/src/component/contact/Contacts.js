import React, { Fragment, useContext } from 'react';
import ContactItem from '../contact/ContactItem';
import ContactContext from '../../context/contacts/ContactContext';

export const Contacts = () => {
  const { contacts, filtered } = useContext(ContactContext);
  return (
    <Fragment>
      {filtered !== null
        ? filtered.map((contact) => (
            <ContactItem key={contact.id} contact={contact} />
          ))
        : contacts.map((contact) => (
            <ContactItem key={contact.id} contact={contact} />
          ))}
    </Fragment>
  );
};

export default Contacts;

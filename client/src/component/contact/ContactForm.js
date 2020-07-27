import React, { useState, useContext, useEffect } from 'react';
import ContactContext from '../../context/contacts/ContactContext';

const ContactForm = () => {
  const contactContext = useContext(ContactContext);
  const { addContact, current, updateContact, clearCurrent } = contactContext;
  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'personal',
  });

  const { name, email, phone, type } = contact;

  const onChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (current) {
      setContact(current);
    } else {
      setContact({
        name: '',
        email: '',
        phone: '',
        type: 'personal',
      });
    }
  }, [contactContext, current]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (current !== null) {
      updateContact(contact);
      clearCurrent();
    } else {
      addContact(contact);
    }
    setContact({
      name: '',
      email: '',
      phone: '',
      type: 'personal',
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className="text-primary text-center">
        {current ? 'Edit Contact' : 'Add New Contact'}
      </h2>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={name}
        onChange={onChange}
        required
      ></input>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={email}
        onChange={onChange}
        required
      ></input>{' '}
      <input
        type="text"
        name="phone"
        placeholder="Phone"
        value={phone}
        onChange={onChange}
      ></input>
      <h5>Contact Type</h5>
      <input
        type="radio"
        name="type"
        value="personal"
        checked={type === 'personal'}
        onChange={onChange}
      />{' '}
      Persnol{' '}
      <input
        type="radio"
        name="type"
        value="professional"
        checked={type === 'professional'}
        onChange={onChange}
      />{' '}
      Professional
      <div>
        <input
          type="submit"
          className="btn btn-primary btn-block"
          value={current ? 'Update Contact' : 'Add Contact'}
          onClick={onSubmit}
        />
        {current && (
          <div
            className="text-center btn btn-light btn-block"
            onClick={clearCurrent}
          >
            Clear
          </div>
        )}
      </div>
    </form>
  );
};

export default ContactForm;

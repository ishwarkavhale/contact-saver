import React from 'react';
import Contacts from '../contact/Contacts';
import ContactForm from '../contact/ContactForm';
import FilterContact from '../contact/ContactFilter';

const Home = () => {
  return (
    <div className="grid-2">
      <div>
        <ContactForm />
      </div>
      <div>
        <FilterContact />
        <Contacts />
      </div>
    </div>
  );
};

export default Home;

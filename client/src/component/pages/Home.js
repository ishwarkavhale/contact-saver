import React, { useEffect, useContext } from 'react';
import Contacts from '../contact/Contacts';
import ContactForm from '../contact/ContactForm';
import FilterContact from '../contact/ContactFilter';
import AuthContext from '../../context/auth/authContext';

const Home = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);

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

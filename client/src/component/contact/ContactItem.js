import React, { useContext } from 'react';
import ContactContext from '../../context/contacts/ContactContext';
import PropTypes from 'prop-types';

const ContactItem = ({ contact }) => {
  const contactContext = useContext(ContactContext);
  const { deleteContact, setCurrent, clearCurrent } = contactContext;
  const { id, name, type, email, phone } = contact;

  const onDelete = (contact) => {
    deleteContact(id);
    clearCurrent();
  };

  return (
    <div className="card bg-light">
      <h3 className="text-primary text-left">
        {name}{' '}
        <span
          style={{ float: 'right' }}
          className={
            'badge ' +
            (type === 'professional' ? 'badge-success' : 'badge-primary')
          }
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
      </h3>
      <ul style={{ marginTop: '5px' }}>
        {email && (
          <li style={{ marginTop: '5px' }}>
            <i className="fa fa-envelope-open" /> {email}
          </li>
        )}
        {phone && (
          <li style={{ marginTop: '5px' }}>
            <i className="fa fa-phone" /> {phone}
          </li>
        )}
      </ul>
      <p>
        <button
          className="btn btn-dark btn-md"
          onClick={() => setCurrent(contact)}
        >
          Edit
        </button>
        <button className="btn btn-danger btn-md" onClick={onDelete}>
          Delete
        </button>
      </p>
    </div>
  );
};

ContactItem.propsTypes = {
  contact: PropTypes.object.isRequired,
};
export default ContactItem;

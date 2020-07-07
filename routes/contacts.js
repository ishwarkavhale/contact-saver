const express = require('express');
const router = express.Router();

// @route   GET api/contacts
// @desc    Get all users contact
// @access  private

router.get('/', (req, res) => {
  res.send('Get all Contacts');
});

// @route   POST api/contacts
// @desc    Add New Contact
// @access  Public

router.post('/', (req, res) => {
  res.send('Add new Contact');
});

// @route   PUt api/contacts/id
// @desc    Update Conatct
// @access  private

router.put('/:id', (req, res) => {
  res.send('Update  Contact');
});

// @route   DELETE api/contacts/id
// @desc    Delete Contact
// @access  Private

router.delete('/:id', (req, res) => {
  res.send('Delete Contact');
});

module.exports = router;

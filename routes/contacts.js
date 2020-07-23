const express = require('express');
const Contact = require('../models/Contact');
const auth = require('../Middleware/auth');
const { check, validationResult } = require('express-validator');
const { findById } = require('../models/Contact');
const router = express.Router();

// @route   GET api/contacts
// @desc    Get all users contact
// @access  private

router.get('/', auth, async (req, res) => {
  try {
    const coontacts = await Contact.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(coontacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/contacts
// @desc    Add New Contact
// @access  Public

router.post(
  '/',
  auth,
  [check('name', 'Name is require.').not().isEmpty()],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      res.status(400).json({ errors: error.array() });
    }
    const { name, type, email, phone } = req.body;
    try {
      const newContact = new Contact({
        name,
        email,
        phone,
        type,
        user: req.user.id,
      });
      const contact = await newContact.save();
      res.json({ contact });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   PUt api/contacts/id
// @desc    Update Conatct
// @access  private

router.put('/:id', auth, async (req, res) => {
  const { name, email, type, phone } = req.body;
  const contactFields = {};
  if (name) contactFields.name = name;
  if (email) contactFields.email = email;
  if (type) contactFields.type = type;
  if (phone) contactFields.phone = phone;

  try {
    let contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ msg: 'Contact Not found' });
    }
    if (contact.user.toString() !== req.user.id) {
      res.status(401).json({ msg: 'Not authorized' });
    }
    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: contactFields },
      { new: true }
    );
    res.json({ contact });
  } catch (err) {
    console.error(err);
    res.send('Server Error');
  }
});

// @route   DELETE api/contacts/id
// @desc    Delete Contact
// @access  Private

router.delete('/:id', auth, async (req, res) => {
  const { name, email, phone, type } = req.body;

  try {
    let contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ msg: 'Contact Not found' });
    }
    if (contact.user.toString() !== req.user.id) {
      res.status(401).json({ msg: 'Not authorized' });
    }
    await Contact.findByIdAndRemove(req.params.id);
    res.json({ msg: 'Contact Removed' });
  } catch (err) {
    console.error(err);
    res.send('Server Error');
  }
});

module.exports = router;

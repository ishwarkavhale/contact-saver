const express = require('express');
const router = express.Router();
const { validationResult, check } = require('express-validator');
const User = require('../models/User');

// @route   POST api/user
// @desc    Register User
// @access  Public

router.post(
  '/',
  [
    check('name', 'Please Add Name.').not().isEmpty(),
    check('email', 'Please enter valid email.').isEmail(),
    check(
      'password',
      'Please Enter Password with minimum length of 6.'
    ).isLength({ min: 6 }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    res.send('passed');
  }
);

module.exports = router;

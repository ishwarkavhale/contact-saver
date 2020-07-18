const express = require('express');
const router = express.Router();
const { validationResult, check } = require('express-validator');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { findOne } = require('../models/User');

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
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    try {
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ msg: 'User already exist.' });
      }
      user = new User({
        name,
        email,
        password,
      });
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      user.save();
      res.send('user saved');
    } catch (error) {
      console.error(error.message);
      res.status(500).send('server error');
    }
  }
);

module.exports = router;

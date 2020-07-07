const express = require('express');
const router = express.Router();

// @route   POST api/user
// @desc    Register User
// @access  Public

router.post('/', (req, res) => {
  res.send('Register  user');
});

module.exports = router;

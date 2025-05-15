// routes/logout.js
const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  res
    .clearCookie('auth', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    })
    .json({ message: 'Logout successful' });
});

module.exports = router;

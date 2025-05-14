const express = require('express');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();
const prisma = new PrismaClient();

router.post('/', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.create({
      data: { email, password },
    });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: 'User already exists or invalid data' });
  }
});

module.exports = router;

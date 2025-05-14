const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const app = express();


const prisma = new PrismaClient({
  log: ['query', 'info', 'warn'], 
});

app.use(
  cors({
    origin: [
      'https://todo-frontend-delta-two.vercel.app',
      'https://todo-frontend-git-main-dejavuu009s-projects.vercel.app',
      'https://todo-frontend-80b27m86s-dejavuu009s-projects.vercel.app'
    ],
    credentials: true,
  })
);

app.use(express.json());

// ✅ Login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || user.password !== password) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  res.json({ message: 'Login successful' });
});

// ✅ Register
app.post('/api/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.create({
      data: { email, password }
    });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: 'User already exists or invalid data' });
  }
});

// ✅ Healthcheck
app.get('/api/health', (req, res) => {
  res.send('Backend API is running');
});

// ✅ Start serwera
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

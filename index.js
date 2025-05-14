const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const loginRoute = require('./routes/login');
const registerRoute = require('./routes/register');
const todoRoute = require('./routes/todo');

const app = express();

app.use(cookieParser());
app.use(express.json());

app.use(
  cors({
    origin: [
      'https://todo-frontend-delta-two.vercel.app',
      'https://todo-frontend-git-main-dejavuu009s-projects.vercel.app',
      'https://todo-frontend-80b27m86s-dejavuu009s-projects.vercel.app',
    ],
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

app.use('/api/login', loginRoute);
app.use('/api/register', registerRoute);
app.use('/api/todo', todoRoute);

app.get('/api/health', (req, res) => {
  res.send('Backend API is running');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

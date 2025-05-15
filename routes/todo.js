// routes/todo.js

const express = require('express');
const { PrismaClient } = require('@prisma/client');
const router = express.Router();
const prisma = new PrismaClient();

// GET - Pobierz wszystkie zadania użytkownika (dla testu bez autoryzacji)
router.get('/', async (req, res) => {
  try {
    const todos = await prisma.todo.findMany({
      orderBy: { createdAt: 'asc' },
    });
    res.json(todos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Błąd serwera' });
  }
});

// POST - Dodaj nowe zadanie (dla testu bez autoryzacji)
router.post('/', async (req, res) => {
  try {
    const { title, description, color, status, pinned, userId } = req.body;

    if (!title || typeof title !== 'string') {
      return res.status(400).json({ error: 'Brak tytułu' });
    }

    if (!userId) {
        return res.status(400).json({ error: 'Brak userId' });
      }
      
      const newTodo = await prisma.todo.create({
        data: {
          title,
          description: description || null,
          color: color || null,
          status: status || 'todo',
          pinned: pinned ?? false,
          user: { connect: { id: userId } },
        },
      });

    res.json(newTodo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Błąd przy dodawaniu zadania' });
  }
});

// PATCH - Aktualizuj zadanie
router.patch('/', async (req, res) => {
  try {
    const { id, title, description, status, color, pinned } = req.body;

    if (!id) {
      return res.status(400).json({ error: 'Brak ID zadania' });
    }

    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: { title, description, status, color, pinned: pinned ?? false },
    });

    res.json(updatedTodo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Błąd przy edycji zadania' });
  }
});

// DELETE - Usuń zadanie
router.delete('/', async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ error: 'Brak ID do usunięcia' });
    }

    await prisma.todo.delete({ where: { id } });
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Błąd przy usuwaniu zadania' });
  }
});

module.exports = router;
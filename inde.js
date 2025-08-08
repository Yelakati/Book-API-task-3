const express = require('express');
const app = express();
const port = 3000;

app.use(express.json()); // to parse JSON request body

// Show message on root route "/"
app.get('/', (req, res) => {
  res.send('<h1>📚 Welcome to the Book API!</h1><p>Use /books to get started.</p>');
});

// In-memory book list
let books = [
  { id: 1, title: 'The Alchemist', author: 'Paulo Coelho' },
  { id: 2, title: 'Atomic Habits', author: 'James Clear' }
];

// GET all books
app.get('/books', (req, res) => {
  res.json(books);
});

// POST new book
app.post('/books', (req, res) => {
  const { title, author } = req.body;
  const newBook = {
    id: books.length + 1,
    title,
    author
  };
  books.push(newBook);
  res.status(201).json(newBook);
});

// PUT update book by ID
app.put('/books/:id', (req, res) => {
  const { id } = req.params;
  const { title, author } = req.body;
  const index = books.findIndex(b => b.id === parseInt(id));
  
  if (index === -1) return res.status(404).json({ message: 'Book not found' });
  
  books[index] = { id: parseInt(id), title, author };
  res.json(books[index]);
});

// DELETE book by ID
app.delete('/books/:id', (req, res) => {
  const { id } = req.params;
  const index = books.findIndex(b => b.id === parseInt(id));
  
  if (index === -1) return res.status(404).json({ message: 'Book not found' });
  
  const deleted = books.splice(index, 1);
  res.json(deleted[0]);
});

// Start the server
app.listen(port, () => {
  console.log(`✅ Server is running at http://localhost:${port}`);
});

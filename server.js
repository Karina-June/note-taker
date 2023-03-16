const express = require('express');
const path = require('path');
const uuid = require('./helpers/uuid');

const fs = require('fs');
const PORT = process.env.PORT || 3001;
const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//HTML GET routes
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')));

//API routes
app.get('/api/notes', (req, res) => res.sendFile(path.join(__dirname, '/db/db.json/')));

app.post('/api/notes', (req, res) => {
  console.info(`${req.method} request received`);
  const note = JSON.parse(fs.readFileSync('./db/db.json'));

  const { title, text } = req.body;

  if (title && text) {

    const newNote = {
      title,
      text,
      id: uuid(),
    };
    note.push(newNote);

    const response = {
      status: 'success',
      body: newNote,
    };

    fs.writeFileSync('./db/db.json', JSON.stringify(note), "utf-8");

    console.log(response);
    res.status(201).json(response);
  } else {
    res.status(500).json('Error posting note');
  }
});
// Delete route
app.delete('/api/notes/:id', (req, res) => {
  const note = JSON.parse(fs.readFileSync('./db/db.json'));
  const deleteNote = note.filter(delNote => delNote.id != req.params.id);
  fs.writeFileSync('./db/db.json', JSON.stringify(deleteNote));
  res.json(deleteNote);
});


app.listen(PORT, () =>
  console.log(`listening at http://localhost:${PORT}`)
);

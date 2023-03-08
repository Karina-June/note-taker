const express = require('express');
const path = require('path');

const PORT = 3001;

const app = express();

//HTML GET routes
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')));

//API routes
app.get('/api/notes', (req, res) => res.sendFile(path.join(__dirname, '/db/db.json/')));

app.post('/api/notes', (req, res) => {


}
);




app.listen(PORT, () =>
  console.log(`listening at http://localhost:${PORT}`)
);
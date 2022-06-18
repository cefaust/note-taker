const express = require('express');
const path = require('path');
const {clog} = require('./middleware/clog.js');
const notes = require('./routes/notes.js');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(clog);
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/notes', notes);

app.use(express.static('public'));

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, './public/notes.html'))
);

app.get('/*', (req, res) =>
  res.sendFile(path.join(__dirname, './public/index.html'))
);


app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
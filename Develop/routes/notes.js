const notes = require('express').Router();
const {readAndAppend, readFromFile, readAndRemoveNote} = require('../helpers/fsUtils');
const {v4: uuidv4} = require('uuid');


const DB_FILE = './db/db.json';

notes.get('/', (req, res) => {
  readFromFile(DB_FILE).then((data) =>
    res.json(JSON.parse(data))
  );
});

notes.post('/', (req, res) => {
  console.log(req.body);

  const {title, text} = req.body;

  if (title && text) {
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };

    readAndAppend(newNote, DB_FILE);

    const response = {
      status: 'success',
      body: newNote,
    };

    res.json(response);
  } else {
    res.json('Error in posting note');
  }


});

notes.delete('/:id', (req, res) => {
  readAndRemoveNote(req.params.id, DB_FILE);
  res.send();
});


module.exports = notes;
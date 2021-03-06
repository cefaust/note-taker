const fs = require('fs');
const util = require('util');


const readFromFile = util.promisify(fs.readFile);

const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`Data written to ${destination}`)
  );

const readAndAppend = (content, file) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      console.log(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(content);
      writeToFile(file, parsedData);
    }
  });
};

const readAndRemoveNote = (noteId, file) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      console.log(err);
    } else {
      const parsedData = JSON.parse(data);
      
      for (let i = 0; i < parsedData.length; i++) {
        const note = parsedData[i];
        if (noteId === note.id) {
          parsedData.splice(i, 1);
        }
      }
      console.log(parsedData);
      writeToFile(file, parsedData);
    }
  });
};

module.exports = {readFromFile, writeToFile, readAndAppend, readAndRemoveNote};



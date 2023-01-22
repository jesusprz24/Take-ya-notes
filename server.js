//Const PORT should be required to start the server
const PORT = 3001;
//const fs is required to manage and access data
const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const notes = require('./db/db.json');

//urlencoded is used to catch incoming requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('./public'));

//api/notes should read the db file and return the saved notes
app.get('/api/notes', (req, res) => {
    res.json(notes);
});

//should send the 
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

// this function should create a new note after the previous one is submitted
function createNewNote(body, notes) {
    const note = body;
    if (Array.isArray(notes))
        notes = [];
    
    if (notesArray.length === 0)
        notesArray.push(0);

        body.id = notesArray[0];
        notesArray[0]++;

    notesArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, '../Take-ya-notes/Develop/db/db.json'),
        JSON.stringify(notesArray, null, 2)
    );

    return note;
}

// app.post should fetch the data entered and post it to all notes
app.post('/api/notes', (req, res) => {
    const note = createNewNote(req.body, note);
    res.json(note);
});

//this function should delete the notes after user clicks trash icon
function deleteNote(id, notesArray) {
    for (let i = 0; i < notesArray.length; i++) {
        let note = notesArray[i];

        if (note.id == id) {
            notesArray.splice(i, 1);
            fs.writeFileSync(
                path.join(__dirname, './db/db.json'),
                JSON.stringify(notesArray, null, 2)
            );

            break;
        }
    }
}

//should delete the notes from the local storage...I think
app.delete('/api/notes/', (req, res) => {
    deleteNote(req.params.id, note);
    res.json(true);
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});
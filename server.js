//Const PORT should be required to start the server
const PORT = 3001;
//const fs is required to manage and access data
const fs = require('fs');
const path = require('path');

const app = express();
const notes = require('./db/db.json');

//urlencoded is used to catch incoming requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('./public'));

//api/notes should read the db file and return the saved notes
app.get('./api/notes', (req, res) => {
    res.json(allNotes.slice(1));
});

//should send the 
app.get('./index', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('./notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

// this function should create a new note after the previous one is submitted
function createNewNote(body, notesArray) {
    const newNote = body;
    if (Array.isArray(notesArray))
        notesArray = [];
    
    if (notesArray.length === 0)
        notesArray.push(0);

        body.id = notesArray[0];
        notesArray[0]++;

    notesArray.push(newNote);
    fs.writeFileSync(
        path.join(__dirname, '../Take-ya-notes/Develop/db/db.json'),
        JSON.stringify(notesArray, null, 2)
    );

    return newNote;
}

// app.post should fetch the data entered and post it to all notes
app.post('/api/notes', (req, res) => {
    const newNote = createNewNote(req.body, allNotes);
    res.json(newNote);
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

app.delete('/api/notes/:id', (req, res) => {
    deleteNote(req.params.id, allNotes);
    res.json(true);
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});
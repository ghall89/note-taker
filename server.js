const notes = require('./db/db.json');

const express = require('express');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// display main page
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'public/index.html'));
});

// display notes page
app.get('/notes', (req, res) => {
	res.sendFile(path.join(__dirname, 'public/notes.html'));
});

// read notes database
app.get('/api/notes', (req, res) => {
	res.json(notes);
});

// send any other file path to main page
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'public/index.html'));
});

// write to notes database
app.post('/api/notes', (req, res) => {	
	
	newNote = req.body;
	// generate ID
	newNote.id = notes.length + 1;
	
	notes.push(newNote);
	fs.writeFileSync(
		path.join(__dirname, 'db/db.json'),
		JSON.stringify(notes, null, 2)
	);
	
	res.json(req.body);
});

// remove from notes database
app.delete('/api/notes/:id', (req, res) => {
	
	// loop through notes to find a note with an ID that matches the queried ID
	for (let i = 0; i < notes.length; i++) {
		if (notes[i].id == req.params.id) {
			notes.splice(i, 1);
		}
	}
	
	// loop through notes to reassign IDs
	for (let i = 0; i < notes.length; i++) {
		notes[i].id = i + 1;
	}
	
	fs.writeFileSync(
		path.join(__dirname, 'db/db.json'),
		JSON.stringify(notes, null, 2)
	);
	
	
});

app.listen(PORT, () => {
	console.log(`API server now on port ${PORT}!`);
});

const path = require('path');
const router = require('express').Router();

const notes = require('../db/db.json');

const writeToDB = () => {
	fs.writeFileSync(
		path.join(__dirname, '../db/db.json'),
		JSON.stringify(notes, null, 2)
	);
	
}

// read notes database
router.get('/notes', (req, res) => {
	res.json(notes);
});

// write to notes database
router.post('/notes', (req, res) => {	
	
	newNote = req.body;
	// generate ID
	newNote.id = notes.length + 1;
	
	notes.push(newNote);
	writeToDB();
	
	res.json(req.body);
});

// remove from notes database
router.delete('/notes/:id', (req, res) => {
	
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
	
	writeToDB()
});

module.exports = router;
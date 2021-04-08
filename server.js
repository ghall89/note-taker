const { notes } = require('./db/db.json')
const express = require('express');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3001;
const app = express();

const { 
	filterByQuery, 
	findById, 
	createNote, 
	validateNote 
} = require('./db/db.json');

app.get('/api/notes', (req, res) => {
	let results = notes;
	if (req.query) {
		results = filterByQuery(req.query, results)
	} else {
		res.send(404);
	}
	res.json(results);
});

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
	res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(PORT, () => {
	console.log(`API server now on port ${PORT}!`);
});

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
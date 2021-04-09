const notes = require('./db/db.json');

const express = require('express');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/notes', (req, res) => {
	res.sendFile(path.join(__dirname, 'public/notes.html'));
});

app.get('/api/notes', (req, res) => {
	res.json(notes);
});

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.post('/api/notes', (req, res) => {	
	
	notes.push(req.body);
	
	fs.writeFileSync(
		path.join(__dirname, 'db/db.json'),
		JSON.stringify(notes, null, 2)
	);
	
	res.json(req.body);
});

app.listen(PORT, () => {
	console.log(`API server now on port ${PORT}!`);
});

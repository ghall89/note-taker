const path = require('path');
const router = require('express').Router();

// display main page
router.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '../public/index.html'));
});

// display notes page
router.get('/notes', (req, res) => {
	res.sendFile(path.join(__dirname, '../public/notes.html'));
});

// send any other file path to main page
router.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '../public/index.html'));
});

module.exports = router;
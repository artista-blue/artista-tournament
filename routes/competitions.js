https://github.com/artista-blue/artista-tournamentconst path = require('path');

const express = require('express');
const router = express.Router();

const BASE_DIR = path.join(__dirname, "..");
const LIB_DIR = path.join(BASE_DIR, "lib");
const Competition = require(path.join(LIB_DIR, "models")).Competition;

router.get('/', function(req, res) {
    Player.find((err, players) => {
	if (err) {
	    res.status(500).send();
	    return;
	}
	res.status(200).json(players);
    });
});

module.exports = router;
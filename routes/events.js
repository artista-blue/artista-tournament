const path = require('path');

const express = require('express');
const router = express.Router();

const BASE_DIR = path.join(__dirname, "..");
const LIB_DIR = path.join(BASE_DIR, "lib");
const Player = require(path.join(LIB_DIR, "models")).Player;
const Classifier = require(path.join(LIB_DIR, "utils/classifier"));

router.get('/', function(req, res) {
    const eventType = req.query.event_type;
    Player.find().lean().exec((err, players) => {
	if (err) {
	    res.status(500).send();
	    return;
	}
	const classifier = new Classifier(players);
	const data = classifier.getClass(eventType);
	console.log(data)
	res.status(200).json(data);
    });
});

module.exports = router;

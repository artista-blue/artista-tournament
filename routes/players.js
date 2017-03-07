const path = require('path');

const express = require('express');
const router = express.Router();

const BASE_DIR = path.join(__dirname, "..");
const LIB_DIR = path.join(BASE_DIR, "lib");
const Player = require(path.join(LIB_DIR, "models")).Player;

router.get('/', function(req, res) {
    console.log(req.query)
    const cond = {};
    if (req.query['comp_id']) cond['comp_id'] = req.query['comp_id'];
    const event_physical_name = req.query['event_physical_name'],
	  clazz_name = req.query['clazz_name'];
    if (event_physical_name && clazz_name) {
	const key = ['events', event_physical_name].join('.');
	cond[key] = clazz_name;
    }
    console.log("cond", cond)
    Player.find(cond, (err, players) => {
	if (err) {
	    res.status(500).send();
	    return;
	}
	res.status(200).json(players);
    });
});

module.exports = router;

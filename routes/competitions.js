const path = require('path');

const express = require('express');
const router = express.Router();

const BASE_DIR = path.join(__dirname, "..");
const LIB_DIR = path.join(BASE_DIR, "lib");
const Competition = require(path.join(LIB_DIR, "models")).Competition;

router.get('/', function(req, res) {
    Competition.find((err, competitions) => {
	if (err) {
	    res.status(500).send();
	    return;
	}
	res.status(200).json(competitions);
    });
});

router.post('/', function (req, res) {
    const json = req.body;
    console.log(json)
    const cond = {
	_id: json._id
    };
    Competition.findOne(cond, function (err, competition) {
	if (err) console.log(err);
	if (!competition) {
	    competition = new Competition(json);
	}
	competition.save((err) => {
	    if (err) {
		res.status(500).end();
	    } else {
		res.status(200).end();
	    }
	});
    });
});

module.exports = router;

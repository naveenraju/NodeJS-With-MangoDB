var express = require('express');
var router = express.Router();
console.log("--------------------Naveen-------------------------");
/*
 * GET userlist.
 */
router.get('/userlist', function(req, res) {
	console.log("--------------------Naveen2-------------------------");

    var db = req.db;

    console.log(db);
    
    db.collection('userlist').find().toArray(function (err, items) {
        res.json(items);
    });
});

module.exports = router;
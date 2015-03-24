var express = require('express');
var router = express.Router();
console.log("--------------------Naveen-------------------------");
/*
 * GET userlist.
 */
router.get('/userlist', function(req, res) {
	console.log("--------------------Naveen2-------------------------");

    var db = req.db;

   // console.log(db);
    
    db.collection('userlist').find().toArray(function (err, items) {
        res.json(items);
    });
});

//-----------------------------------------------------------Saving Data From Ajax Request------------------------------------------------------------------------------------------------
//Hit this url to save data in mongo db
//http://172.16.0.178:3000/users/adduser?username=naveen&&email=naven@gmail.com&&fullname=naveenraju&&age=25&&location=bang&&gender=male
// {"username":username,"email":email,"fullname":fullname,"age":age,"location":location,"gender":gender} : { msg: err }

router.get('/adduser', function(req, res) {
    var db = req.db;
var username=req.query.username;
var email=req.query.email;
var fullname=req.query.fullname;
var age=req.query.age;
var location=req.query.location;
var gender=req.query.gender;

console.log(username);
console.log(email);
console.log(fullname);
console.log(age);
console.log(location);
console.log(gender);

 db.collection('userlist').insert({"username":username,"email":email,"fullname":fullname,"age":age,"location":location,"gender":gender}, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});

//Delete record

router.get('/deleteuser', function(req, res) {
    var db = req.db;
    var userToDelete = req.params.id;
    db.collection('userlist').removeById(userToDelete, function(err, result) {
        res.send((result === 1) ? { msg: '' } : { msg:'error: ' + err });
    });
});










router.get('/ajaxadd', function(req, res) {
    var db = req.db;
var username=req.query.username;
var email=req.query.email;
console.log(username);
console.log(email);
 db.collection('usersCollection').insert({"username":username,"email":email,"user_id":""}, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});





















module.exports = router;
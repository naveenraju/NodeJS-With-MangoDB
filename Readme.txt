Step1:   npm update -g express-genrator


Step2:    express Example1

Step3:    package.json (add mongodb dependencys)


  "dependencies": {
    "mongodb": "1.4",
    "monk": "*",
    "mongoskin":"*"
  }
}

Step4: cd Example1

Step5: npm install


Step6:mkdir data


step7:view/layout.jade

doctype html
html
  head
    title= title
    link(rel='stylesheet', href='/stylesheets/style.css')
  body
    block content
    script(src='javascripts/jquary.js')
        script(src='/javascripts/global.js')


Add files in Public/javascripts and  Public/stylesheets



step8:Index.jade


extends layout

block content
    h1= title
    p Welcome to our test

    // Wrapper
    #wrapper

        // USER LIST
        h2 User List
        #userList
            table
                thead
                    th UserName
                    th Email
                    th Delete?
                tbody
        // /USER LIST

    // /WRAPPER




step9:     >mongod --dbpath C:\Users\knaveenr\Desktop\NodeJs\ExpressProjects\Example1\data



step10:    > mango


step11:   > use nodetest2


step12:   > db.userlist.insert({"username":"test1","email":"test@test.com","fullname":"test app","age":12,"location":"san francisco","gender":"male"}) 




step13:   app.js    (Create Mango Db Connection)

		
	var mongo = require('mongoskin');
var db = mongo.db("mongodb://localhost:27017/nodetest2", {native_parser:true});




Step14:    app.js   (Make our Db acessable to App)


//make our db acessable
app.use(function(req,res,next){
    req.db = db;
console.log("----------------------------Check It Here----------------------");
console.log(req.db);

    next();
});




step15: routs/users.js


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





Step16:npm start



step17: On Browser Open url

http://localhost:3000/users/userlist


o/p:RestFull call
[{"_id":"550fe5278d79947f7776dc71","username":"test1","email":"test@test.com","fullname":"test app","age":12,"location":"san francisco","gender":"male"}]













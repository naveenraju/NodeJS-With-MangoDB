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




Step18: Saving Data in Mongo using NodeJs Ajax Call


--------------------------------------------------------Saving Data AjaxRequest -----------------------------
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






--------------------------------------------Making Ajax Get Request--------------------------------------------




Step19: Copy your html files in public folder


public/Naveen/index.html


Access url in browser: http://localhost:3000/Naveen/index.html


step20: index.html  implementing ajax request

<html>
<head>
<script src="../javascripts/jquary.js "></script>
<script>
	function AjaxCall(){
		var username=$(".username").val();
		var mail=$(".email").val();
$.ajax({
     url: '../users/ajaxadd',
      type: 'GET',
      data:{
      	"username":username,
      	"email":mail
      },
      error: function() {
         alert("error");
      },
      success: function(data) {
        alert("Success");
      },
   });
	}
</script>
</head>
<body>
<input type="text" name="username" class="username"  />
<input type="text" name="email" class="email"  />
<input type="button" name="" value="Click Me" onclick="AjaxCall()" />
</body>
</html>



step21: routes/users/     add

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






-------------------------------------------Making Ajax Post Request----------------------------------------

Step22: routes/users/     replace get request to

outer.post('/ajaxadd', function(req, res) {
    var db = req.db;
var username=req.body.username;
var email=req.body.email;
console.log(username);
console.log(email);
 db.collection('usersCollection').insert({"username":username,"email":email,"user_id":""}, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});




Step23: Ajax Call Post


<html>
<head>
<script src="../javascripts/jquary.js "></script>
<script>
	function AjaxCall(){
		var username=$(".username").val();
		var mail=$(".email").val();
$.ajax({
     url: '../users/ajaxadd',
      type: 'POST',
      data:{
      	"username":username,
      	"email":mail
      },
      error: function() {
         alert("error");
      },
      success: function(data) {
        alert("Success");
      },
   });
	} 
</script>
</head>
<body>
<input type="text" name="username" class="username"  />
<input type="text" name="email" class="email"  />
<input type="button" name="" value="Click Me" onclick="AjaxCall()" />
</body>
</html>


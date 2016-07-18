var express = require("express");
var app = express();
var databaseManager = require("./database-manager.js");

app.use(express.static("public"));
app.listen(3000,function(){
	console.log("listening on port", 3000);
});

var bodyParser = require('body-parser')
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.post("/users", function(request, response){
 	databaseManager.saveTeam(request.body.team_name,request.body.password,request.body.admin,databaseManager.firstMember);
 	response.send(request.body);
});

app.get("/users", function(request, response){
	databaseManager.readTeam(request.query.team_name, request.query.password);
	response.send(request.query);
});

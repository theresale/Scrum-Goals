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
 	databaseManager.saveUser(request.body.username,request.body.password,request.body.team, function(result){
 		return response.send(result);
 	});
});

app.post("/teams", function(request, response){
	databaseManager.saveTeam(request.body.team);
	response.send(request.body);
});

app.get("/users", function(request, response){
	databaseManager.readUser(request.query.username, request.query.password);
});

app.get("/teams", function(request, response){
	 databaseManager.readAllTeams(function(result){
	 	return response.send(result);
	 });
});

app.put("/users", function(request,response){
	databaseManager.updateTeamId(request.body.team_id, request.body.id);
});



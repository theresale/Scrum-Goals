"use strict";
var Pool = require("pg").Pool;

process.on("unhandledRejection", function(e){
	console.log(e.message, e.stack);
}); //error code

module.exports = (function() {
	var config = {
		host: 	  "localhost",
		user: 	  "scrum_server",
		password: "password",
		database: "postgres"
	};
	
	var pool = new Pool(config);

	var saveUser = function(username,password,team_id,callback) {
		pool.query(
			"INSERT INTO team_member" + 
			" (username, password, team_id)" +
			" VALUES ($1, $2, $3) RETURNING id;", [username, password, team_id], function(error, result) { 
				if (error) return console.error(error);
				callback(result);
			}
		);
	}

	var readUser = function(username, password, callback) {
		pool.query(
			"SELECT id, team_id FROM team_member"+
			" WHERE username = $1"+
			" AND password = $2;", [username, password], function(error, result) {
				if (error) return console.error(error);
				callback(result);
			}
		);
	}

	var saveTeam = function(name, callback) {
		pool.query(
			"INSERT INTO team" +
			" (name)" + 
			" VALUES ($1) RETURNING id;", [name], function(error,result) {
				if (error) return console.error(error);
				callback(result);
			}
		);
	}

	var readYourTeam = function(id,callback) {
		pool.query(
			"SELECT name FROM team"+
			" WHERE id = $1;", [id], function(error,result) {
				if (error) return console.error(error);
				callback(result);
			}
		);
	}

	var readAllTeams = function(callback) {
		pool.query(
			"SELECT * FROM team;", function(error, result) {
				if (error) return console.error(error);
				callback(result);
			}
		);
	}

	var updateTeamId = function(team_id,id,callback) {
		pool.query(
			"UPDATE team_member"+
			" SET team_id=$1"+
			" WHERE id=$2", [team_id, id], function(error,result) {
				if (error) return console.error(error);
				callback(result);
			}
		);
	} 

	var readTeamMembers = function(team_id,callback){
		pool.query(
			"SELECT username, id FROM team_member"+
			" WHERE team_id=$1;", [team_id], function(error,result){
				if (error) return console.error(error);
				callback(result);
			}
		);
	}

	var saveTask = function(task, team_member_id, team_id, callback){
		pool.query(
			"INSERT INTO todo_list"+
			" (task, team_member_id, team_id)"+
			" VALUES ($1, $2, $3) RETURNING id;", [task, team_member_id, team_id], function(error,result){
				if (error) return console.error(error);
				callback(result);
			}
		);
	}

	var readTasks = function(team_id, callback){
		pool.query(
			"SELECT task, team_member_id FROM todo_list"+
			" WHERE team_id = $1;", [team_id], function(error,result){
				if (error) return console.error(error);
				callback(result);
			}
		);
	}

	var deleteTask = function(task_id, callback){
		pool.query(
			"DELETE todo_list"+
			" WHERE task_id = $1;", [task_id], function(error,result){
				if (error) return console.error(error);
				callback(result);	
			}
		);
	}

	 return {
	 	saveUser: saveUser,
	 	readUser: readUser,
	 	saveTeam: saveTeam,
	 	readYourTeam: readYourTeam,
	 	readAllTeams: readAllTeams,
	 	updateTeamId: updateTeamId,
	 	readTeamMembers: readTeamMembers,
	 	saveTask: saveTask,
	 	readTasks: readTasks,
	 	deleteTask: deleteTask
	 };
})();


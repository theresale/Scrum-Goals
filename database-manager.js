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

	var saveUser = function(username,password,team_id) {
		pool.query(
			"INSERT INTO team_member" + 
			" (username, password, team_id)" +
			" VALUES ($1, $2, $3) RETURNING id;", [username, password, team_id], function(error, result) { 
				if (error) return console.error(error);
				console.log(result);
				//var profileID = result.rows[0].id;
				//callback(admin, profileID);
			}
		);
	}

	var readUser = function(username, password,team_id) {
		pool.query(
			"SELECT id FROM team_member"+
			" WHERE username = $1"+
			" AND password = $2"+
			" AND team_id = $3;", [username, password, team_id], function(error, result) {
				if (error) return console.error(error);
				//var profileID = result.rows[0].id;
				//callback(profileID, callbackTwo);
			}
		);
	}

	var saveTeam = function(name) {
		pool.query(
			"INSERT INTO team" +
			" (name)" + 
			" VALUES ($1) RETURNING id;", [name], function(error,result) {
				if (error) return console.error(error);
			}
		);
	}

	var readTeam = function(callback) {
		pool.query(
			"SELECT * FROM team;", function(error, result) {
				if (error) return console.error(error);
				callback(result);
			}
		);
	}



	// var createList = function(item,profile_id) {
	// 	pool.query(
	// 		"INSERT INTO grocery_list" +
	// 		" (item, profile_id)" +
	// 		" VALUES ($1, $2);", [item, profile_id], function(error, result) {
	// 			if (error) return console.error(error);
	// 		}
	// 	);
	// }

	// var updateList = function(item,profile_id) {
	// 	//console.log(item);
	// 	pool.query(
	// 		"UPDATE grocery_list" +
	// 		" SET item = $1" +
	// 		" WHERE profile_id = $2;", [item, profile_id], function(error, result) {
	// 			if (error) return console.error(error);
	// 		}
	// 	);
	// }

	// var readList = function(profile_id,callback) {
	// 	pool.query(
	// 		"SELECT * FROM grocery_list"+
	// 		" WHERE profile_id=$1", [profile_id], function(error,result) {
	// 			if (error) return console.error(error);
	// 			callback(result);
	// 		}
	// 	);
	// }

	 return {
	 	saveUser: saveUser,
	 	readUser: readUser,
	 	saveTeam: saveTeam,
	 	readTeam: readTeam
	 };
})();


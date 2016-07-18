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

	var saveTeam = function(team_name,password) {
		pool.query(
			"INSERT INTO team" + 
			" (team_name, password)" +
			" VALUES ($1, $2) RETURNING id;", [team_name, password], function(error, result) { 
				if (error) return console.error(error);
				//var profileID = result.rows[0].id;
				//callback(["Begin List"], profileID);
			}
		);
	}

	var readTeam = function(team_name, password) {
		pool.query(
			"SELECT id FROM team"+
			" WHERE team_name = $1"+
			" AND password = $2;", [team_name, password], function(error, result) {
				if (error) return console.error(error);
				//var profileID = result.rows[0].id;
				//callback(profileID, callbackTwo);
			}
		);
	}

	var saveMember = function(team_member,team_id) {
		pool.query(
			"INSERT INTO team_member" +
			" (team_member, team_id)" + 
			" VALUES ($1, $2) RETURNING id;", [team_member, team_id], function(error,result) {
				if (error) return console.error(error);
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
	 	saveTeam: saveTeam,
	 	saveMember: saveMember,
	 	readTeam: readTeam
	 };
})();


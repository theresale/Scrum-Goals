"use strict";
var Pool = require("pg").Pool;

process.on("unhandledRejection", function(e){
	console.log(e.message, e.stack);
}); //error code

module.exports = (function() {
	var config = {
		host: 	  "localhost",
		user: 	  "shopping_server",
		password: "password",
		database: "postgres"
	};
	var pool = new Pool(config);

	var saveProfile = function(username,password,callback) {
		pool.query(
			"INSERT INTO profile" + 
			" (username, password)" +
			" VALUES ($1, $2) RETURNING id;", [username, password], function(error, result) { 
				if (error) return console.error(error);
				var profileID = result.rows[0].id;
				callback(["Begin List"], profileID);
			}
		);
	}

	var createList = function(item,profile_id) {
		pool.query(
			"INSERT INTO grocery_list" +
			" (item, profile_id)" +
			" VALUES ($1, $2);", [item, profile_id], function(error, result) {
				if (error) return console.error(error);
			}
		);
	}

	var updateList = function(item,profile_id) {
		//console.log(item);
		pool.query(
			"UPDATE grocery_list" +
			" SET item = $1" +
			" WHERE profile_id = $2;", [item, profile_id], function(error, result) {
				if (error) return console.error(error);
			}
		);
	}

	var readProfile = function(username, password, callback, callbackTwo) {
		console.log(username, password)
		pool.query(
			"SELECT id FROM profile"+
			" WHERE username = $1"+
			" AND password = $2;", [username, password], function(error, result) {
				if (error) return console.error(error);
				var profileID = result.rows[0].id;
				callback(profileID, callbackTwo);
			}
		);
	}

	var readList = function(profile_id,callback) {
		pool.query(
			"SELECT * FROM grocery_list"+
			" WHERE profile_id=$1", [profile_id], function(error,result) {
				if (error) return console.error(error);
				callback(result);
			}
		);
	}

	return {
		saveProfile: saveProfile,
		createList: createList,
		readProfile: readProfile,
		readList: readList,
		updateList: updateList
	};
})();


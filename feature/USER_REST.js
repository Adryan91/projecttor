var mysql = require('mysql');

function USER_ROUTER(router, connection, md5) {
	var self = this;
	self.handleRoutes(router, connection, md5);
}

USER_ROUTER.prototype.handleRoutes = function(router, connection, md5) {
	router.get("/users", function(req, res) {
		var query = "SELECT * FROM ?? WHERE ??!=?";
		var table = ['users', 'IS_REMOVE', '1'];
		query = mysql.format(query, table);
		// console.log(query);
		connection.query(query, function(err, rows) {
			if(err) {
				res.json({"Error" : true, "Message" : "Error executing MySQL query"});
			} else {
				res.json({"Error" : false, "Message" : "Success", "Users" : rows});
			}
		});
	});

	router.get("/usersByRoles/:ROLE", function(req, res) {
		var ROLE = req.params.ROLE;
		var query = "SELECT * FROM ?? WHERE ??!=? AND ??=?";
		var table = ['users', 'IS_REMOVE', '1', 'ROLE', ROLE];

		query = mysql.format(query, table);
		// console.log(query);
		connection.query(query, function(err, rows) {
			if(err) { res.json({"Error" : true, "Message" : "Error executing MySQL query"}); }
			else { res.json({"Error" : false, "Message" : "Success", "Users" : rows}); }
		});
	});

	router.post("/users/create", function(req, res) {
		var FIRSTNAME = req.body.FIRSTNAME;
		var LASTNAME = req.body.LASTNAME;
		var EMAIL = req.body.EMAIL;
		var ROLE = req.body.ROLE;
		var split_email = EMAIL.split('@');
		var USERNAME = split_email['0'];

		var query = "INSERT INTO ??(??, ??, ??, ??, ??) VALUES (?, ?, ?, ?, ?)";
		var table = ['users', 'FIRSTNAME', 'LASTNAME', 'EMAIL', 'USERNAME', 'ROLE', FIRSTNAME, LASTNAME, EMAIL, USERNAME, ROLE];
		query = mysql.format(query, table);

		connection.query(query, function(err, rows) {
			if(err) {
				res.json({"Error" : true, "Message" : "Unable to add user. Please try again later."});
			} else {
				res.json({"Error" : false, "Message" : "User Successfully Added.", "User": rows});
			}
		});
	})

	router.get('/users/edit/:user_id', function(req, res) {
		var query = "SELECT * FROM ?? WHERE ??=?";
		var table = ['users', 'ID', req.params.user_id];
		query = mysql.format(query, table);

		connection.query(query, function(err, rows) {
			if(err) {
				res.json({"Error": true, "Message": "Error Executing Mysql Query"});
			} else {
				res.json({"Error": false, "Message": "Success", "User": rows});
			}
		});
	});

	router.put('/users/edit', function(req, res) {
		var ID = req.body.ID;
		var EMAIL = req.body.EMAIL;
		var FIRSTNAME = req.body.FIRSTNAME;
		var LASTNAME = req.body.LASTNAME;
		var USERNAME = req.body.USERNAME;
		var ROLE = req.body.ROLE;
		// query 
		var query = "UPDATE ?? SET ??=?, ??=?, ??=?, ??=?, ??=?  WHERE ??=?";
		var table = ['users', 'EMAIL', EMAIL, 'FIRSTNAME', FIRSTNAME, 'LASTNAME', LASTNAME, 'USERNAME', USERNAME, 'ROLE', ROLE, 'ID', ID];
		query = mysql.format(query, table);

		connection.query(query, function(err, rows) {
			if(err) {
				// console.log(err);
				res.json({"Error": true, "Message": "Unable to save user details. Please try again later."});
			} else {
				res.json({"Error": false, "Message": "User Successfully Saved.", "User": rows});
			}
		});
	});

	router.put('/users/remove', function(req, res) {
		var ID = req.body.ID;
		var query = "UPDATE ?? SET ??=? WHERE ??=?";
		var table = ['users', 'IS_REMOVE', '1', 'ID', ID];
		query = mysql.format(query, table);
		connection.query(query, function(err, rows) {
			if(err) {
				// console.log(err);
				res.json({"Error": true, "Message": "Unable to remove user. Please try again later."});
			} else {
				res.json({"Error": false, "Message": "User Successfully Removed.", "User": rows});
			}
		});
	});
}

module.exports = USER_ROUTER;
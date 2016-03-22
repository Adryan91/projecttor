var mysql = require('mysql');

function PROJECT_ROUTER(router, connection, md5) {
	var self = this;
	self.handleRoutes(router, connection, md5);
}

PROJECT_ROUTER.prototype.handleRoutes = function(router, connection, md5) {
	router.get('/projects', function(req, res) {
		var query = "SELECT P.ID, P.TITLE, P.DESCRIPTION, CONCAT(U.FIRSTNAME,' ',U.LASTNAME) AS PROJLEAD, P.START_DATE, P.STATUS FROM projects P LEFT JOIN users U ON U.ID=P.LEAD WHERE P.IS_REMOVED!='1'";
		var table = [];
		query = mysql.format(query, table);

		connection.query(query, function(err, rows) {
			if(err) {
				res.json({"Error" : true, "Message" : "Oops! Something went wrong. Please refresh the page."});
			} else {
				res.json({"Error" : true, "Message" : "Success", "Projects": rows});
			}
		});
	});

	router.get('/project/:projId', function(req, res) {
		var ProjId = req.params.projId;
		var query = "SELECT * FROM ?? WHERE ??=?";
		var table = ['projects', 'ID', ProjId];
		query = mysql.format(query, table);
		connection.query(query, function(err, row) {
			if(err) {
				res.json({"Error": true, "Message": "Someting went wrong. Please try again later."});
			} else {
				res.json({"Error": false, "Message": "Success", "Project": row[0]});
			}
		});
	});

	router.post('/project/create', function(req, res) {
		var TITLE = req.body.TITLE;
		var DESCRIPTION = req.body.DESCRIPTION;
		var LEAD = req.body.LEAD;
		var START_DATE = req.body.START_DATE;
		START_DATE = Format_Date(START_DATE);
		var END_DATE = req.body.END_DATE;
		END_DATE = Format_Date(END_DATE);
		var STATUS = req.body.STATUS;
		var query = "INSERT INTO ?? (??, ??, ??, ??, ??, ??) VALUES (?, ?, ?, ?, ?, ?)";
		var table = ['projects', 'TITLE', 'DESCRIPTION', 'LEAD', 'START_DATE', 'END_DATE', 'STATUS', TITLE, DESCRIPTION, LEAD, START_DATE, END_DATE, STATUS];
		query = mysql.format(query, table);
		// console.log(query);
		connection.query(query, function(err, row) {
			if(err) {
				res.json({"Error": true, "Message": "Unable to save project details. Please refresh and try again.", "Project": req.body});
			} else {
				res.json({"Error": false, "Message": "Project successfully saved.", "Project": row});
			}
		});
	});

	router.put('/project/edit', function(req, res) {
		var TITLE = req.body.TITLE;
		var DESCRIPTION = req.body.DESCRIPTION;
		var LEAD = req.body.LEAD;
		var START_DATE = req.body.START_DATE;
		START_DATE = Format_Date(START_DATE);
		var END_DATE = req.body.END_DATE;
		END_DATE = Format_Date(END_DATE);
		var STATUS = req.body.STATUS;
		var ID = req.body.ID;

		var query = "UPDATE ?? SET ??=?, ??=?, ??=?, ??=?, ??=?, ??=? WHERE ??=?";
		var table = ['projects', 'TITLE', TITLE, 'DESCRIPTION', DESCRIPTION, 'LEAD', LEAD, 'START_DATE', START_DATE, 'END_DATE', END_DATE, 'STATUS', STATUS, 'ID', ID];
		query = mysql.format(query, table);
		connection.query(query, function(err, row) {
			if(err) {
				res.json({"Error": true, "Message": "Unable to edit this project. Please try again."});
			} else {
				res.json({"Error": false, "Message": "Success", "Project": row});
			}
		});
	});

	router.put('/project/remove', function(req, res) {
		var ID = req.body.ID;
		var query = "UPDATE ?? SET ??=? WHERE ??=?";
		var table = ['projects', 'IS_REMOVED', '1', 'ID', ID];
		query = mysql.format(query, table);
		connection.query(query, function(err, row) {
			if(err) {
				res.json({"Error": true, "Message": "Unable to remove this project. please try again."});
			} else {
				res.json({"Error": false, "Message": "Success", "Project": row});
			}
		});
	});
}

var Format_Date = function(DATE) {
	var SplitDt = DATE.split('-');
	return SplitDt[2] +'-'+ SplitDt[1] +'-'+ SplitDt[0];
}

module.exports = PROJECT_ROUTER;
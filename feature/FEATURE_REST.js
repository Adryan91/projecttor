var mysql = require('mysql');

function FEATURE_ROUTER(router, connection, md5) {
	var self = this;
	self.handleRoutes(router, connection, md5);
}

FEATURE_ROUTER.prototype.handleRoutes = function(router, connection, md5) {
	router.get('/features/:ProjId', function(req, res) {
		var PROJECT_ID = req.params.ProjId;
		var query = "SELECT F.ID, F.TITLE, F.DESCRIPTION, F.START_DATE, F.ETA, F.STATUS, CONCAT(U.FIRSTNAME, ' ', U.LASTNAME) AS DEVELOPER FROM features F INNER JOIN users U ON U.ID=F.DEVELOPER_ID WHERE ??=?";
		var table = ['F.PROJECT_ID', PROJECT_ID];
		query = mysql.format(query, table);
		// console.log(query);

		connection.query(query, function(err, rows) {
			if(err) { res.json({"Error" : true, "Message" : "Oops! Something went wrong. Please refresh the page."}); }
			else { res.json({"Error" : true, "Message" : "Success", "Features": rows}); }
		});
	});

	router.get('/feature/:FeatId', function(req, res) {
		var ID = req.params.FeatId;
		var query = "SELECT F.ID, F.TITLE, F.DESCRIPTION, F.START_DATE, F.ETA, F.PROJECT_ID, F.STATUS, F.DEVELOPER_ID, F.REQUESTED_BY, P.TITLE AS PROJECT_TITLE FROM features F INNER JOIN projects P ON P.ID=F.PROJECT_ID WHERE ??=?";
		var table = ['F.ID', ID];
		query = mysql.format(query, table);

		connection.query(query, function(err, rows) {
			if(err) { res.json({"Error" : true, "Message" : "Oops! Something went wrong. Please refresh the page."}); }
			else { res.json({"Error" : true, "Message" : "Success", "Feature": rows[0]}); }
		});
	});

	router.post('/features/add', function(req, res) {
		var TITLE = req.body.TITLE;
		var DESCRIPTION = req.body.DESCRIPTION;
		var PROJECT_ID = req.body.PROJECT_ID;
		var DEVELOPER_ID = req.body.DEVELOPER_ID;
		var START_DATE = req.body.START_DATE;
		START_DATE = Format_Date(START_DATE);
		var ETA = req.body.ETA;
		var REQUESTED_BY = req.body.REQUESTED_BY;
		var STATUS = req.body.STATUS;

		var query = "INSERT INTO ??(??, ??, ??, ??, ??, ??, ??, ??) VALUES(?, ?, ?, ?, ?, ?, ?, ?)";
		var table = ['features', 'TITLE', 'DESCRIPTION', 'PROJECT_ID', 'DEVELOPER_ID', 'START_DATE', 'ETA', 'REQUESTED_BY', 'STATUS', TITLE, DESCRIPTION, PROJECT_ID, DEVELOPER_ID, START_DATE, ETA, REQUESTED_BY, STATUS];
		query = mysql.format(query, table);
		// console.log(query);
		connection.query(query, function(err, rows) {
			if(err) { res.json({"Error" : true, "Message" : "Oops! Something went wrong. Please refresh the page."}); }
			else { res.json({"Error" : false, "Message" : "Success", "Feature": rows}); }
		});
	});

	router.put('/features/edit', function(req, res) {
		var ID = req.body.ID;
		var TITLE = req.body.TITLE;
		var DESCRIPTION = req.body.DESCRIPTION;
		var DEVELOPER_ID = req.body.DEVELOPER_ID;
		var START_DATE = req.body.START_DATE;
		START_DATE = Format_Date(START_DATE);
		var ETA = req.body.ETA.toString();
		var REQUESTED_BY = req.body.REQUESTED_BY;
		var STATUS = req.body.STATUS;

		var query = "UPDATE ?? SET ??=?, ??=?, ??=?, ??=?, ??=?, ??=?, ??=? WHERE ??=?";
		var table = ['features', 'TITLE', TITLE, 'DESCRIPTION', DESCRIPTION, 'DEVELOPER_ID', DEVELOPER_ID, 'START_DATE', START_DATE, 'ETA', ETA, 'REQUESTED_BY', REQUESTED_BY, 'STATUS', STATUS, 'ID', ID];
		query = mysql.format(query, table);

		connection.query(query, function(err, rows) {
			if(err) { res.json({"Error" : true, "Message" : "Oops! Something went wrong. Please refresh the page."}); }
			else { res.json({"Error" : false, "Message" : "Success", "Feature": rows}); }
		});
	});
}

var Format_Date = function(DATE) {
	var SplitDt = DATE.split('-');
	return SplitDt[2] +'-'+ SplitDt[1] +'-'+ SplitDt[0];
}

module.exports = FEATURE_ROUTER;
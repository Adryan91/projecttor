var express = require('express');
var cors = require('cors');
var mysql = require("mysql");
var bodyParser = require('body-parser');
var md5 = require('MD5');
var userrest = require('./USER_REST.js');
var projrest = require('./PROJECT_REST.js');
var featrest = require('./FEATURE_REST.js');

var app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
// var corsOptions = { origin: };

function REST() {
	var self = this;
	self.connectMysql();
}

REST.prototype.connectMysql = function() {
	var self = this;
	var pool = mysql.createPool({
		connectionLimit: 100,
		host: 'localhost',
		user: 'root',
		password: '',
		database: 'feature',
		debug: false
	});

	pool.getConnection(function(err, conn) {
		if(err) { self.stop(err); }
		else { self.configureExpress(conn); }
	});
}

REST.prototype.configureExpress = function(connection) {
	var self = this;
	app.use(bodyParser.urlencoded({extended: true}));
	app.use(bodyParser.json());
	var router = express.Router();
	app.use('/api', router);
	// CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
	app.all('*', function(req, res, next) {
       res.header("Access-Control-Allow-Origin", "*");
       res.header("Access-Control-Allow-Headers", "X-Requested-With");
       res.header('Access-Control-Allow-Headers', 'Content-Type');
       next();
	});
	var urest_router = new userrest(router, connection, md5);
	var prest_router = new projrest(router, connection, md5);
	var frest_router = new featrest(router, connection, md5);
	self.startServer();
}

REST.prototype.startServer = function() {
	app.listen(8080, function() {
		// var port = server.address().port;
		console.log('I am alive at port %s', 8080);
	});
}

REST.prototype.stop = function(err) {
	console.log("ISSUE WITH MYSQL n" + err);
	process.exit(1);
}

new REST();
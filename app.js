// web server
var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var router = express.Router();
var staticDir = __dirname + '/static';

var bodyParser = require('body-parser');


//config
app.use(bodyParser());


// database
var mysql = require ('mysql');
var pool = mysql.createPool({
	host: 'localhost',
	user: 'demo',
	password: 'demo',
	database: 'autohub'
});



// log request
router.use(function(req, res, next){
	console.log(req.method, req.url);
	next();
});



// define routers

// http://localhost/home
router.get('/home', function(req, res){
	res.sendfile(staticDir + '/index.html');
});

// http://localhost/about
router.get('/about', function(req, res){
	console.log('Requested for about.html');
	res.sendfile(staticDir + '/about.html');
});


// CRUD, LIST for table [members]
// LIST
router.get('/members', function(req, res){
	var sql = 'select * from members';
	var params = [];
	// check if filter is defined
	if(Object.keys(req.query).length > 0){
		var filter = '';
		
		for(var param in req.query){
			//filter += param + " LIKE '%"  + req.query[param] + "' and ";
			filter += param + " = ? and ";
			params.push(req.query[param]);
 		}
		filter = filter.substring(0,filter.length-5);
		sql = sql + ' where ' + filter;
	} 
	pool.query(sql, params, function(err, rows) {
		res.json((err?err:rows));
	});
});
// CREATE
router.post('/members', function(req, res){
	var member = req.body;
	pool.query('insert into members values(?,?,?,?,?,?);', 
		[
			member.id,
			member.lastname,
			member.firstname,
			member.mobile,
			member.email,
			member.pointsBalance
		], 
		function(err, rows){
			res.json((err?err:member));
		}
	);
});
// READ
router.get('/members/:id', function(req, res){
	var id = req.params.id;
	pool.query('select * from members where id = ?;', [ id ], function(err, rows) {
		res.json((err?err:rows));
	});
});
// UPDATE
router.put('/members/:id', function(req, res){
	var id = req.params.id;
	var member = req.body;
	pool.query('update members set lastname=?, firstname=?, mobile=?, email=?, pointsBalance=? where id = ?;', 
		[
			member.lastname,
			member.firstname,
			member.mobile,
			member.email,
			member.pointsBalance,
			member.id
		], 
		function(err, rows){
			res.json((err?err:member));
		}
	);
});
// DELETE
router.delete('/members/:id',function(req, res){
	var id = req.params.id;
	pool.query('delete from members where id = ?;', 
		[ id ], 
		function(err, rows){
			res.json((err?err:member));
		}
	);	
});

















// finally
app.use(express.static(__dirname + '/static'));
app.use('/', router);

app.listen(port);
console.log('Webserver started on port ' + port);
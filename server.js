// web server
var express = require('express');
var app = express();
var port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
var ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var router = express.Router();
var staticDir = __dirname + '/static';

var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');


//config
app.use(bodyParser());
app.use(cookieParser()) // required before session.
app.use(session({
    secret: '@ut0hub'
}))

// database
var mysql = require ('mysql');
var pool = mysql.createPool({
	host: process.env.OPENSHIFT_MYSQL_DB_HOST || 'localhost',
	user: 'demo',
	password: 'demo',
	database: 'autohub'
});
//

/**
app.get('/debug',function(req, res){

	if(!req.session.user && req.query.user){
		req.session.user = req.query.user;
	}
	
	if(req.session.user){
		res.end('current user is ' + req.session.user );
	} else {
		res.end('not authenticated!');
		//res.json(req.session);
	}
	
});

app.get('/app', function(req, res, next) {
	if(req.session.user) {
		next();
	} else {
		res.redirect('/debug');
	}
});
*/

app.post('/auth', function(req, res, next){
	var sql = 'select username, fullname from users where username = ? and password = ?';
	console.log(req.body.username, req.body.password);
	pool.query(sql, [req.body.username, req.body.password], function(err, rows) {
		var reply = (err?err:rows);
		res.json(reply);
		if(rows.length > 0){
			// log session
			req.session.user = {
				username: req.body.username
			};
			console.log(JSON.stringify(req.session.user) + ' recorded in session');
		}
	});
	
});

app.get('/auth/user', function(req, res){
	if(req.session.user){
		res.json(req.session.user);
	} else {
		res.json({ message: 'empty session'});
	}
});

app.use(function(req,res, next){
	console.log('app:', req.method, req.url);
	next();
});



// log request
router.use(function(req, res, next){
	console.log('router:', req.method, req.url);
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

// 
router.get('/transaction', function(req, res){
	pool.query('select * from transaction;', null, function(err, rows) {
		res.json((err?err:rows));
	});
});

router.get('/app/transaction', function(req, res){
	res.sendfile(staticDir + '/app/transaction.html');
})



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
	console.log("POST", member);
	pool.query('insert into members(lastname, firstname, mobile, email, pointsBalance) values(?,?,?,?,?);', 
		[
			member.lastname,
			member.firstname,
			member.mobile,
			member.email,
			member.pointsBalance
		], 
		function(err, rows){
			member['id'] = rows.insertId;	
			
			logTransaction('INSERT', req.session.user, member);
			res.json((err?err:member));
			
		}
	);
	console.log(member);
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

	var member = req.body;
	
	// generate update statement
	var sql = '';
	var sql2 = '';
	var params = [];
	
	for(column in member) {
		if(column != 'id'){
			sql += column + '=?,';
			sql2 += column + ',';
			params.push(member[column]);
		}		
	}
	sql = 'update members set ' + sql.substring(0,sql.length-1) + ' where id=?;';
	sql2 = 'select ' + sql2.substring(0,sql2.length-1) + ' from members where id=?'; 
	params.push(member.id);
	
	// record transaction 
	// remember old values before update
	pool.query(
		sql2,
		[member.id],
		function(err, rows){
			var before = rows[0];
			
			// perform actual update
			pool.query(
				sql, 
				params, 
				function(err, rows){
			
					var log = {
						before: before,
						after: member
					}
					logTransaction('UPDATE', req.session.user, log);
			
					res.json((err?err:member));
			
				}
			);
			
			
		}
	);
	
	
	
	

	
});

// DELETE
router.delete('/members/:id',function(req, res){
	var id = req.params.id;
	pool.query('delete from members where id = ?;', 
		[ id ], 
		function(err, rows){
			logTransaction('DELETE', req.session.user, {id: id});
			res.json((err?err:member));
		}
	);	
});




/////////////////

function logTransaction(type, user, data){	
	var username = user.username;
	pool.query('insert into transaction(username, type, data, stamp) values(?,?,?,NOW());', 
		[
			username,
			type,
			JSON.stringify(data)
		], 
		function(err, rows){
			console.log((err?err:rows));		
		}
	);
}

////////////////







// finally
app.use(express.static(__dirname + '/static'));
app.use('/', router);

app.listen(port, ip);
console.log('Webserver started on ' + ip + ':' + port);
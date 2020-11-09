var RedisMonitor = require('./utils/RedisMonitor');
var Models = require('./database/models/model');
// var hashlib = require('hashlib');


var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

const path = require('path');
const express = require('express');
const app = new express();
 
app.use(express.static('public'));
 
app.listen(4000, () => {
    console.log('App listening on port 4000')
});


app.get('/api/redis_list', (req, res) => {
	let sql = `SELECT *  FROM RedisInfo`;

	db.all(sql, [], (err, rows) => {
	if (err) {
		throw err;
	}

	res.send(rows)

	});
});


app.get('/api/redis_monitor', jsonParser, (req, res) => {
	try {
		md5 = req.body['md5'];
		let sql = 'SELECT md5 FROM RedisInfo WHERE md5 IN (?);';

		db.get(sql, [md5], function(err, row){
		    if (err) {
		        console.log(err);
		    }
	    	rst = RedisMonitor.getInfo(row['host'], row['port'], row['password']);
			console.log(rst)
			res.send(rst)
		});

	} catch(err) {
		console.log(err)
		rst = {
			'success': 0,
			'data': 'get redis realtime information error!'
		}
		res.send(rst)
	}

});


app.get('/api/ping', jsonParser, (req, res) => {
	try {
		data = req.body;

		rst = RedisMonitor.ping(data['host'], data['port'], data['password']);
		res.send(rst)

	} catch(err) {
		console.log(err)
        rst = {
        	'success': 0,
        	'data': 'ping error!'
        }
		res.send(rst)
	}

});


app.post('/api/add', jsonParser, (req, res) => {
	data = req.body;
	let sql = 'INSERT INTO RedisInfo (md5, host, port, password, add_time) VALUES (?, ?, ?, ?, ?)';

	try {
		let rst = RedisMonitor.ping(data['host'], data['port'], data['password'])
		if(!rst['success']) {
			res.send(rst)
		}
	} catch(err) {
		console.log(err)
		res.send({
			'success': 0,
			'data': 'Ping error!'
		})
	}

	Models.create({
		'md5': data['port'],
		'port': data['port'],
		'host': data['host'],
		'password': data['password'],
		'add_time': data['add_time'],
	});
	res.send(req.body);
});


app.delete('/api/delete', jsonParser, (req, res) => {
	data = req.body;
	let sql = 'DELETE FROM RedisInfo WHERE md5 IN (?);';

	db.run(sql, [data['md5']], function(err){
	    if (err) {
	        console.log(err);
	    }
	});
	res.send(req.body);
});


app.get('/api/redis_info', jsonParser, (req, res) => {
	data = req.body;
	let sql = 'SELECT md5 FROM RedisInfo WHERE md5 IN (?);';

	db.get(sql, [data['md5']], function(err, rows){
	    if (err) {
	        console.log(err);
	    }
		res.send(rows);
	});
});

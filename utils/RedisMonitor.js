const redis = require('redis');

exports.ping = function(host, port, password) {

    redis_rst = {}

    try {
        client    = redis.createClient({
            port      : port,
            host      : host,
            password  : password,
        });

        redis_rst['success'] = 1;
        redis_rst['data'] = 'Ping success!';
    } catch(err) {
        redis_rst['success'] = 0;
        redis_rst['data'] = 'Ping error!';
    }

    return redis_rst
};

function new_request(host, port, password) {
    let redis_rst = {}
    try {
        let date = new Date;
        let start = date.getTime();
        let client    = redis.createClient({
            port      : port,
            host      : host,
            password  : password,
        });
        let info = client.server_info;

        let end = date.getTime();
        info['get_time'] = (end - start) * 1000;

        redis_rst['success'] = 1
        redis_rst['data'] = info

    } catch(err) {
        redis_rst['success'] = 0
        redis_rst['data'] = 'error'
    }
    console.log(redis_rst)
    return redis_rst;
};

exports.getInfo = function(host, port, password) {
    redis_rst = {}

    if (host && port) {
        redis_rst = new_request(host, port, password)
    } else{
        redis_rst = {
            'success': 0, 
            'data': 'Parameter error!'
        };
    }
    return new_request(host, port, password);   
};
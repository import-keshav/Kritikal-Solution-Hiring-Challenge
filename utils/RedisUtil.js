const redis = require('redis');

exports.flushall = function(host, port, password) {

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
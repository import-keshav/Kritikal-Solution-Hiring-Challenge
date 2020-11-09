const sqlite3 = require('sqlite3').verbose();

const DB_PATH = './sqlite.db'

const DB = new sqlite3.Database(DB_PATH, function(err){
    if (err) {
        console.log(err)
        return
    }
    console.log('Connected to ' + DB_PATH + ' database.')
});


dbSchema = `CREATE TABLE IF NOT EXISTS RedisInfo (
        md5 text NOT NULL PRIMARY KEY,
        host text NOT NULL,
        port integer NOT NULL,
        password text NOT NULL,
        add_time text NOT NULL
    );`

DB.exec(dbSchema, function(err){
    if (err) {
        console.log(err)
    }
});

DB.close()
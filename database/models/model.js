// const sqlite3 = require('sqlite3').verbose();

// const DB_PATH = './sqlite.db'

// const DB = new sqlite3.Database(DB_PATH, function(err){
//     if (err) {
//         console.log(err)
//         return
//     }
//     console.log('Connected to ' + DB_PATH + ' database.')
// });


// dbSchema = `CREATE TABLE IF NOT EXISTS RedisInfo (
//         md5 text NOT NULL PRIMARY KEY,
//         host text NOT NULL,
//         port integer NOT NULL,
//         password text NOT NULL,
//         add_time text NOT NULL
//     );`

// DB.exec(dbSchema, function(err){
//     if (err) {
//         console.log(err)
//     }
// });

// DB.close()



const { Sequelize, Model, DataTypes } = require("sequelize");
// const sequelize = new Sequelize({
// 	dialect: 'sqlite',
// 	storage: './sqlite.db'
// });
const sequelize = new Sequelize('sqlite::memory:');

const RedisInfo = sequelize.define('RedisInfo', {
 	md5: {
    	type: DataTypes.STRING,
    	allowNull: false
	},
  	host: {
	    type: DataTypes.STRING,
    	allowNull: false
    },
  	port: {
	    type: DataTypes.STRING,
    	allowNull: false
    },
  	password: {
	    type: DataTypes.STRING,
    	allowNull: false
    },
 	add_time: {
    	type: DataTypes.STRING,
    	allowNull: false
    }
});


exports.create = function(data) {
	const obj = RedisInfo.build(data)
	obj.save()
}
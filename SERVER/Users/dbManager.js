const mysql = require('mysql');
const syncSql = require('sync-sql');

const config = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'movies_series'
}

const db = mysql.createConnection(config);

module.exports = {
    getUsers: () => {
        return syncSql.mysql(config, 'SELECT * FROM users').data.rows;
    },
    getUserById: (id) => {
        return syncSql.mysql(config, `SELECT * FROM users WHERE userID=${id}`).data.rows; 
    },
    addUser: (data) => {
        db.query(`INSERT INTO users SET ?`, data, (err, result) => {
            if(err) throw err;
            console.log(result);
        });
    },
    addContent: (data) => {
        db.query(`INSERT INTO content SET ?`, data, (err, result) => {
            if(err) throw err;
            console.log(result);
        })
    },
    removeContent: (content) => {
        db.query(`DELETE FROM content WHERE contentID=${content}`, (err, result) => {
            if(err) throw err;
            console.log(result);
        })
    }
}
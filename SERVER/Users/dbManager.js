const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'movies_series'
});

module.exports = {
    getUsers: (cb) => {
        db.query('SELECT * FROM users', (err, result) => {
            if(err) throw err;
            cb(result);
        });
    },
    getUserById: (id, cb) => {
        db.query(`SELECT * FROM users WHERE userID=${id}`, (err, result) => {
            if(err) throw err;
            cb(result);
        });
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
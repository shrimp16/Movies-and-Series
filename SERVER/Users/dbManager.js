const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'movies_series'
});

module.exports = {
    getUsers: (cb) => {
        startConnection();
        db.query('SELECT * FROM users', (err, result) => {
            if(err) throw err;
            cb(result);
        });
        endConnection();
    },
    getUserById: (id, cb) => {
        startConnection();
        db.query(`SELECT * FROM users WHERE userID=${id}`, (err, result) => {
            if(err) throw err;
            cb(result);
        });
        endConnection();
    },
    addUser: (data) => {

    },
    addContent: (user, data) => {

    },
    removeContent: (user, content) => {

    }
}

function startConnection() {
    db.connect((err) => {
        if(err) throw err;
    })
}

function endConnection() {
    db.end((err) => {
        if(err) throw err;
    })
}
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
        return syncSql.mysql(config, `SELECT * FROM users WHERE userID=${id}`).data.rows[0]; 
    },
    getUserByName: (username) => {
        return syncSql.mysql(config, `SELECT * FROM users WHERE username="${username}"`).data.rows[0];
    },
    usernameExists: (username) => {
        let exists = syncSql.mysql(config, `SELECT * FROM users WHERE username="${username}"`).data.rows;
        if(exists.length > 0){
            return true;
        }
        return false;
    },
    emailExists: (email) => {
        let exists = syncSql.mysql(config, `SELECT * FROM users WHERE email="${email}"`).data.rows;
        if(exists.length > 0){
            return true;
        }
        return false;
    },
    addUser: (data) => {
        db.query(`INSERT INTO users SET ?`, data, (err, result) => {
            if(err) throw err;
        });
    },
    updateProfile: (profile) => {
        db.query(`INSERT INTO profiles SET ?`, profile, (err, result) => {
            if(err) throw err;
        })
    },
    addContent: (data) => {
        db.query(`INSERT INTO content SET ?`, data, (err, result) => {
            if(err) throw err;
        })
    },
    removeContent: (contentID) => {
        db.query(`DELETE FROM content WHERE contentID=${contentID}`, (err, result) => {
            if(err) throw err;
        })
    },
    getUserContent: (id) => {
        return syncSql.mysql(config, `SELECT contentID FROM content WHERE ownerID=${id}`).data.rows;
    },
    getContent: (id) => {
        return syncSql.mysql(config, `SELECT * FROM content WHERE contentID=${id}`).data.rows;
    },
    addComment: (comment) => {
        db.query('INSERT INTO comments SET ?', comment, (err, result) => {
            if(err) throw err;
        })
    },
    removeComment: () => {

    },
    likeComment: () => {

    },
    removeLike: () => {

    }
}
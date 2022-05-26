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
    getAllFromTable: (table) => {
        return syncSql.mysql(config, `SELECT * FROM ${table}`);
    },
    getDataFromTable: (table, data) => {
        return syncSql.mysql(config, `SELECT ${data} FROM ${table}`);
    },
    getDateFromTableWithCondition: (table, data, condition) => {
        if(!data){
            return syncSql.mysql(config, `SELECT * FROM ${table} WHERE ${condition}`);
        }
    },
    usernameExists: (username) => {
        let exists = syncSql.mysql(config, `SELECT * FROM users WHERE username="${username}"`).data.rows;
        if(exists.length > 0) {
            return true;
        }
        return false;
    },
    emailExists: (email) => {
        let exists = syncSql.mysql(config, `SELECT * FROM users WHERE email="${email}"`).data.rows;
        if(exists.length > 0) {
            return true;
        }
        return false;
    }
}
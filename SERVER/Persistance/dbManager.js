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
    }
}
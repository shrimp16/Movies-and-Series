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
    getDataFromTableWithCondition: (table, data, condition) => {
        if(!data){
            return syncSql.mysql(config, `SELECT * FROM ${table} WHERE ${condition}`);
        }

        return syncSql.mysql(config, `SELECT ${data} FROM ${table} WHERE ${condition}`);
    },
    exists: (userData, property) => {
        let exists = syncSql.mysql(config, `SELECT * FROM ${property} WHERE ${property}="${userData}"`).data.rows;
        if(exists.length > 0){
            return true;
        }
        return false;
    }
}
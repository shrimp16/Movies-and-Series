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
        return syncSql.mysql(config, `SELECT * FROM ${table}`).data.rows;
    },
    getDataFromTable: (table, data) => {
        return syncSql.mysql(config, `SELECT ${data} FROM ${table}`).data.rows;
    },
    getDataFromTableWithCondition: (table, data, condition) => {
        if(!data){
            return syncSql.mysql(config, `SELECT * FROM ${table} WHERE ${condition}`).data.rows;
        }

        return syncSql.mysql(config, `SELECT ${data} FROM ${table} WHERE ${condition}`).data.rows;
    },
    exists: (table, userData, property) => {
        
        let exists = syncSql.mysql(config, `SELECT * FROM ${table} WHERE ${property}="${userData}"`).data.rows;
        console.log(exists);
        if(exists.length > 0){
            return true;
        }
        return false;
    },
    addToDatabase: (table, data) => {
        db.query(`INSERT INTO ${table} SET ?`, data, (err, result) => {
            if(err) throw err;
        })
    },
    removeFromDatabse: (table, condition) => {
        db.query(`DELETE FROM ${table} WHERE ${condition}`, (err, result) => {
            if(err) throw err;
        })
    }
}
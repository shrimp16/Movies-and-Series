const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'movies_series'
});

module.exports = {
    getUsers: () => {
        
    },
    getUserById: (id) => {

    },
    addUser: (data) => {

    },
    addContent: (user, data) => {

    },
    removeContent: (user, content) => {
        
    }
}
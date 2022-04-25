const fs = require('fs');

module.exports = {
    getUsers: () => {
        return JSON.parse(fs.readFileSync('./Users/users.json'))
    },
    getUserById: (id) => {
        return module.exports.getUsers()[id]
    },
    updateFile: (data) => {
        fs.writeFile('./Users/users.json', JSON.stringify(data, null, 2), (err) => {
            if (err) console.log(err.message);
        })
    }
}
const fs = require('fs');

module.exports = {
    getUsers: () => {
        return JSON.parse(fs.readFileSync('./Users/users.json'))
    },
    getUserById: (id) => {
        return module.exports.getUsers()[id]
    },
    updateFile: (data) => {
        console.log("wip")
    },
    removeContent: (user, contentID) => {
        console.log("wip")
    }
}
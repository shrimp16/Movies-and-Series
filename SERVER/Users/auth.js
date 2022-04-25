const fileManager = require('./fileManager');

module.exports = {
    register: (username, password) => {
        let users = fileManager.getUsers();
        let newUser = {
            username: username,
            password: password,
            id: users.length,
            content: []
        }
        users.push(newUser);
        fileManager.updateFile(users);
    },
    login: (username, password) => {
        console.log("wip");
    }
}

function usernameExists(username){
    console.log("wip")
}
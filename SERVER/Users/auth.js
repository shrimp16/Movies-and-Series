const fileManager = require('./fileManager');

module.exports = {
    register: (username, password) => {

        if(usernameExists(username)){
            return "Username already exists!"
        }

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

function usernameExists(user){

    let users = fileManager.getUsers();

    for(let i = 0; i < users.length; i++){
        if(users[i].username === user){
            return true;
        }
    }

    return false;
    
}
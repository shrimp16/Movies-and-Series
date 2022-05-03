const dbManager = require('../Persistance/dbManager');

module.exports = {
    register: (username, password) => {

        if(dbManager.usernameExists(username)){
            return "Username already exists!";
        }

        let newUser = {
            username: username,
            password: password
        }
        
        dbManager.addUser(newUser);
        
        return "User created with success!";
    },
    login: (username, password) => {
        
        let user = dbManager.getUserByName(username);
        console.log(user);
        if(user.password === password){
            return user.userID;
        }

        return false;

    }
}
const dbManager = require('../Persistance/dbManager');

const defaultProfile = {
    picture: 'Default',
    description: 'This is where your description will look like'
}

module.exports = {
    register: (username, password, email) => {

        if (dbManager.usernameExists(username)) {
            return "Username already exists!";
        }

        if(dbManager.emailExists(email)) {
            return "Email already exists!";
        }

        let newUser = {
            username: username,
            email: email,
            password: password
        }

        dbManager.addUser(newUser);

        setTimeout(() => {
            
            defaultProfile.userID = dbManager.getUserByName(username).userID;

            dbManager.updateProfile(defaultProfile);

        }, 100);

        return "User created with success!";
    },
    login: (username, password) => {

        console.log(username);
        console.log(password);

        let user = dbManager.getUserByName(username);

        console.log(user);

        if(!user){
            return false;
        }

        if (user.password === password) {
            return user.userID;
        }

        return false;

    }
}
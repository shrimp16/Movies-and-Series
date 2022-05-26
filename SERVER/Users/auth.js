const dbManager = require('../Persistance/dbManager');

const defaultProfile = {
    picture: 'Default',
    description: 'This is where your description will look like'
}

module.exports = {
    register: (username, password, email) => {

        if (dbManager.exists('users', username, 'username')) {
            return "Username already exists!";
        }

        if(dbManager.exists('users', email, 'email')) {
            return "Email already exists!";
        }

        let newUser = {
            username: username,
            email: email,
            password: password
        }

        dbManager.addToDatabase('users', newUser);

        setTimeout(() => {
            
            defaultProfile.userID = dbManager.getUserByName(username).userID;

            dbManager.updateProfile(defaultProfile);

        }, 100);

        return "User created with success!";
    },
    login: (username, password) => {

        console.log(username);
        console.log(password);

        let user = dbManager.getDataFromTableWithCondition('users', null, `username="${username}"`);

        console.log(user);

        if(!user){
            return false;
        }

        if (user[0].password === password) {
            return user[0].userID;
        }

        return false;

    }
}
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
            
            defaultProfile.userID = dbManager.getDataFromTableWithCondition(
                'users',
                'userID',
                `username="${username}"`
                )[0].userID;

            dbManager.addToDatabase('profiles', defaultProfile);

        }, 100);

        return "User created with success!";
    },
    login: (username, password) => {

        let user = dbManager.getDataFromTableWithCondition('users', null, `username="${username}"`);

        if(!user[0]){
            return false;
        }

        if (user[0].password === password) {
            return user[0].userID;
        }

        return false;

    }
}
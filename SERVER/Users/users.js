const fileManager = require('./fileManager')

module.exports = {
    addContent: (userID, content) => {

        let users = fileManager.getUsers();
        
        users[userID].content.push(content);

        fileManager.updateFile(users);

    },
    removeContent: (userID, contentID) => {
        
        let users = fileManager.getUsers();

        if(contentID === 0){
            users[userID].content.shift();
        }else {
            users[userID].content.splice(contentID, 1);
        }

        fileManager.updateFile(users);
    },
    getUserContent: (userID) => {

        let user = fileManager.getUserById(userID);

        let userData = {
            username: user.username,
            content: user.content
        }

        return userData;
        
    }

}
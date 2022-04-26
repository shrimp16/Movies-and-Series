const fileManager = require('./fileManager')

module.exports = {
    addContent: (userID, content) => {

        let users = fileManager.getUsers();
        
        users[userID].content.push(content);

        fileManager.updateFile(users);

    },
    removeContent: (userID, contentID) => {
        console.log("wip")
    }
}
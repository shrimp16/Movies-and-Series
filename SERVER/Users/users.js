const fileManager = require('./fileManager')
const dbManager = require('../Persistance/dbManager');

module.exports = {
    addContent: (content) => {

        console.log(content);
        dbManager.addContent(content);

        /*let users = fileManager.getUsers();
        
        users[userID].content.push(content);

        fileManager.updateFile(users);*/

    },
    removeContent: (contentID) => {
        
        dbManager.removeContent(contentID);
        
        /*let users = fileManager.getUsers();

        if(contentID === 0){
            users[userID].content.shift();
        }else {
            users[userID].content.splice(contentID, 1);
        }

        fileManager.updateFile(users);*/
    },
    getUserContent: (userID) => {

        return dbManager.getUserContent(userID);
        
    }

}
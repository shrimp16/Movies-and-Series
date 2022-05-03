const dbManager = require('../Persistance/dbManager');

module.exports = {
    addContent: (content) => {

        dbManager.addContent(content);

    },
    removeContent: (contentID) => {
        
        dbManager.removeContent(contentID);

    },
    getUserContent: (userID) => {

        return dbManager.getUserContent(userID);
        
    }

}
CREATE TABLE users (
    userID int AUTO_INCREMENT,
    username VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    PRIMARY KEY(userID)
);

CREATE TABLE profiles (
    userID int UNIQUE,
    picture LONGTEXT,
    description MEDIUMTEXT,
    PRIMARY KEY(userID),
    FOREIGN KEY(userID) REFERENCES users(userID)
);

CREATE TABLE content (
    contentID int AUTO_INCREMENT,
    ownerID int,
    title VARCHAR(255),
    text MEDIUMTEXT,
    rate int,
    image LONGTEXT,
    PRIMARY KEY(contentID),
    FOREIGN KEY(ownerID) REFERENCES users(userID)
);
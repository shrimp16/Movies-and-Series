DROP TABLE comments;
DROP TABLE content;
DROP TABLE profiles;
DROP TABLE users;

CREATE TABLE users (
    userID int AUTO_INCREMENT,
    username VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    PRIMARY KEY(userID)
);

CREATE TABLE profiles (
    userID int UNIQUE,
    picture MEDIUMTEXT,
    banner MEDIUMTEXT,
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
    image MEDIUMTEXT,
    PRIMARY KEY(contentID),
    FOREIGN KEY(ownerID) REFERENCES users(userID)
);

CREATE TABLE comments (
    commentID int AUTO_INCREMENT,
    contentID int,
    ownerID int,
    text MEDIUMTEXT,
    liked boolean,
    PRIMARY KEY(commentID),
    FOREIGN KEY(ownerID) REFERENCES users(userID),
    FOREIGN KEY(contentID) REFERENCES content(contentID)
)
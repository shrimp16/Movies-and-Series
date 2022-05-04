CREATE TABLE users(userID int AUTO_INCREMENT,
username VARCHAR(255) UNIQUE, 
password VARCHAR(255),
userImage VARCHAR(255),
PRIMARY KEY(userID))

CREATE TABLE content(contentID int AUTO_INCREMENT,
title VARCHAR(255),
rate int,
image VARCHAR(255),
ownerID int,
PRIMARY KEY(contentID),
FOREIGN KEY(ownerID) REFERENCES users(userID))

INSERT INTO users SET username = 'user', password = 'pass', picture = "default"
INSERT INTO content SET title = 'Title', rate = 10, image = 'Name of the image', ownerID = 1
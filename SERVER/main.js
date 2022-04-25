const userManager = require('./Users/fileManager')

console.log(userManager.getUserById(0))

const data = {
    username: "user",
    password: "password",
    id: 0,
    content: [
        {
            title: "Fairy Tail",
            rate: 10,
            image: "image dir"
        }
    ]
}
userManager.updateFile(data);


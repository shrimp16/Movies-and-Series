const userManager = require('./Users/fileManager');

const auth = require('./Users/auth');

auth.register("lmao", "xdxd");
console.log(auth.login("lmasdfao", "xdxd"));
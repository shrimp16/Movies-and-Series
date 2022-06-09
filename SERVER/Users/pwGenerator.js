const CHAR = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*()'

let string;

for(let i = 0; i < 14; i++){
    string += CHAR.charAt(Math.floor(Math.random() * CHAR.length));
}

console.log(string);
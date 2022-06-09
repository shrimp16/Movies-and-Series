const CHAR = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*()'

module.exports = {
    generate: () => {
        let characters = CHAR;
        let password;

        for(let i = 0; i < 14; i++){
            let char = characters.charAt(Math.floor(Math.random() * characters.length))
            password += char;
            characters.replace(char, '');
        }

        return password;
    }
}
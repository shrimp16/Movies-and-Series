export default class Register{
    constructor(){
        this.setupElements();
    }

    setupElements() {
        let usernameInput = document.querySelector('#register-un');
        let emailInput = document.querySelector('#register-email');
        let passwordInput = document.querySelector('#register-pw');

        usernameInput.addEventListener('keypress', (e) => {
            if(e.key === "Enter") {
                passwordInput.select();
            }
        })

        passwordInput.addEventListener('keypress', (e) => {
            if(e.key === "Enter") {
                emailInput.select();
            }
        })

        emailInput.addEventListener('keypress', (e) => {
            if(e.key === "Enter"){
                document.getElementById('submit-register').click();
            }
        })

        
    }
}
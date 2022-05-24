export default class Register{
    constructor(){
        this.setupElements();
        document.title = 'My Shows List | Register';
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

        document.getElementById('submit-register').addEventListener('click', () => {

            if(!usernameInput.value){
                alert('Please insert username!');
                return;
            }

            if(!emailInput.value){
                alert('Please insert email!');
                return;
            }

            if(!passwordInput.value){
                alert('Please insert password!');
                return;
            }

            fetch('http://192.168.1.103:50000/register', {
                method: 'POST',
                body: JSON.stringify({
                    'username': usernameInput.value,
                    'email': emailInput.value,
                    'password': passwordInput.value
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            }).then(response => response.text()
                .then((response) => {
                    alert(response);
                    if(response === 'User created with success!'){
                        window.location.href = '/#login';
                    }else {
                        usernameInput.value = '';
                        emailInput.value = '';
                        passwordInput.value = '';
                    }
                }))

        })


    }
}
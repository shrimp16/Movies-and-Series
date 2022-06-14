export default class Register {

    constructor() {
        document.title = 'My Shows List | Register';

        this.body = document.getElementById('body');

        this.loadPage();
    }

    loadPage() {
        let HTML = `
            <div class="register-body">
                <h1 class="register-title">Register</h1>
                <div>
                    <i class="fa-solid fa-user"> Username</i>
                    <input id="register-un" type="text">
                </div>
                <div>
                    <i class="fa-solid fa-envelope"> E-mail</i>
                    <input id="register-email" type="email">
                </div>
                <div>
                    <i class="fa-solid fa-key"> Password</i>
                    <input id="register-pw" type="password">
                </div>

                <p>Already registered? <a href="/#login">Login</a></p>
                <button class="blue-purple-btn" id="submit-register">Register</button>
            </div>
        `

        this.body.innerHTML = HTML;
        this.setupElements();

    }

    setupElements() {

        let usernameInput = document.getElementById('register-un');
        let emailInput = document.getElementById('register-email');
        let passwordInput = document.getElementById('register-pw');

        usernameInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                emailInput.select();
            }
        })

        emailInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                passwordInput.select();
            }
        })

        passwordInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                document.getElementById('submit-register').click();
            }
        })

        document.getElementById('submit-register').addEventListener('click', () => {

            if (!usernameInput.value) {
                alert('Please insert username!');
                return;
            }

            if (!emailInput.value) {
                alert('Please insert email!');
                return;
            }

            if (!passwordInput.value) {
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
                    if (response === 'User created with success!') {
                        window.location.href = '/#login';
                    } else {
                        usernameInput.value = '';
                        emailInput.value = '';
                        passwordInput.value = '';
                    }
                }))

        })
    }

}
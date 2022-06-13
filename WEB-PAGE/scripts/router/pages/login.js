export default class Login {

    constructor() {
        document.title = 'My Shows List | Login';

        this.body = document.getElementById('body');

        this.loadPage();
    }

    loadPage() {
        let HTML = `
            <div class="login-body">
                <h1 class="login-title">Login</h1>
                <div>
                    <i class="fa-solid fa-user"> Username or E-mail</i>
                    <input id="login-un" type="text">
                </div>
                <div>
                    <i class="fa-solid fa-key"> Password</i>
                    <input id="login-pw" type="password">
                </div>
                <a href="/#recovery">Forgot password?</a>
                <p>No account? <a href="/#register">Register</a></p>
                <p>Keep logged in? <input type="checkbox" id="save-user"></p>
                <button class="blue-purple-btn" id="submit-login">Login</button>
            </div>
        `

        this.body.innerHTML = HTML;
        this.setupElements();
    }

    setupElements() {
        console.log("xd");
        let usernameInput = document.getElementById('login-un');
        let passwordInput = document.getElementById('login-pw');

        usernameInput.addEventListener('keypress', (e) => {

            if (e.key === 'Enter') {
                passwordInput.select();
            }

        })

        passwordInput.addEventListener('keypress', (e) => {

            if (e.key === 'Enter') {
                document.getElementById('submit-login').click()
            }

        })

        document.getElementById('submit-login').addEventListener('click', () => {

            if (!usernameInput.value) {
                alert('Please insert username!')
                return;
            }

            if (!passwordInput.value) {
                alert('Please insert password!');
                return;
            }

            fetch('http://192.168.1.103:50000/login', {
                method: 'POST',
                body: JSON.stringify({
                    'username': usernameInput.value,
                    'password': passwordInput.value
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            }).then(response => response.text()
                .then((response) => {

                    let id = parseInt(response);

                    if (!isNaN(id)) {
                        this.success(id, usernameInput.value);
                    } else {
                        alert(response);
                    }

                }))
        })
    }

    success(id, username) {

        document.getElementById('auth-btn').innerHTML = username;

        if (document.querySelector('#save-user').checked) {
            localStorage.setItem('username', username);
            localStorage.setItem('userID', id);
        } else {
            sessionStorage.setItem('username', username);
            sessionStorage.setItem('userID', id);
        }
        window.location.hash = `profile?id=${localStorage.userID || sessionStorage.userID}`;
        window.location.reload();

    }

}
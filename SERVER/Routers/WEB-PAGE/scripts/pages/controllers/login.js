export default class Login {
    constructor() {
        this.setupElements();
    }

    setupElements() {
        let usernameInput = document.querySelector('#login-un');
        let passwordInput = document.querySelector('#login-pw');

        usernameInput.addEventListener('keypress', (e) => {
            if (e.key === "Enter") {
                passwordInput.select();
            }
        })

        passwordInput.addEventListener('keypress', (e) => {
            if (e.key === "Enter") {
                document.getElementById('submit-login').click();
            }
        })

        document.getElementById('submit-login').addEventListener('click', () => {


            if (!usernameInput.value) {
                alert("Please insert username!");
                return;
            }

            if (!passwordInput.value) {
                alert("Please insert password!");
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
                        this.success(id, document.querySelector('#login-un').value);
                    } else {
                        alert(response);
                    }

                }))
        })
    }

    success(id, username) {
        document.querySelector('#auth-btn').innerHTML = username;

        if (document.querySelector('#save-user').checked) {
            localStorage.setItem('username', username);
            localStorage.setItem('userID', id);
        } else {
            sessionStorage.setItem('username', username);
            sessionStorage.setItem('userID', id);
        }
        window.location.href = '/#';
        window.location.reload();
    }
}
export default class Login {
    constructor() {
        this.body = document.querySelector('#body');
        this.body.innerHTML = '';
        this.loadPage();
    }

    async loadPage() {
        await fetch('/scripts/pages/structures/login.html')
            .then(response => response.text()
                .then((response) => {
                    this.body.innerHTML = response;
                    this.preparePage();
                }))
    }

    preparePage() {
        document.getElementById('submit-login').addEventListener('click', () => {
            fetch('http://192.168.1.103:50000/login', {
                method: 'POST',
                body: JSON.stringify({
                    'username': document.querySelector('#login-un').value,
                    'password': document.querySelector('#login-pw').value
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            }).then(response => response.text()
                .then((response) => {

                    let id = parseInt(response);

                    if(!isNaN(id)){
                        this.success(id, document.querySelector('#login-un').value);
                    }else {
                        alert(response);
                    }

                }))
        })
    }

    success(id, username){
        document.querySelector('#auth-btn').innerHTML = username;

        if(document.querySelector('#save-user').checked){
            localStorage.setItem('username', username);
            localStorage.setItem('userID', id);
        }else {
            sessionStorage.setItem('username', username);
            sessionStorage.setItem('userID', id);
        }
        window.location.href = '/#';
        window.location.reload();
    }
}
export default class PasswordChanger {
    constructor(){
        this.passwordInput = document.getElementById('new-password-input');
        this.id = sessionStorage.getItem('userID') || localStorage.getItem('userID');
        this.setupElements();
    }

    setupElements(){
        console.log(this.id);
        document.getElementById('submit-new-password').addEventListener('click', () => {
            fetch(`http://192.168.1.103:50000/change-password/${this.id}`, {
                method: 'POST',
                body: JSON.stringify({
                    password: this.passwordInput.value
                })
            })
            .then(response => response.text()
            .then((response) => {
                console.log(response);
            }))
        })
    }
}
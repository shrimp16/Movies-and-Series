export default class PasswordChanger {
    constructor(){
        this.passwordInput = document.getElementById('new-password-input');
        this.id = sessionStorage.getItem('userID') || localStorage.getItem('userID');
        this.setupElements();
    }

    setupElements(){

        this.passwordInput.addEventListener('keypress', (e) => {
            if(e.key === 'Enter'){
                document.getElementById('submit-new-password').click();
            }
        })
        console.log(this.id);
        document.getElementById('submit-new-password').addEventListener('click', () => {
            fetch(`http://192.168.1.103:50000/change-password/${this.id}`, {
                method: 'POST',
                body: JSON.stringify({
                    'password': this.passwordInput.value
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            })
            .then(response => response.text()
            .then((response) => {
                window.location.hash = `profile?id=${this.id}`
                alert(response);
            }))
        })
    }
}
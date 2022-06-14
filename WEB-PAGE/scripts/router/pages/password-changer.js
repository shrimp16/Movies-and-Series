export default class PasswordChanger {
    constructor(){

        this.body = document.getElementById('body');

        this.id = sessionStorage.getItem('userID') || localStorage.getItem('userID');

        this.loadPage();
    
    }

    loadPage() {
        let HTML = `
            <div class="password-changer-body">
                <h1 class="password-changer-title">Change Password</h1>
                <div>
                    <i class="fa-solid fa-key"> New Password</i>
                    <br>
                    <input type="password" id="new-password-input">
                </div>
                <button class="blue-purple-btn" id="submit-new-password">Submit</button>
            </div>
        `

        this.body.innerHTML = HTML;

        this.setupElements();
    }

    setupElements(){

        this.passwordInput = document.getElementById('new-password-input');

        this.passwordInput.addEventListener('keypress', (e) => {
            if(e.key === 'Enter'){
                document.getElementById('submit-new-password').click();
            }
        })

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
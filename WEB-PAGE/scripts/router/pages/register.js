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
    }

}
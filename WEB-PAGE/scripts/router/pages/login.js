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
    }
}
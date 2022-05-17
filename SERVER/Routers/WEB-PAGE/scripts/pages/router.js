import Login from './controllers/login.js';
import Register from './controllers/register.js';

export default class Router {

    constructor() {
        window.addEventListener('hashchange', () => {
            this.routeChangeHandler();
        })
        this.body = document.querySelector('#body');
        this.routeChangeHandler();
    }

    async routeChangeHandler() {
        const hash = window.location.hash.substring(1);
        this.body.innerHTML = '';

        switch (hash) {
            case '':
                //home page
                break;
            case 'login':
                await this.loadPage('login');
                new Login();
                break;
            case 'register':
                await this.loadPage('register');
                new Register();
                break;
            case 'recovery':
                await this.loadPage('recovery');
                break;
            default:
                await this.loadPage('404');
        }
    }

    async loadPage(page) {
        await fetch(`/scripts/pages/structures/${page}.html`)
            .then(response => response.text()
                .then((response) => {
                    this.body.innerHTML = response;
                }))
    }
}
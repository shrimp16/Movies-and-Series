import Login from "./controllers/login.js";

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
                //register page
                break;
            case 'recovery':
                //recovery page
                break;
            default:
                //404 page
        }
    }

    async loadPage(page) {
        await fetch(`/scripts/pages/structures/${page}.html`)
            .then(response => response.text()
                .then((response) => {
                    this.body.innerHTML = response;
                    console.log("xd");
                }))
    }
}
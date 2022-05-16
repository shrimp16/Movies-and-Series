export default class Router {

    constructor() {
        window.addEventListener('hashchange', () => {
            this.routeChangeHandler();
        })
        this.body = document.querySelector('#body');
        this.routeChangeHandler();
    }

    routeChangeHandler() {
        const hash = window.location.hash.substring(1);
        this.body.innerHTML = '';

        switch (hash) {
            case '':
                //home page
                break;
            case 'login':
                //login page
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
}
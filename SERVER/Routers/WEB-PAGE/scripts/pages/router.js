import Register from './controllers/register.js';
import NotFound from './controllers/404.js';
import Profile from './controllers/profiles.js';
import ProfileEditor from './controllers/profile-editor.js';

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
        const hashArr = Array.from(hash.split('/'));

        console.log(hashArr);

        this.body.innerHTML = '';

        await this.loadPage(hash);

        const loader = await import(`./controllers/${hash}.js`);
        new loader.default();
    }

    async loadPage(page) {
        await fetch(`/scripts/pages/structures/${page}.html`)
            .then(response => response.text()
                .then((response) => {
                    this.body.innerHTML = response;
                }))
    }
}
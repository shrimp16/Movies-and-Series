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

        /*switch (hashArr[0]) {
            case '':
                //home page
                break;
            case 'login':
                await this.loadPage('login');
                const loader = await import('./controllers/login.js');
                new loader.default();
                /*import('./controllers/login.js')
                .then((loader) => {
                    new loader.default();
                })
                break;
            case 'register':
                await this.loadPage('register');
                new Register();
                break;
            case 'recovery':
                await this.loadPage('recovery');
                break;
            case 'profile':
                await this.loadPage('profile');
                new Profile(hashArr[1]);
                break;
            case 'show-creator':
                await this.loadPage('show-creator');
                break;
            case 'profile-editor':
                await this.loadPage('profile-editor');
                new ProfileEditor();
                break;
            default:
                await this.loadPage('404');
                new NotFound();
        }*/
    }

    async loadPage(page) {
        await fetch(`/scripts/pages/structures/${page}.html`)
            .then(response => response.text()
                .then((response) => {
                    this.body.innerHTML = response;
                }))
    }
}
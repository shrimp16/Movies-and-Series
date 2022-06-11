const pages = [
    'home',
    'login',
    'register',
    'recovery',
    'profile',
    'profile-editor',
    'show-creator',
    'password-changer'
]

export default class Router {

    constructor() {
        window.addEventListener('hashchange', () => {
            this.routeChangeHandler();
        })
        this.body = document.querySelector('#body');
        this.routeChangeHandler();
    }

    async routeChangeHandler() {
        console.time();
        let hash = window.location.hash.substring(1);
        hash = hash.split('?', hash.length - 1)[0];
        console.log(hash);

        if(hash === ''){
            hash = 'home';
        }

        this.body.innerHTML = '';

        const exists = pages.find(e => {
            if(e === hash){
                return true;
            }
        })

        if(!exists){
            hash = '404';
        }

        const loader = await import(`./pages/${hash}.js`);

        new loader.default();
    }
}
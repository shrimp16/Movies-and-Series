export default class NotFound {

    constructor() {

        this.body = document.getElementById('body');

        this.loadPage();

    }

    loadPage() {
        let HTML = `
            <div class="not-found">
                <h1>404</h1>
                <h2>NOT FOUND</h2>
            </div>
        `

        this.body.innerHTML = HTML;
    }

}
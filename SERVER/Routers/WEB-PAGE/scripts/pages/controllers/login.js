export default class Login {
    constructor() {
        this.body = document.querySelector('#body');
        this.body.innerHTML = '';
        this.loadPage();
    }

    async loadPage() {
        await fetch('/scripts/pages/structures/login.html')
            .then(response => response.text()
                .then((response) => {
                    this.body.innerHTML = response;
                    this.preparePage();
                }))
    }

    preparePage(){
        document.getElementById('submit-login').addEventListener('click', () => {
            alert("xdxd")
        })
    }
}
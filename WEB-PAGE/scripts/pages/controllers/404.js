export default class NotFound {
    constructor() {
        this.setupElements();
        document.title = 'My Shows List | 404 - Not Found';
    }

    setupElements(){
        document.querySelector('#go-back').addEventListener('click', () => {
            history.back();
        })
    }
}
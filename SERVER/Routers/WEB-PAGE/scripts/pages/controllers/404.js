export default class NotFound {
    constructor() {
        this.setupElements();
    }

    setupElements(){
        document.querySelector('#go-back').addEventListener('click', () => {
            history.back();
        })
    }
}
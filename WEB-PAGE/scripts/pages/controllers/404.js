export default class NotFound {
    constructor() {
        document.title = 'My Shows List | 404 - Not Found';
        setTimeout(() => {
            window.location.hash = '#home';
        }, 5000);
    }
}
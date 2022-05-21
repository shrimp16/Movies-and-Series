export default class ProfileEditor {
    constructor() {
        this.setupListeners();
    }

    setupListeners(){
        document.getElementById('profile-pic-btn').addEventListener('click', () => {
            document.getElementById('profile-pic-input').click();
        })
        document.getElementById('banner-btn').addEventListener('click', () => {
            document.getElementById('banner-input').click();
        })
    }
}
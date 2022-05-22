export default class ProfileEditor {
    constructor() {
        this.setupElements();
    }

    setupElements() {

        document.getElementById('profile-pic-btn').addEventListener('click', () => {
            document.getElementById('profile-pic-input').click();
        })

        document.getElementById('banner-btn').addEventListener('click', () => {
            document.getElementById('banner-input').click();
        })
        
        document.getElementById('profile-pic-input').addEventListener('change', (e) => {
            console.log(document.getElementById('profile-pic-input').files);
            document.getElementById('profile-picture-edit').src = URL.createObjectURL(document.getElementById('profile-pic-input').files[0])
        })

        document.getElementById('banner-input').addEventListener('change', (e) => {
            console.log(document.getElementById('banner-input').files);
            document.getElementById('banner-edit').src = URL.createObjectURL(document.getElementById('banner-input').files[0])
        })
    }
}
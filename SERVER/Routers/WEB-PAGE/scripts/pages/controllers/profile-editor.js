export default class ProfileEditor {
    constructor() {
        this.bannerInput = document.getElementById('banner-input');
        this.profilePicInput = document.getElementById('profile-pic-input');
        this.setupElements();
    }

    setupElements() {

        document.getElementById('profile-pic-btn').addEventListener('click', () => {
            this.profilePicInput.click();
        })

        document.getElementById('banner-btn').addEventListener('click', () => {
            this.bannerInput.click();
        })
        
        document.getElementById('profile-pic-input').addEventListener('change', () => {
            document.getElementById('profile-picture-edit').src = URL.createObjectURL(this.profilePicInput.files[0])
        })

        document.getElementById('banner-input').addEventListener('change', () => {
            document.getElementById('banner-edit').src = URL.createObjectURL(this.bannerInput.files[0])
        })
    }
}
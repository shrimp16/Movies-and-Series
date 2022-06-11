export default class ProfileEditor {
    constructor() {
        this.bannerInput = document.getElementById('banner-input');
        this.profilePicInput = document.getElementById('profile-pic-input');
        this.descriptionInput = document.getElementById('description-input');
        this.setupElements();
        document.title = 'My Shows List | Profile Editor';
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

        document.getElementById('submit-profile-edit').addEventListener('click', () => {

            let formData = new FormData();

            if (this.profilePicInput.files[0] && this.bannerInput.files[0]) {
                formData.append('picture', true);
                formData.append('banner', true);
                formData.append('images', this.profilePicInput.files[0]);
                formData.append('images', this.bannerInput.files[0]);
            }

            if (!this.profilePicInput.files[0] && this.bannerInput.files[0]) {
                formData.append('banner', true);
                formData.append('images', upload2.files[0]);
            }

            if (this.profilePicInput.files[0] && !this.bannerInput.files[0]) {
                formData.append('picture', true);
                formData.append('images', this.profilePicInput.files[0]);
            }

            if (this.descriptionInput.value) {
                formData.append('description', this.descriptionInput.value);
            }

            fetch(`http://192.168.1.103:50000/update-profile/${sessionStorage.userID || localStorage.userID}`, {
                method: 'POST',
                body: formData
            })
                .then(() => {
                    window.location.hash = `profile?id=${sessionStorage.userID || localStorage.userID}`;
                })

        })
    }
}
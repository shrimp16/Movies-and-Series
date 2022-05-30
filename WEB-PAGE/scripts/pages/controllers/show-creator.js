export default class ShowCreator {

    constructor() {

        this.titleInput = document.getElementById('show-creator-title-input');
        this.descriptionInput = document.getElementById('show-creator-description-input');
        this.rateInput = document.getElementById('show-creator-rate-input');
        this.uploadInputBtn = document.getElementById('show-upload-btn');
        this.upload = document.getElementById('show-creator-image-input');

        this.titlePreview = document.getElementById('show-creator-title');
        this.descriptionPreview = document.getElementById('show-creator-description');
        this.ratePreview = document.getElementById('show-creator-rate');
        this.imagePreview = document.getElementById('show-creator-image');

        this.goToEditor = document.getElementById('go-to-editor');
        this.goToPreview = document.getElementById('go-to-preview');
        this.showInputs = document.getElementById('show-inputs');
        this.showPreview = document.getElementById('show-preview');

        this.submit = document.getElementById('create-show');

        this.setupElements();

        document.title = 'My Shows List | Show Creator';
    }

    setupElements() {
        this.uploadInputBtn.addEventListener('click', () => {
            this.upload.click();
        })

        this.titleInput.addEventListener('keydown', () => {

            setTimeout(() => {
                this.titlePreview.innerText = this.titleInput.value;
            }, 1)

        })

        this.descriptionInput.addEventListener('keydown', () => {

            setTimeout(() => {
                this.descriptionPreview.innerText = this.descriptionInput.value;
            }, 1)

        })

        this.rateInput.addEventListener('change', () => {

            setTimeout(() => {
                this.ratePreview.innerText = `${this.rateInput.value}/10`;
            }, 1)

        })

        this.upload.addEventListener('change', () => {
            this.imagePreview.src = URL.createObjectURL(this.upload.files[0]);
        })

        this.goToEditor.addEventListener('click', () => {
            this.showPreview.style.display = 'none';
            this.showInputs.style.display = 'flex';
            this.goToEditor.classList.add('selected');
            this.goToPreview.classList.remove('selected');
        })

        this.goToPreview.addEventListener('click', () => {
            this.showPreview.style.display = 'flex';
            this.showInputs.style.display = 'none';
            this.goToEditor.classList.remove('selected');
            this.goToPreview.classList.add('selected');
        })

        this.submit.addEventListener('click', () => {

            let formData = new FormData();

            formData.append('image', this.upload.files[0]);
            formData.append('ownerID', localStorage.userID || sessionStorage.userID);
            formData.append('title', this.titleInput.value);
            formData.append('text', this.descriptionInput.value);
            formData.append('rate', this.rateInput.value);


            fetch('http://192.168.1.103:50000/add-content', {
                method: 'POST',
                body: formData
            }).then(response => response.text()
                .then((response) => {
                    console.log(response);
                }))
        })
    }
}
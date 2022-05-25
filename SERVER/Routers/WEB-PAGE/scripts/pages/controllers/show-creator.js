export default class ShowCreator{

    constructor(){

        this.titleInput = document.getElementById('show-creator-title-input');
        this.descriptionInput = document.getElementById('show-creator-description-input');
        this.rateInput = document.getElementById('show-creator-rate-input');
        this.uploadInputBtn = document.getElementById('show-upload-btn');
        this.upload = document.getElementById('show-creator-image-input');

        this.titlePreview = document.getElementById('show-creator-title');
        this.descriptionPreview = document.getElementById('show-creator-description');
        this.ratePreview = document.getElementById('show-creator-rate');
        this.imagePreview = document.getElementById('show-creator-image');

        this.setupElements();

        document.title = 'My Shows List | Show Creator';
    }

    setupElements(){
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
    }
}
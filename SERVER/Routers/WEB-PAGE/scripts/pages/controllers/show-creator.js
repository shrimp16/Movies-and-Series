export default class ShowCreator{

    constructor(){
        this.titleInput = document.getElementById('show-creator-title-input');
        this.descriptionInput = document.getElementById('show-creator-description-input');
        this.rateInput = document.getElementById('show-creator-rate-input');
        this.uploadInputBtn = document.getElementById('show-upload-btn');
        this.upload = document.getElementById('show-creator-image-input');
        this.setupElements();

        this.show = {};
        document.title = 'My Shows List | Show Creator';
    }

    setupElements(){
        this.uploadInputBtn.addEventListener('click', () => {
            this.upload.click();
        })

        this.titleInput.addEventListener('keydown', (e) => {

            if(e.key === 'Enter'){
                console.log("xdxd");
            }
            setTimeout(() => {
                this.show.title = this.titleInput.value;
                console.log(this.show);
            }, 1)
        })
    }
}
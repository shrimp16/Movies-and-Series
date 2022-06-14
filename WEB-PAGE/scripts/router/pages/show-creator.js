export default class ShowCreator {

    constructor() {

        document.title = 'My Shows List | Show Creator';

        this.body = document.getElementById('body');
        this.loadPage();
    }

    loadPage() {

        let HTML = `
        <div class="show-creator-swap-panel">
            <a id="go-to-editor" class="go-to-editor selected">Editor</a>
            <a id="go-to-preview" class="go-to-preview">Preview</a>
        </div>
    
        <div class="show-creater-body">
            <div id="show-inputs" class="show-inputs">
                <p>Title</p>
                <input type="text" id="show-creator-title-input">
                <p>Description</p>
                <textarea name="" id="show-creator-description-input" class="desc-input" cols="30" rows="10"></textarea>
                <p>Rate</p>
                <input type="number" min="0" max="10" class="rate-input" id="show-creator-rate-input">
                <p>Image</p>
                <button id="show-upload-btn" class="blue-purple-btn">Upload</button>
                <input type="file" name="" id="show-creator-image-input">
            </div>
            <div id="show-preview" class="show-preview">
                <h1 id="show-creator-title">Title</h1>
                <h2 id="show-creator-description" class="desc-preview">Description</h2>
                <p id="show-creator-rate">0/10</p>
                <img id="show-creator-image">
            </div>
        </div>
        <br>
        <button class="blue-purple-btn show-creator-submit" id="create-show">Submit</button>
        <br>
    `

        this.body.innerHTML = HTML;

        this.setupElements();

    }

    setupElements() {

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
                    window.location.hash = `profile?id=${localStorage.userID || sessionStorage.userID}`;
                }))
        })
    }
}

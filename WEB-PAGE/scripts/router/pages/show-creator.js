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

    }
}
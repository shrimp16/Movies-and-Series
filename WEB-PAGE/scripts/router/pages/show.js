let showData = {};
let showComments;

export default class Show {

    constructor() {
        this.body = document.getElementById('body');

        this.url = window.location.href;

        const [hash, query] = this.url.split('#')[1].split('?');
        this.params = Object.fromEntries(new URLSearchParams(query));

        this.id = this.params.id;
        console.log(this.id);

        this.getData(this.id);
    }

    async getData(id) {

        await fetch(`http://192.168.1.103:50000/content/${id}`)
            .then(async (response) => {
                if (response.status === 404) {
                    window.location.hash = '404';
                    return;
                }
                await response.json()
                    .then(async (response) => {
                        showData.title = response[0].title;
                        showData.description = response[0].text;
                        showData.rate = response[0].rate;

                        await fetch(`http://192.168.1.103:50000/image/${response[0].image}`)
                            .then(image => image.blob()
                                .then((image) => {
                                    showData.image = URL.createObjectURL(image);
                                }))
                    })
            })
        await fetch(`http://192.168.1.103:50000/get-comments/${id}`)
            .then(response => response.json()
                .then((response) => {
                    showComments = response;
                }))
        console.table(showData);
        console.table(showComments);
        this.loadPage();
    }

    loadPage() {
        let HTML = `
            <div class="show-body">
                <div class="show-image">
                    <img src="${showData.image}">
                </div>

                <div class="show-contents">
                    <div class="show-details">
                        <p class="show-title">Title: ${showData.title}</p>
                        <p class="show-rate">Rate: ${showData.rate}/10</p>
                        <p class="show-description">Description: ${showData.description}</p>
                    </div>

                    <div class="bar"></div>

                    <div class="show-comments" id="comments-view">
                        <div class="no-comment">
                            <p>No comments yet!</p>
                            <svg width="32" height="32" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                <path d="M4.285 12.433a.5.5 0 0 0 .683-.183A3.498 3.498 0 0 1 8 10.5c1.295 0 2.426.703 3.032 1.75a.5.5 0 0 0 .866-.5A4.498 4.498 0 0 0 8 9.5a4.5 4.5 0 0 0-3.898 2.25.5.5 0 0 0 .183.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z"/>
                            </svg>
                        </div>
                        <div class="comment">
                            <img src="../../images/default-user-image.png">
                            <p>This is a very nice very good comment omg this nees to be a lot bigger now omg wow wtf lol lmao xd xd xd </p>
                        </div>
                        <div class="comment">
                            <img src="../../images/default-user-image.png">
                            <p>This is a very nice very good comment omg this nees to be a lot bigger now omg wow wtf lol lmao xd xd xd </p>
                        </div>
                        <div class="comment">
                            <img src="../../images/default-user-image.png">
                            <p>This is a very nice very good comment omg this nees to be a lot bigger now omg wow wtf lol lmao xd xd xd </p>
                        </div>
                        <div class="comment">
                            <img src="../../images/default-user-image.png">
                            <p>This is a very nice very good comment omg this nees to be a lot bigger now omg wow wtf lol lmao xd xd xd </p>
                        </div>
                        <div class="comment">
                            <img src="../../images/default-user-image.png">
                            <p>This is a very nice very good comment omg this nees to be a lot bigger now omg wow wtf lol lmao xd xd xd </p>
                        </div>
                        <div class="comment">
                            <img src="../../images/default-user-image.png">
                            <p>This is a very nice very good comment omg this nees to be a lot bigger now omg wow wtf lol lmao xd xd xd </p>
                        </div>
                        <div class="comment">
                            <img src="../../images/default-user-image.png">
                            <p>This is a very nice very good comment omg this nees to be a lot bigger now omg wow wtf lol lmao xd xd xd </p>
                        </div>
                        <div class="comment">
                            <img src="../../images/default-user-image.png">
                            <p>This is a very nice very good comment omg this nees to be a lot bigger now omg wow wtf lol lmao xd xd xd </p>
                        </div>
                        <div class="comment">
                            <img src="../../images/default-user-image.png">
                            <p>This is a very nice very good comment omg this nees to be a lot bigger now omg wow wtf lol lmao xd xd xd </p>
                        </div>
                        <div class="comment">
                            <img src="../../images/default-user-image.png">
                            <p>This is a very nice very good comment omg this nees to be a lot bigger now omg wow wtf lol lmao xd xd xd </p>
                        </div>
                        <div class="comment">
                            <img src="../../images/default-user-image.png">
                            <p>This is a very nice very good comment omg this nees to be a lot bigger now omg wow wtf lol lmao xd xd xd </p>
                        </div>
                        <div class="comment">
                            <img src="../../images/default-user-image.png">
                            <p>This is a very nice very good comment omg this nees to be a lot bigger now omg wow wtf lol lmao xd xd xd </p>
                        </div>
                        <div class="comment">
                            <img src="../../images/default-user-image.png">
                            <p>This is a very nice very good comment omg this nees to be a lot bigger now omg wow wtf lol lmao xd xd xd </p>
                        </div>
                        <div class="comment">
                            <img src="../../images/default-user-image.png">
                            <p>This is a very nice very good comment omg this nees to be a lot bigger now omg wow wtf lol lmao xd xd xd </p>
                        </div>
                        <div class="white-space"></div>
                        <div class="create-comment">
                            <img src="../../images/default-user-image.png">
                            <textarea class="write-comment" rows="3" cols="50"></textarea>
                        </div>
                    </div>
                </div>

            </div>
        `

        this.body.innerHTML = HTML;
    }

    loadComments(){
        let commentsView = document.getElementById('comments-view');
    }

}
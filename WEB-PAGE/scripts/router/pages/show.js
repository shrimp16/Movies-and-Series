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
        console.log(showComments);
        this.loadPage();
        this.loadComments();
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
                        <div class="comment">
                            <img src="../../images/default-user-image.png">
                            <p>This is how a liked comment is supposed to look like </p>
                            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 16 16" fill="red">
                                <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                            </svg>
                        </div>
                        <div class="comment">
                            <img src="../../images/default-user-image.png">
                            <p>This is how a not liked comment is supposed to look like</p>
                            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 16 16">
                                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                            </svg>
                        </div>
                        <div class="comment">
                            <img src="../../images/default-user-image.png">
                            <p>This is how a not liked comment is supposed to look like to the outside</p>
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

    loadComments() {
        let commentsView = document.getElementById('comments-view');
        let HTML = '';

        if (showComments.length === 0) {
            HTML += `
            <div class="no-comment">
                <p>No comments yet!</p>
                    <svg width="32" height="32" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                        <path d="M4.285 12.433a.5.5 0 0 0 .683-.183A3.498 3.498 0 0 1 8 10.5c1.295 0 2.426.703 3.032 1.75a.5.5 0 0 0 .866-.5A4.498 4.498 0 0 0 8 9.5a4.5 4.5 0 0 0-3.898 2.25.5.5 0 0 0 .183.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z"/>
                    </svg>
            </div>
            `
        } else {

            for (let i = 0; i < showComments.length; i++) {
                HTML += `
                <div class="comment">
                    <img src="../../images/default-user-image.png">
                    <p>${showComments[i].text}</p>
                </div>
                `
            }

        }

        HTML += `
        <div class="white-space"></div>
        <div class="create-comment">
            <img src="../../images/default-user-image.png">
            <textarea class="write-comment" rows="3" cols="50"></textarea>
        </div>
        `

        commentsView.innerHTML = HTML;

    }

}
import CardsLoader from '../../components/cardsLoader.js';

const cardsLoader = new CardsLoader();

let userData = {};

export default class Profile {

    constructor() {

        this.body = document.getElementById('body');

        this.url = window.location.href;

        const [hash, query] = this.url.split('#')[1].split('?');
        this.params = Object.fromEntries(new URLSearchParams(query));

        this.id = this.params.id;

        this.getUserData(this.id);
        cardsLoader.getCards(this.id);

    }

    async getUserData(id) {

        await fetch(`http://192.168.1.103:50000/user-profile/${id}`)
            .then(async (response) => {
                if (response.status === 404) {
                    window.location.hash = '404';
                    return;
                }
                await response.json()
                    .then(async (response) => {
                        userData.id = id;
                        userData.username = response.username;
                        userData.description = response.description;

                        await fetch(`http://192.168.1.103:50000/image/${response.picture}`)
                            .then(image => image.blob()
                                .then((image) => {
                                    userData.picture = URL.createObjectURL(image);
                                }))
                        await fetch(`http://192.168.1.103:50000/image/${response.banner}`)
                            .then(image => image.blob()
                                .then((image) => {
                                    userData.banner = URL.createObjectURL(image);
                                }))

                    })
            })

        this.loadProfileHeader();
        cardsLoader.loadCards();

    }

    async debugImage(img, id) {
        await fetch(`http://192.168.1.103:50000/image/${img}`)
            .then(image => image.blob()
                .then((image) => {
                    cards[id].image = URL.createObjectURL(image);
                }))
    }

    loadProfileHeader() {
        let HTML = `
        <div class="profile-header" id="profile-header">
            <div class="background">
                <img id="profile-banner" src="${userData.banner}">
            </div>
            <div class="profile-picture">
                <img id="profile-picture" src="${userData.picture}">
            </div>
            <div class="user-info">
                <h1 id="username">${userData.username}</h1>
                <h2 id="description">${userData.description}</h2>
            </div>
            <br>
        `
        if (this.id === localStorage.getItem('userID') || this.id === sessionStorage.getItem('userID')) {
            HTML += `
            <div class="user-profile-panel">
                <button class="blue-purple-btn" id="new-show">New Show</button>
                <button class="blue-purple-btn" id="edit-profile">Edit Profile</button>
                <button class="blue-purple-btn" id="log-out">Log out</button>
            </div>
            `;
        }

        HTML += `
            <div class="dropdown">
                <button class="dropbtn">Sort By</button>
                <div class="dropdown-content">
                    <a id="title">Title</a>
                    <a id="older">Older First</a>
                    <a id="newer">Newer First</a>
                    <a id="rate">Rate</a>
                </div>
            </div>
        </div>
        <div class="profile-body" id="cards-body"></div>
        `
        this.body.innerHTML = HTML;
    }
}
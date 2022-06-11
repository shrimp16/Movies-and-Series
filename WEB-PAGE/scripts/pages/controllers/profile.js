import Sorter from '../../components/sorter.js';

const sorter = new Sorter();

let userData = {};
let cards;

export default class Profile {

    constructor() {

        this.body = document.getElementById('body');

        this.url = window.location.href;

        const [hash, query] = this.url.split('#')[1].split('?');
        this.params = Object.fromEntries(new URLSearchParams(query));

        this.id = this.params.id;

        this.getUserData(this.id);
        this.getCards(this.id);
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
        this.loadProfileBody();

    }

    async getCards(id) {
        let cont = 0;
        await fetch(`http://192.168.1.103:50000/user-content/${id}`)
            .then(response => response.json()
                .then(async (shows) => {
                    cards = shows;
                    for await (const show of shows) {
                        fetch(`http://192.168.1.103:50000/image/${show.image}`)
                            .then(image => image.blob()
                                .then((image) => {
                                    cards[cont].image = URL.createObjectURL(image);
                                    cont++;
                                }))
                    }
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
        <div class="profile-body" id="profile-body"></div>
        `
        this.body.innerHTML = HTML;
    }

    loadProfileBody() {
        let HTML = '';

        for (let i = 0; i < cards.length; i++) {
            HTML += `
                <div class="card">
                    <img src="${cards[i].image}">
                    <div class="card-title">
                        ${cards[i].title}
                    </div>
                </div>
            `
        }

        document.getElementById('profile-body').innerHTML = HTML;

        this.loadEventListeners();
    }

    loadEventListeners(){

        document.getElementById('title').addEventListener('click', () => {
            cards = sorter.sort(cards, 'title');
            this.loadProfileBody();
        })

        document.getElementById('older').addEventListener('click', () => {
            cards = sorter.sort(cards, 'contentID');
            this.loadProfileBody();
        })

        document.getElementById('newer').addEventListener('click', () => {
            cards = sorter.sortReverse(cards, 'contentID');
            this.loadProfileBody();
        })

        document.getElementById('rate').addEventListener('click', () => {
            cards = sorter.sortReverse(cards, 'rate');
            this.loadProfileBody();
        })

    }
}
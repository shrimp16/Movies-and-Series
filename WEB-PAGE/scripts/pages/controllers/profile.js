import Sorter from '../../components/sorter.js';

const sorter = new Sorter();

let cards = [];

export default class Profile {
    constructor() {
        this.body = document.querySelector('#profile-body')
        this.hash = window.location.hash;

        this.url = window.location.href;

        const [hash, query] = this.url.split('#')[1].split('?');
        this.params = Object.fromEntries(new URLSearchParams(query));

        this.id = this.params.id;

        this.verifyProfile();
        document.title = 'My Shows List | Profile ';
    }

    verifyProfile() {
        if (this.id === localStorage.getItem('userID') || this.id === sessionStorage.getItem('userID')) {
            this.loadOwnProfile();
        }
        this.loadProfileHeader();
        this.loadProfileBody();
    }

    async loadProfileHeader() {
        await fetch(`http://192.168.1.103:50000/user-profile/${this.id}`)
            .then(response => response.json()
                .then(async (response) => {
                    console.log(response);
                    document.title = `My Shows List | Profile - ${response.username}`;
                    document.getElementById('username').innerText = response.username;
                    document.getElementById('description').innerText = response.description;
                    await fetch(`http://192.168.1.103:50000/image/${response.picture}`)
                        .then(image => image.blob()
                            .then((image) => {
                                document.getElementById('profile-picture').src = URL.createObjectURL(image);
                            }))
                    await fetch(`http://192.168.1.103:50000/image/${response.banner}`)
                        .then(image => image.blob()
                            .then((image) => {
                                document.getElementById('profile-banner').src = URL.createObjectURL(image);
                            }))
                })
                .catch((err) => {
                    window.location.hash = '404';
                }))

        document.getElementById('title').addEventListener('click', () => {
            this.loadCards(sorter.sort(cards, 'title'));
        })

        document.getElementById('older').addEventListener('click', () => {
            this.loadCards(sorter.sort(cards, 'contentID'));
        })

        document.getElementById('newer').addEventListener('click', () => {
            this.loadCards(sorter.sortReverse(cards, 'contentID'));
        })

        document.getElementById('rate').addEventListener('click', () => {
            this.loadCards(sorter.sortReverse(cards, 'rate'));
        })
    }

    async loadProfileBody() {
        let cont = 0;
        await fetch(`http://192.168.1.103:50000/user-content/${this.id}`)
            .then(response => response.json()
                .then(async (response) => {
                    cards = response;
                    for await (const show of response) {
                        fetch(`http://192.168.1.103:50000/image/${show.image}`)
                            .then(image => image.blob())
                            .then((image) => {
                                cards[cont].blob = image;
                                this.createCard(cards[cont].blob, show.title);
                                cont++;
                            })
                    }
                }))
    }

    loadOwnProfile() {
        const HTML = `<div class="user-profile-panel">
        <button class="blue-purple-btn" id="new-show">New Show</button>
        <button class="blue-purple-btn" id="edit-profile">Edit Profile</button>
        <button class="blue-purple-btn" id="log-out">Log out</button>
        </div>`;
        document.getElementById('profile-header').innerHTML = document.getElementById('profile-header').innerHTML + HTML;

        document.getElementById('new-show').addEventListener('click', () => {
            window.location.href = '/#show-creator';
        })

        document.getElementById('edit-profile').addEventListener('click', () => {
            window.location.href = '/#profile-editor';
        })

        document.getElementById('log-out').addEventListener('click', () => {
            sessionStorage.clear();
            localStorage.clear();
            window.location.href = '/#login';
            window.location.reload();
        })
    }

    loadCards(cards) {
        this.body.innerHTML = '';
        for (let i = 0; i < cards.length; i++) {
            this.createCard(cards[i].blob, cards[i].title);
        }
    }

    createCard(imageSrc, title) {
        let newCard = document.createElement('div');
        newCard.classList.add('card');

        let img = new Image();
        img.src = URL.createObjectURL(imageSrc);

        let cardText = document.createElement('div');
        cardText.classList.add('card-title');
        cardText.innerText = title;

        newCard.appendChild(img);
        newCard.appendChild(cardText);

        this.appendCard(newCard);
    }

    appendCard(card) {
        this.body.appendChild(card);
    }
}
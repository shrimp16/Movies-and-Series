import Sorter from '../../components/sorter.js';
import CardsLoader from '../../components/cardsLoader.js';

const sorter = new Sorter();

let cards = [];

export default class Profile {
    constructor() {
        this.body = document.querySelector('#profile-body')
        this.hash = window.location.hash;
        this.cardsLoader = new CardsLoader();

        this.url = window.location.href;

        const [hash, query] = this.url.split('#')[1].split('?');
        this.params = Object.fromEntries(new URLSearchParams(query));

        this.id = this.params.id;

        this.verifyProfile();
        document.title = 'My Shows List | Profile ';
    }

    async verifyProfile() {
        if (this.id === localStorage.getItem('userID') || this.id === sessionStorage.getItem('userID')) {
            this.loadOwnProfile();
        }
        this.loadProfileHeader();

        this.cardsLoader.getCardsFromServer(this.id);
    }

    async loadProfileHeader() {
        await fetch(`http://192.168.1.103:50000/user-profile/${this.id}`)
            .then((response) => {
                if (response.status === 404) {
                    window.location.hash = '404';
                    return;
                }
                response.json()
                    .then(async (response) => {
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

                document.getElementById('title').addEventListener('click', () => {
                    this.cardsLoader.loadCards(sorter.sort(this.cardsLoader.getCards(), 'title'));
                })

                document.getElementById('older').addEventListener('click', () => {
                    this.cardsLoader.loadCards(sorter.sort(this.cardsLoader.getCards(), 'contentID'));
                })

                document.getElementById('newer').addEventListener('click', () => {
                    this.cardsLoader.loadCards(sorter.sortReverse(this.cardsLoader.getCards(), 'contentID'));
                })

                document.getElementById('rate').addEventListener('click', () => {
                    this.cardsLoader.loadCards(sorter.sortReverse(this.cardsLoader.getCards(), 'rate'));
                })
            })
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
}
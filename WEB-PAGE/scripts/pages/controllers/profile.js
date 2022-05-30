export default class Profile {
    constructor() {
        this.body = document.querySelector('#profile-body')
        this.hash = window.location.hash;

        this.url = window.location.href;

        const [hash, query] = this.url.split('#')[1].split('?');
        this.params = Object.fromEntries(new URLSearchParams(query));

        console.log(this.params);

        this.id = this.params.id;

        this.verifyProfile();
        document.title = 'My Shows List | Profile '; // Need to add username here
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
                }))
    }

    async loadProfileBody() {
        await fetch(`http://192.168.1.103:50000/user-content/${this.id}`)
            .then(response => response.json()
                .then(async (response) => {
                    for (let i = 0; i < response.length; i++) {
                        await fetch(`http://192.168.1.103:50000/image/${response[i].image}`)
                            .then(image => image.blob()
                                .then((image) => {
                                    this.createCard(image, response[i].title);
                                }))
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

        this.body.appendChild(newCard);
    }
}
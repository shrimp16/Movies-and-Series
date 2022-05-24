export default class Profile {
    constructor(){
        this.body = document.querySelector('#profile-body')
        this.hash = window.location.hash;
        this.id = Array.from(this.hash.split('/'))[1];
        this.verifyProfile();
        document.title = 'My Shows List | Profile '; // Need to add username here
    }

    verifyProfile() {
        if(this.id === localStorage.getItem('userID') || this.id === sessionStorage.getItem('userID')){
            this.loadOwnProfile();
        }
        this.loadProfile();
    }

    async loadProfile() {
        await fetch(`http://192.168.1.103:50000/user-content/list/${this.id}`)
        .then(response => response.json()
        .then(async (response) => {
            console.log(response);
            for(let i = 0; i < response.length; i++){
                await fetch(`http://192.168.1.103:50000/user-content/${response[i].contentID}`)
                .then(response => response.json()
                .then((response) => {
                    console.log(response);
                    this.createCard(response[0].image, response[0].title);
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

    createCard(imageSrc, title){
        let newCard = document.createElement('div');
        newCard.classList.add('card');

        let img = new Image();
        img.src = `data:image/png;base64,${imageSrc}`;

        let cardText = document.createElement('div');
        cardText.classList.add('card-title');
        cardText.innerText = title;

        newCard.appendChild(img);
        newCard.appendChild(cardText);

        this.body.appendChild(newCard);
    }
}
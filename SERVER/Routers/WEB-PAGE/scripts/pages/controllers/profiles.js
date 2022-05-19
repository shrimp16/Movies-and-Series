export default class Profile {
    constructor(id){
        this.body = document.querySelector('#profile-body')
        this.verifyProfile(id);
    }

    verifyProfile(id) {
        if(id === localStorage.getItem('userID') || id === sessionStorage.getItem('userID')){
            this.loadOwnProfile();
        }
        this.loadProfile(id);
    }

    async loadProfile(id) {
        await fetch(`http://192.168.1.103:50000/user-content/list/${id}`)
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

        /*await fetch('http://192.168.1.103:50000/user-content/2')
        .then(response => response.json()
        .then((response) => {
            console.log(response);
            for(let i = 0; i < response.length; i++){
                this.createCard(response[i].image, response[i].title);
            }
        }))*/
    }

    loadOwnProfile() {
        const HTML = `<div class="user-profile-panel">
        <button class="blue-purple-btn" id="new-show">New Show</button>
        <button class="blue-purple-btn" id="edit-profile">Edit Profile</button>
        <button class="blue-purple-btn" id="log-out">Log out</button>
        </div>`;
        document.getElementById('profile-header').innerHTML = document.getElementById('profile-header').innerHTML + HTML;
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
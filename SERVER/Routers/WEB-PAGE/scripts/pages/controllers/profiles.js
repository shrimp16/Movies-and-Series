export default class Profile {
    constructor(id){
        this.body = document.querySelector('#profile-body')
        this.verifyProfile(id);
    }

    verifyProfile(id) {
        if(id === localStorage.getItem('userID') || id === sessionStorage.getItem('userID')){
            alert('Loading user profile');
            this.loadOwnProfile();
        }else {
            alert('Loading someone else profile');
        }
        this.loadProfile();
    }

    loadProfile() {
        let newCard = document.createElement('div');
        newCard.classList.add('card');

        let img = new Image();
        img.src = 'https://picsum.photos/500?random=1';

        let cardText = document.createElement('div');
        cardText.classList.add('card-title');
        cardText.innerText = 'Lorem ipsum dolot sit.'

        newCard.appendChild(img);
        newCard.appendChild(cardText);

        this.body.appendChild(newCard);

    }


    /*<div class="card">
        <img src="https://picsum.photos/500?random=1" alt="">
        <div class="card-title">
            Lorem ipsum dolor sit.
        </div>
    </div>
    */

    loadOwnProfile() {
        const HTML = `<div class="user-profile-panel">
        <button class="blue-purple-btn" id="new-show">New Show</button>
        <button class="blue-purple-btn" id="edit-profile">Edit Profile</button>
        <button class="blue-purple-btn" id="log-out">Log out</button>
        </div>`;
        document.getElementById('profile-header').innerHTML = document.getElementById('profile-header').innerHTML + HTML;
    }
}
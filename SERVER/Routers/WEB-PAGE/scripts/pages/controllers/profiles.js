export default class Profile {
    constructor(id){
        console.log(id);
        this.verifyProfile(id);
    }

    verifyProfile(id) {
        if(id === localStorage.getItem('userID') || id === sessionStorage.getItem('userID')){
            alert('Loading user profile');
            this.loadOwnProfile();
        }else {
            alert('Loading someone else profile');
        }
    }

    loadProfile() {

    }

    loadOwnProfile() {
        const HTML = `<div class="user-profile-panel">
        <button class="blue-purple-btn" id="new-show">New Show</button>
        <button class="blue-purple-btn" id="edit-profile">Edit Profile</button>
        <button class="blue-purple-btn" id="log-out">Log out</button>
        </div>`;
        document.getElementById('profile-header').innerHTML = document.getElementById('profile-header').innerHTML + HTML;
    }
}
export default class Profile {
    constructor(id){
        console.log(id);
        this.loadProfile(id);
    }

    loadProfile(id) {
        if(id === localStorage.getItem('userID') || id === sessionStorage.getItem('userID')){
            alert('Loading user profile');
        }else {
            alert('Loading someone else profile');
        }
    }

    loadOwnProfile() {

    }

    loadAnyProfile() {
        
    }
}
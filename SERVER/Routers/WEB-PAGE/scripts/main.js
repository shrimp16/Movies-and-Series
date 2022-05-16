import Router from './pages/router.js';

document.body.onload = () => {
    new Router();
    setupUserPanel();
}

function setupUserPanel() {

    let authButton = document.querySelector('#auth-btn');

    if(localStorage.length > 0){
        authButton.innerText = localStorage.getItem('username');
        authButton.addEventListener('click', () => {
            alert('Logged in by local storage');
        })
    }else if(sessionStorage.length > 0){
        authButton.innerText = sessionStorage.getItem('username');
        authButton.addEventListener('click', () => {
            alert('Logged in by session storage');
        })
    }else {
        authButton.addEventListener('click', () => {
            window.location.href = '/#login';
        })
    }
}
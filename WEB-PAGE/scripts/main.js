import Router from './router/router.js'

document.body.onload = () => {
    new Router();
    setupUserPanel();
}

function setupUserPanel() {

    let authButton = document.querySelector('#auth-btn');

    if(localStorage.length > 0){
        authButton.innerText = localStorage.getItem('username');
        authButton.addEventListener('click', () => {
            window.location.href = `/#profile?id=${localStorage.userID}`
        })
    }else if(sessionStorage.length > 0){
        authButton.innerText = sessionStorage.getItem('username');
        authButton.addEventListener('click', () => {
            window.location.href = `/#profile?id=${sessionStorage.userID}`
        })
    }else {
        authButton.addEventListener('click', () => {
            window.location.href = '/#login';
        })
    }
}
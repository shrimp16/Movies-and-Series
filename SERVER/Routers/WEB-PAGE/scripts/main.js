import Router from './pages/router.js';

document.body.onload = () => {
    new Router();
    setupUserPanel();
}

function setupUserPanel() {
    if(localStorage.length > 0){
        document.querySelector('#auth-btn').innerText = localStorage.getItem('username');
        document.querySelector('#auth-btn').addEventListener('click', () => {
            alert('Logged in by local storage');
        })
    }else if(sessionStorage.length > 0){
        document.querySelector('#auth-btn').innerText = sessionStorage.getItem('username');
        document.querySelector('#auth-btn').addEventListener('click', () => {
            alert('Logged in by session storage');
        })
    }else {
        document.querySelector('#auth-btn').addEventListener('click', () => {
            window.location.href = '/#login';
        })
    }
}
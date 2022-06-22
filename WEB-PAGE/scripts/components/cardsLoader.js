import Sorter from './sorter.js';

const sorter = new Sorter();

let cards;

export default class CardsLoader {

    constructor() {
        this.body = document.getElementById('#profile-body');
    }

    async getCards(id) {
        await fetch(`http://192.168.1.103:50000/user-content/${id}`)
            .then(response => response.json()
                .then((shows) => {
                    cards = shows;
                }))
    }

    async loadCards() {
        let HTML = '';

        for (let i = 0; i < cards.length; i++) {

            if (!cards[i].image.includes('blob')) {
                await fetch(`http://192.168.1.103:50000/image/${cards[i].image}`)
                    .then(image => image.blob()
                        .then((image) => {
                            cards[i].image = URL.createObjectURL(image);
                        }))
            }

            HTML += `
                    <div class="card">
                        <img src="${cards[i].image}">
                        <div class="card-title">
                            ${cards[i].title}
                        </div>
                    </div>
                    `
        }

        document.getElementById('cards-body').innerHTML = HTML;

        let cardsElements = document.getElementsByClassName('card');

        for(let i = 0; i < cardsElements.length; i++){
            cardsElements[i].addEventListener('click', () => {
                window.location.href = `/#show?id=${cards[i].contentID}`;
            })
        }

        this.loadSorter();

    }

    loadSorter() {

        document.getElementById('title').addEventListener('click', () => {
            cards = sorter.sort(cards, 'title');
            this.loadCards();
        })

        document.getElementById('older').addEventListener('click', () => {
            cards = sorter.sort(cards, 'contentID');
            this.loadCards();
        })

        document.getElementById('newer').addEventListener('click', () => {
            cards = sorter.sortReverse(cards, 'contentID');
            this.loadCards();
        })

        document.getElementById('rate').addEventListener('click', () => {
            cards = sorter.sortReverse(cards, 'rate');
            this.loadCards();
        })

    }

}
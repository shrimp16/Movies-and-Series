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

            await fetch(`http://192.168.1.103:50000/image/${cards[i].image}`)
                .then(image => image.blob()
                    .then((image) => {
                        cards[i].image = URL.createObjectURL(image);
                    }))

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

    }

}

/*let cards = [];

export default class CardsLoader{

    constructor(){
        this.body = document.querySelector('#profile-body');
    }

    async getCardsFromServer(id){
        let cont = 0;
        await fetch(`http://192.168.1.103:50000/user-content/${id}`)
            .then(response => response.json()
                .then(async (shows) => {
                    cards = shows;
                    for await (const show of shows) {
                        fetch(`http://192.168.1.103:50000/image/${show.image}`)
                            .then(image => image.blob())
                            .then((image) => {
                                cards[cont].blob = image;
                                this.createCard(cards[cont].blob, show.title);
                                cont++;
                            })
                    }
                }))
                console.timeEnd();
    }

    loadCards(cards) {
        this.body.innerHTML = '';
        for (let i = 0; i < cards.length; i++){
            this.createCard(cards[i].blob, cards[i].title);
        }
    }

    createCard(image, title){
        let newCard = document.createElement('div');
        newCard.classList.add('card');

        let img = new Image();
        img.src = URL.createObjectURL(image);

        let cardText = document.createElement('div');
        cardText.classList.add('card-title');
        cardText.innerText = title;

        newCard.appendChild(img);
        newCard.appendChild(cardText);

        this.appendCard(newCard);
    }

    appendCard(card) {
        this.body.appendChild(card);
    }

    getCards(){
        return cards;
    }
}*/
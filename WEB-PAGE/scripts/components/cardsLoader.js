let cards = [];

export default class CardsLoader{

    constructor(){
        this.body = document.querySelector('#profile-body');
    }

    async getCards(id){
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
}
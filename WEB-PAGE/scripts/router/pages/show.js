let showData = {};

export default class Show {

    constructor() {
        this.body = document.getElementById('body');

        this.url = window.location.href;

        const [hash, query] = this.url.split('#')[1].split('?');
        this.params = Object.fromEntries(new URLSearchParams(query));

        this.id = this.params.id;
        console.log(this.id);

        this.getData(this.id);
    }

    async getData(id) {

        await fetch(`http://192.168.1.103:50000/content/${id}`)
            .then(async (response) => {
                if (response.status === 404) {
                    window.location.hash = '404';
                    return;
                }
                await response.json()
                    .then(async (response) => {
                        showData.title = response[0].title;
                        showData.description = response[0].text;
                        showData.rate = response[0].rate;

                        await fetch(`http://192.168.1.103:50000/image/${response[0].image}`)
                            .then(image => image.blob()
                                .then((image) => {
                                    showData.image = URL.createObjectURL(image);
                                }))
                    })
            })
        console.table(showData);
        this.loadPage();
    }

    loadPage() {
        let HTML = `
            <div class="show-body">
                <div class="show-image">

                </div>

                <div class="show-contents">
                    <div class="show-details">
                    
                    </div>

                    <div class="show-comments">
                    
                    </div>
                </div>

            </div>
        `

        this.body.innerHTML = HTML;
    }

}
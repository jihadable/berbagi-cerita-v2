import NotFoundPresenter from "./not-found-presenter"

export default class NotFoundPage {
    #presenter 

    async render() {
        return `
            <h1>Halaman tidak ditemukan</h1>
        `
    }
   
    async afterRender() {
        this.#presenter = new NotFoundPresenter({
            view: this
        })
    }
}
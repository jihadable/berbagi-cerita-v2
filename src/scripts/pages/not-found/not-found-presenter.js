export default class NotFoundPresenter {
    #model;
    #view;
 
    constructor({ model, view }) {
        this.#model = model;
        this.#view = view;
    }
}
export default class HomePresenter {
    #model;
    #view;
 
    constructor({ model, view }) {
        this.#model = model;
        this.#view = view;
    }

    logoutMethod(){
        if (document.querySelector(".logout-btn")){
            document.querySelector(".logout-btn").addEventListener("click", () => {
                localStorage.removeItem("token")
                token.value = null
    
                window.location.href = '/#/'
            })
        }
    }
}
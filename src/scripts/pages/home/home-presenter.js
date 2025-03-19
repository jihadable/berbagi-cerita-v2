import { Notif } from "../../notifs";

export default class HomePresenter {
    #model;
    #view;
 
    constructor({ model, view }) {
        this.#model = model;
        this.#view = view;
    }

    subNUnsub(){
        document.querySelector('.sub').addEventListener('click', Notif.subscribe);
        document.querySelector('.unsub').addEventListener('click', Notif.unsubscribe);
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
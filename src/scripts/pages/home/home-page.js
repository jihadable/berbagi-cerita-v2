import { cameraStream } from "../../data/stream";
import { token } from "../../data/token";
import HomePresenter from "./home-presenter";

export default class HomePage {
    #presenter 

    async render() {
        if (cameraStream.stream) {
            cameraStream.stream.getTracks().forEach((track) => track.stop());
            cameraStream.stream = null;
        }
        
        return `
            <h1 id="top">Berbagi Cerita</h1>
            ${
                token.value ? 
                `<button class="logout-btn">Logout</button>
                <div class="notifs">
                    <button class="sub">Subscribe Notif</button>
                    <button class="unsub">Unsubscribe Notif</button>
                </div>
                <a href="/#/stories" class="list-cerita">List cerita</a>
                <a href="/#/add" class="buat-baru">Buat cerita baru</a>` 
                : 
                `<a class="login-btn" href="/#/login">Login untuk buat cerita baru</a>`}
        `
    }
   
    async afterRender() {
        this.#presenter = new HomePresenter({
            view: this
        })

        this.#presenter.subNUnsub()
        this.#presenter.logoutMethod()
    }
}
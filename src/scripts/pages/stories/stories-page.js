import Story from "../../data/stories";
import { cameraStream } from "../../data/stream";
import StoriesPresenter from "./stories-presenter";

export default class StoriesPage {
    #presenter 

    async render() {
        if (cameraStream.stream) {
            cameraStream.stream.getTracks().forEach((track) => track.stop());
            cameraStream.stream = null;
        }

        return `
            <h1 id="top">Berbagi Cerita</h1>
            <header>
                <button class="skip-to-content">Skip to main content</button>
            </header>
            <button class="logout-btn">Logout</button>
            <div class="notifs">
                <button class="sub">Subscribe Notif</button>
                <button class="unsub">Unsubscribe Notif</button>
            </div>
            <a class="buat-baru" href="/#/add">Buat Cerita Baru</a>
            <a class="back-btn" href="/#/">Kembali ke home</a>
            <main id="main-content">
                <div class="stories" id="stories">

                </div>
            </main>
        `
    }
   
    async afterRender() {
        const stories = await Story.getAllStories()

        this.#presenter = new StoriesPresenter({
            model: stories,
            view: this,
        })

        this.#presenter.subNUnsub()
        this.#presenter.skipToContent()
        this.#presenter.stopAllStreams()
        this.#presenter.logoutMethod()
        await this.#presenter.showStories()
    }
}
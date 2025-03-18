import AddPresenter from "./add-presenter";

export default class AddPage {
    #presenter

    async render() { 
        return `
            <h1>Buat Cerita Baru</h1>
            <button class="logout-btn">Logout</button>
            <a class="back-btn" href="/#/stories">List cerita</a>
            <a class="back-btn" href="/#/">Kembali ke home</a>
            <div class="container">
                <form id="storyForm">
                    <label for="description">Deskripsi Cerita:</label>
                    <textarea id="description" required></textarea>

                    <label for="photo">Ambil Foto:</label>
                    <div class="camera">
                        <video id="camera-video" width="100%" autoplay></video>
                        <canvas id="camera-canvas" style="display: none;"></canvas>
                        <button type="button" id="camera-take-button">Ambil Gambar</button>
                    </div>
                    <img id="preview" style="display:none;">

                    <label>Pilih Lokasi di Peta:</label>
                    <div id="map"></div>

                    <label for="lat">Latitude:</label>
                    <input type="text" id="lat" readonly>

                    <label for="lon">Longitude:</label>
                    <input type="text" id="lon" readonly>

                    <button type="submit">Kirim Cerita</button>
                </form>
            </div>
        `
    }
   
    async afterRender() {
        this.#presenter = new AddPresenter({
            view: this
        });
       
        this.#presenter.logoutMethod();
        await this.#presenter.init();
    }
}
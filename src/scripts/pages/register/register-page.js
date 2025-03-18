import { cameraStream } from "../../data/stream";
import RegisterPresenter from "./register-presenter";

export default class RegisterPage {
    #presenter

    async render() {
        if (cameraStream.stream) {
            cameraStream.stream.getTracks().forEach((track) => track.stop());
            cameraStream.stream = null;
        }

        return `
            <h1>Register</h1>
            <form class="register-login-form" id="register-form">
                <input type="text" id="name-input" placeholder="Nama" required />
                <input type="email" id="email-input" placeholder="Email" required />
                <input type="password" id="password-input" placeholder="Password" required />
                <span>Sudah punya akun? <a href="/#/login">Login</a></span>
                <button type="submit">Register</button>
            </form>
        `
    }
   
    async afterRender() {
        this.#presenter = new RegisterPresenter({
            view: this
        })

        await this.#presenter.init()
    }
}
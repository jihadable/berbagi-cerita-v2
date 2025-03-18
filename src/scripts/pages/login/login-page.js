import { cameraStream } from "../../data/stream";
import LoginPresenter from "./login-presenter";

export default class LoginPage {
    #presenter

    async render() {
        if (cameraStream.stream) {
            cameraStream.stream.getTracks().forEach((track) => track.stop());
            cameraStream.stream = null;
        }
    
        return `
            <h1>Login</h1>
            <form class="register-login-form" id="login-form">
                <input type="email" id="email-input" placeholder="Email" required />
                <input type="password" id="password-input" placeholder="Password" required />
                <span>Belum punya akun? <a href="/#/register">Register</a></span>
                <button type="submit">Login</button>
            </form>
        `
    }
   
    async afterRender() {
        this.#presenter = new LoginPresenter({
            view: this
        })

        await this.#presenter.init()
    }
}
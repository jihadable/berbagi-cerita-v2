import "../styles/add.css";
import "../styles/home.css";
import "../styles/register-login-form.css";
import App from './app.js';

document.addEventListener('DOMContentLoaded', async () => {
    const content = document.querySelector('#content');
    const app = new App({ content });
    await app.renderPage();

    window.addEventListener('hashchange', async () => {
      	await app.renderPage();
    });
});
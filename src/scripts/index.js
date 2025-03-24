import "../styles/add.css";
import "../styles/home.css";
import "../styles/register-login-form.css";
import App from './app.js';

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js')
    .then((registration) => {
        console.log('Service Worker terdaftar dengan skop:', registration.scope);
    })
    .catch((error) => {
        console.error('Pendaftaran Service Worker gagal:', error);
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    const content = document.querySelector('#content');
    const app = new App({ content });
    await app.renderPage();

    window.addEventListener('hashchange', async () => {
      	await app.renderPage();
    });
});
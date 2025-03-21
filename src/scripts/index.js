import "../styles/add.css";
import "../styles/home.css";
import "../styles/register-login-form.css";
import App from './app.js';

async function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        try {
            await navigator.serviceWorker.register('./service-worker.js');
        } catch (error) {
            console.error('Gagal mendaftarkan Service Worker:', error);
        }
    } else {
        console.log('Service Worker tidak didukung di browser ini.');
    }
}

registerServiceWorker()

document.addEventListener('DOMContentLoaded', async () => {
    const content = document.querySelector('#content');
    const app = new App({ content });
    await app.renderPage();

    window.addEventListener('hashchange', async () => {
      	await app.renderPage();
    });
});
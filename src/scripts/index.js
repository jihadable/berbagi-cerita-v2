import "../styles/add.css";
import "../styles/home.css";
import "../styles/register-login-form.css";
import App from './app.js';

async function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        try {
            const registration = await navigator.serviceWorker.register('./service-worker.js');
            console.log('Service Worker terdaftar:', registration);
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
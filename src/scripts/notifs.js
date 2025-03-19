import { token } from "./data/token";

const PUBLIC_VAPID_KEY = "BCCs2eonMI-6H2ctvFaWg-UYdDv387Vno_bzUzALpB442r2lCnsHmtrx8biyPi_E-1fSGABK_Qs_GlvPoJJqxbk"

export const Notif = {
    async subscribe() {
        try {
            const registration = await navigator.serviceWorker.ready;

            const permission = await Notification.requestPermission();
            if (permission !== 'granted') {
                alert('Izin notifikasi ditolak!');
                return;
            }

            const subscription = await registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array(PUBLIC_VAPID_KEY),
            });

            // console.log('Berhasil subscribe:', JSON.stringify(subscription));
            
            await fetch(`${process.env.API_ENDPOINT}/notifications/subscribe`, {
                method: 'POST',
                body: JSON.stringify({
                    endpoint: subscription.endpoint,
                    keys: {
                        p256dh: btoa(String.fromCharCode(...new Uint8Array(subscription.getKey('p256dh')))),
                        auth: btoa(String.fromCharCode(...new Uint8Array(subscription.getKey('auth')))),
                    },
                }),
                headers: { 
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer " + token.value 
                },
            });
            alert('Berhasil berlangganan notifikasi!');
        } catch (error) {
            console.error('Gagal subscribe:', error);
        }
    },

    async unsubscribe() {
        try {
            const registration = await navigator.serviceWorker.ready;
            const subscription = await registration.pushManager.getSubscription();

            if (!subscription) {
                alert('Kamu belum berlangganan notifikasi.');
                return;
            }

            await subscription.unsubscribe();
            alert('Berhasil berhenti berlangganan notifikasi.');

            await fetch(`${process.env.API_ENDPOINT}/notifications/unsubscribe`, {
                method: 'POST',
                body: JSON.stringify({
                    endpoint: subscription.endpoint,
                }),
                headers: { 
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer " + token.value
                },
            });
        } catch (error) {
            console.error('Gagal unsubscribe:', error);
        }
    }
}

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    return Uint8Array.from([...rawData].map(char => char.charCodeAt(0)));
}
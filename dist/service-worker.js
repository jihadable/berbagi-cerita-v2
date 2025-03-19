self.addEventListener('push', (event) => {
    const showNotification = async () => {
        const data = event.data.json();
        console.log('Push Notification diterima:', data);
    
        self.registration.showNotification(data.title, {
            body: data.body
        });
    };
     
    event.waitUntil(showNotification());
});
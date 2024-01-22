/**
 * @description Service Worker for notifications
 */

// Register event listener for the 'push' event.
/*self.addEventListener('push', function(event) {
    // Retrieve the textual payload from event.data (a PushMessageData object).
    // Other formats are supported (ArrayBuffer, Blob, JSON), check out the documentation
    // on https://developer.mozilla.org/en-US/docs/Web/API/PushMessageData.
    const eventInfo = event.data.text();
    const data = JSON.parse(eventInfo);
    const title = data.title;
    const options = {
        body: data.body,
        icon: data.icon,
        badge: data.badge,
        data: data.link,
        actions: data.actions,
    };
     
    // Keep the service worker alive until the notification is created.
    event.waitUntil(self.registration.showNotification(title, options));
});*/
"use strict";
function PopupCenter(url, title, w, h) {
    // Fixes dual-screen position
    const dualScreenLeft = window.screenX;
    const dualScreenTop = window.screenY;
    const width = window.innerWidth || document.documentElement.clientWidth || screen.width;
    const height = window.innerHeight || document.documentElement.clientHeight || screen.height;
    const left = ((width / 2) - (w / 2)) + dualScreenLeft;
    const top = ((height / 2) - (h / 2)) + dualScreenTop;
    // Ensure url is a string before opening the window
    if (typeof url === 'string' || url instanceof URL) {
        const newWindow = window.open(url.toString(), title || '', `resizable=0, scrollbars=yes, width=${w}, height=${h}, top=${top}, left=${left}`);
        // Puts focus on the newWindow  
        if (newWindow) {
            newWindow.focus();
        }
    }
}

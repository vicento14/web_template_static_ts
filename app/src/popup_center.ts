function PopupCenter(url: string | URL | undefined, title: string | undefined, w: number, h: number): void {
    // Fixes dual-screen position
    const dualScreenLeft: number = window.screenX;
    const dualScreenTop: number = window.screenY;

    const width: number = window.innerWidth || document.documentElement.clientWidth || screen.width;
    const height: number = window.innerHeight || document.documentElement.clientHeight || screen.height;

    const left: number = ((width / 2) - (w / 2)) + dualScreenLeft;
    const top: number = ((height / 2) - (h / 2)) + dualScreenTop;

    // Ensure url is a string before opening the window
    if (typeof url === 'string' || url instanceof URL) {
        const newWindow: Window | null = window.open(url.toString(), title || '', `resizable=0, scrollbars=yes, width=${w}, height=${h}, top=${top}, left=${left}`);

        // Puts focus on the newWindow  
        if (newWindow) {
            newWindow.focus();
        }
    }
}

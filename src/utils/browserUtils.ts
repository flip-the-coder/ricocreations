export const MEDIUM_DEVICE_WIDTH = 1025; // pixels
export const SMALL_DEVICE_WIDTH = 720; // pixels
export const LANDSCAPE_DEVICE_CONDITION =
    '(min-device-width: 200px) and (max-device-width: 900px) and (max-device-height: 1000px) and (orientation: landscape) and (min-aspect-ratio: 13/9)';

const HTTP_PROTOCOL = 'http';
const WWW = 'www';

export function isIE(): boolean {
    //Check the userAgent property of the window.navigator object
    const ua = window.navigator.userAgent;
    // IE 10 or older
    const msie = ua.indexOf('MSIE ');
    //IE 11
    const trident = ua.indexOf('Trident/');

    return msie > 0 || trident > 0;
}

export function iOS(): boolean {
    return (
        ['iPad Simulator', 'iPhone Simulator', 'iPod Simulator', 'iPad', 'iPhone', 'iPod'].includes(
            navigator.platform
        ) ||
        // iPad on iOS 13 detection
        (navigator.userAgent.includes('Mac') && 'ontouchend' in document)
    );
}

export function android(): boolean {
    return (
        ['Android'].includes(navigator.platform) ||
        // Could also return a version of Linux ARM
        navigator.platform.includes('Linux')
    );
}

export function isFirefox(): boolean {
    return navigator.userAgent.includes('Firefox');
}

export function isMac(): boolean {
    return navigator.userAgent.indexOf('Mac OS X') !== -1;
}

export function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
}

export function openInNewTab(url: string) {
    var win = window.open(url, '_blank');
    if (win) {
        win.focus();
    }
}

/**
 * Prepends the HTTP protocol to a URL if not already present, converting URLs that would be treated as relatives to absolutes, which can then be used to open external links on a new page.
 *
 * @param {string} url - The URL to modify
 * @returns a modified URL with the protocol, used for navigating to a new page.
 */
export const prependHTTPProtocol = (url: string): string => {
    if (url.startsWith(HTTP_PROTOCOL)) {
        return url;
    }
    if (url.startsWith(WWW)) {
        return `${HTTP_PROTOCOL}://${url}`; // Secure protocols automatically add the "s" if needed
    }
    return `${HTTP_PROTOCOL}://${WWW}.${url}`;
};

export function isMobile() {
    return window.innerWidth < MEDIUM_DEVICE_WIDTH;
}

const isUserUsingMobile = () => {
    // User agent string method
    let isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    // Screen resolution method
    if (!isMobile) {
        let screenWidth = window.screen.width;
        let screenHeight = window.screen.height;
        isMobile = screenWidth < 768 || screenHeight < 768;
    }

    // Touch events method
    if (!isMobile) {
        isMobile = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    }

    // CSS media queries method
    if (!isMobile) {
        let bodyElement = document.getElementsByTagName('body')[0];
        isMobile = window.getComputedStyle(bodyElement).getPropertyValue('content').indexOf('mobile') !== -1;
    }

    return isMobile;
};

export function isMobileDeviceLandscape() {
    if (!isMobile() || !isUserUsingMobile()) {
        return false;
    }

    return window.matchMedia ? window.matchMedia('(orientation: landscape)').matches : false;
}

export function removeQueryString() {
    var currentURL = window.location.href;
    var updatedURL = currentURL.split('?')[0];
    window.history.replaceState({}, document.title, updatedURL);
}

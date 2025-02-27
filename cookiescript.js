document.addEventListener('DOMContentLoaded', function() {
    // Function to get a cookie by name
    function getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    // Check if the specific cookie is present
    if (getCookie('showBanner') === 'true') {
        const banner = document.getElementById('cookie-banner');
        if (banner) {
            banner.style.display = 'block';
        } else {
            console.error('Element with ID "cookie-banner" not found.');
        }
    }

    // Show the banner when the cookie is set
    document.cookie = "showBanner=true; path=/";
});

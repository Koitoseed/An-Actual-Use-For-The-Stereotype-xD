document.addEventListener("DOMContentLoaded", function() {
    // Check if the header state is stored in cookies
    const headerState = getCookie('headerHidden');
    
    // If header is hidden, apply the hidden class and show the unhide button
    if (headerState === 'true') {
        document.querySelector('.site-header').classList.add('hidden');
        document.querySelector('.unhide-toggle').style.display = 'block'; // Make the unhide button visible
        document.querySelector('.header-toggle').style.display = 'none'; // Hide the hide button
    } else {
        document.querySelector('.unhide-toggle').style.display = 'none'; // Hide the unhide button
        document.querySelector('.header-toggle').style.display = 'block'; // Show the hide button
    }

    // Toggle header visibility when the hide button is clicked
    const hideButton = document.querySelector('.header-toggle');
    if (hideButton) {
        hideButton.addEventListener('click', function() {
            document.querySelector('.site-header').classList.add('hidden');
            document.querySelector('.unhide-toggle').style.display = 'block'; // Show the unhide button
            document.querySelector('.header-toggle').style.display = 'none'; // Hide the hide button
            setCookie('headerHidden', 'true', 7); // Store the hidden state in cookies for 7 days
        });
    }

    // Toggle header visibility when the unhide button is clicked
    const unhideButton = document.querySelector('.unhide-toggle');
    if (unhideButton) {
        unhideButton.addEventListener('click', function() {
            document.querySelector('.site-header').classList.remove('hidden');
            document.querySelector('.unhide-toggle').style.display = 'none'; // Hide the unhide button
            document.querySelector('.header-toggle').style.display = 'block'; // Show the hide button
            setCookie('headerHidden', 'false', 7); // Store the visible state in cookies for 7 days
        });
    }
});

// Function to get a cookie by name
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return "";
}

// Function to set a cookie
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value}; ${expires}; path=/`;  // Ensure path is '/' to be global
}

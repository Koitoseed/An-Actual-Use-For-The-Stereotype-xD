// Global setup or any previously existing code
console.log("Mari.js loaded successfully!");

// Felix-specific animation logic
window.onload = function () {
    try {
        const gifOverlay = document.getElementById('gifOverlay');
        const gifSmall = document.getElementById('gifSmall');
        const title = document.getElementById('title');
        const buttonsContainer = document.getElementById('buttonsContainer');

        if (!gifOverlay || !gifSmall || !title || !buttonsContainer) {
            console.error('One or more elements not found:', { gifOverlay, gifSmall, title, buttonsContainer });
            return;
        }

        setTimeout(function () {
            gifOverlay.style.opacity = '0';

            setTimeout(function () {
                gifOverlay.style.display = 'none';
                gifSmall.style.display = 'block';
                title.style.display = 'block';
                buttonsContainer.style.display = 'flex';
            }, 2000);
        }, 3500);
    } catch (error) {
        console.error('Error in Felix page script:', error);
    }
};

// Retain any other functionality here
// Example: Functionality for the Character List Page
document.addEventListener('DOMContentLoaded', function () {
    console.log("Character list logic initialized!");
    // Example logic for handling character list interactions
    const characterButtons = document.querySelectorAll('.character-button');
    characterButtons.forEach(button => {
        button.addEventListener('click', function () {
            console.log(`Navigating to character: ${this.dataset.characterName}`);
        });
    });
});

// Admin-specific functionality
function checkAdminCookie() {
    const isAdmin = document.cookie.includes('admin=true');
    if (isAdmin) {
        const adminDashboardButton = document.getElementById('adminDashboardBtn');
        if (adminDashboardButton) {
            adminDashboardButton.style.display = 'block';
        }
    }
}

document.addEventListener('DOMContentLoaded', checkAdminCookie);

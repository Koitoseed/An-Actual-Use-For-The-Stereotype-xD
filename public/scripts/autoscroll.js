const image = document.querySelector('.scrolling-image');

// Dynamically fetch scroll speed
let scrollSpeed = 0.5; // Change this for faster or slower movement
window.addEventListener('scroll', () => {
    const image = document.querySelector('.scrolling-image');
    image.style.transform = `translateY(${window.scrollY * scrollSpeed}px)`;
});

let position = 0;

// Dynamically calculate container height based on image size
function setContainerHeight() {
    const container = document.querySelector('.scroll-container');
    const imageHeight = image.naturalHeight || image.offsetHeight; // Use actual image height
    container.style.height = `${imageHeight * 2}px`; // Double image height for scrolling
}

// Adjust scroll position dynamically
function scrollImage() {
    position += scrollSpeed; // Move image slower than content scroll
    image.style.transform = `translateY(-${position}px)`; // Shift image position

    // Reset position for infinite scroll effect
    if (position >= image.height) {
        position = 0; // Restart scroll position
    }

    requestAnimationFrame(scrollImage); // Smooth animation loop
}

// Initialize on image load
image.onload = () => {
    setContainerHeight();
    scrollImage(); // Start scroll animation
};

// Update height on resize
window.addEventListener('resize', setContainerHeight);

window.onload = () => {
    window.scrollTo(0, 0); // Ensure it always starts at the top
};


document.addEventListener('DOMContentLoaded', () => {
    const image = document.querySelector('.scrolling-image');
    if (image) {
        scrollImage(); // Initialize scroll
    }
});

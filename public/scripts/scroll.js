// Fetch scroll speed set per page
const scrollSpeed = parseFloat(document.body.dataset.scrollSpeed) || 0.3;

// Parallax scrolling effect
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;

    // Move the background at a slower rate (parallax)
    const offset = scrollPosition * scrollSpeed;

    // Apply dynamic parallax effect
    document.body.style.backgroundPositionY = `${offset}px`;

    // Update CSS variable for reference
    document.documentElement.style.setProperty('--scroll', scrollPosition);
});

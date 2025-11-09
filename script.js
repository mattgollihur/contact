// script.js (UPDATED CODE - Adjusted for direct VCF opening)

// --- 1. Animated Download Button Function ---
function setupAnimatedDownload() {
    const vcardButton = document.getElementById('vcard-button');
    if (!vcardButton) return;

    vcardButton.addEventListener('click', function(e) {
        // e.preventDefault() is NO LONGER needed here, as we rely on the default action
        // of opening the data URI after the animation finishes.
        
        const button = this;

        // 1. Start the animation (adds the 'downloading' class)
        button.classList.add('downloading');

        // 2. Wait for the animation to finish (800ms to match CSS)
        setTimeout(() => {
            // The browser is allowed to continue with its default action, which is opening 
            // the data:text/vcard URI, prompting the user to save the contact.
            
            // 3. Reset the button after a short delay (200ms)
            setTimeout(() => {
                button.classList.remove('downloading');
                // The element is now ready for the next click (which triggers the default action)
            }, 200);

        }, 800); 
    });
}

// --- 2. Reverse Scroll Reveal Logic ---
function setupScrollReveal() {
    const revealElement = document.getElementById('footer-reveal');
    if (!revealElement) return;

    function handleScroll() {
        const viewportHeight = window.innerHeight;
        // Get the distance from the top of the viewport to the element
        const elementTop = revealElement.getBoundingClientRect().top;
        
        // Show the element when it is within 150px of the bottom of the viewport
        if (elementTop < viewportHeight - 150) {
            revealElement.classList.add('revealed');
            // Remove the listener once revealed to save performance
            window.removeEventListener('scroll', handleScroll);
        }
    }

    // Attach the scroll listener
    window.addEventListener('scroll', handleScroll);
    // Also run it once in case the content is shorter than the viewport height
    handleScroll(); 
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    setupAnimatedDownload();
    setupScrollReveal();
});

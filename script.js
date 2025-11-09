// script.js (UPDATED CODE)

// --- 3. Digital Card Flipper Toggle ---
function setupCardFlipper() {
    const flipper = document.querySelector('.card-flipper');
    if (flipper) {
        // Create inner div for 3D rotation if it doesn't exist
        if (!document.querySelector('.card-flipper-inner')) {
            const innerDiv = document.createElement('div');
            innerDiv.classList.add('card-flipper-inner');
            
            // Move the current contents into the inner wrapper
            while (flipper.firstChild) {
                innerDiv.appendChild(flipper.firstChild);
            }
            // Put the wrapper back into the flipper
            flipper.appendChild(innerDiv);
        }

        // Add the click listener to the flipper container
        flipper.addEventListener('click', () => {
            flipper.classList.toggle('flipped');
        });
    }
}

// --- 4. Animated Download Button Function ---
function setupAnimatedDownload() {
    const vcardButton = document.getElementById('vcard-button');
    if (!vcardButton) return;

    vcardButton.addEventListener('click', function(e) {
        // Prevent default download action immediately
        e.preventDefault(); 
        
        const button = this;
        const vcardUrl = this.href;

        // 1. Start the animation (adds the 'downloading' class)
        button.classList.add('downloading');

        // 2. Wait for the animation to finish (800ms to match CSS)
        setTimeout(() => {
            // 3. Initiate the actual VCF download
            const link = document.createElement('a');
            link.href = vcardUrl;
            link.download = 'Matt_Gollihur.vcf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // 4. Reset the button after a short delay (200ms)
            setTimeout(() => {
                button.classList.remove('downloading');
                button.style.pointerEvents = '';
            }, 200);

        }, 800); 
    });
}

// --- 5. Reverse Scroll Reveal Logic ---
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
    setupCardFlipper(); 
    setupAnimatedDownload();
    setupScrollReveal();
    // The call to registerServiceWorker() has been removed.
});

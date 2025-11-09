// script.js (UPDATED CODE - Instructional Modal and Delay)

// --- 1. Instructions Modal and VCF Trigger ---
function setupVCFInstructions() {
    const vcardButton = document.getElementById('vcard-button');
    const modal = document.getElementById('save-instructions-modal');
    
    if (!vcardButton || !modal) return;

    vcardButton.addEventListener('click', function(e) {
        // Stop the default action of immediately opening the link
        e.preventDefault(); 
        
        const vcardUrl = this.href;
        
        // 1. Disable the button to prevent multiple clicks
        this.style.pointerEvents = 'none';

        // 2. Show the modal
        modal.classList.add('visible');

        // 3. Set a timeout for the 3-second delay (3000 milliseconds)
        setTimeout(() => {
            // 4. Hide the modal after the delay
            modal.classList.remove('visible');
            
            // 5. Trigger the VCF opening 
            const link = document.createElement('a');
            link.href = vcardUrl;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            // 6. Re-enable the button
            vcardButton.style.pointerEvents = '';
            
        }, **3000**); // <-- CHANGED from 5000 to 3000 milliseconds
    });
}

// --- 2. Reverse Scroll Reveal Logic ---
function setupScrollReveal() {
    const revealElement = document.getElementById('footer-reveal');
    if (!revealElement) return;

    function handleScroll() {
        const viewportHeight = window.innerHeight;
        const elementTop = revealElement.getBoundingClientRect().top;
        
        if (elementTop < viewportHeight - 150) {
            revealElement.classList.add('revealed');
            window.removeEventListener('scroll', handleScroll);
        }
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll(); 
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    setupVCFInstructions(); 
    setupScrollReveal();
});

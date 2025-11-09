document.addEventListener('DOMContentLoaded', () => {
    const vcardButton = document.getElementById('vcard-button');
    const modal = document.getElementById('save-instructions-modal');

    // Add event listener to the vCard button
    if (vcardButton && modal) {
        vcardButton.addEventListener('click', (e) => {
            // Prevent the default link action (the download) initially
            e.preventDefault();

            // 1. Show the modal
            modal.classList.add('visible');

            // 2. Hide the modal and trigger the download after a delay (e.g., 5 seconds)
            setTimeout(() => {
                modal.classList.remove('visible');
                
                // The original action (vCard download) is triggered here
                window.location.href = vcardButton.href;
                
                // *** No localStorage code is present, so the modal will show again next time ***
                
            }, 5000); // 5000 milliseconds = 5 seconds

        });
    }

    // --- Reverse Scroll Reveal (Original Feature) ---
    const footerReveal = document.getElementById('footer-reveal');
    // Ensure the footer is available before calculating scroll points
    if (footerReveal) {
        // Use a slight delay to ensure the page height is fully rendered
        setTimeout(() => {
            const documentHeight = document.documentElement.scrollHeight;
            
            // Determine the scroll trigger point (e.g., 85% of the total document height)
            const triggerPoint = documentHeight * 0.85; 
        
            function handleScroll() {
                // Calculate how far the user has scrolled from the top + the viewport height
                const scrolledDistance = window.scrollY + window.innerHeight;

                if (scrolledDistance >= triggerPoint) {
                    footerReveal.classList.add('visible');
                } else {
                    footerReveal.classList.remove('visible');
                }
            }

            window.addEventListener('scroll', handleScroll);
            // Also run on load just in case the page is short
            handleScroll();
        }, 100);
    }
});

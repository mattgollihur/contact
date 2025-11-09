// script.js: Full Updated Code

// Wait for the entire HTML document to be fully loaded and parsed before executing the script.
document.addEventListener('DOMContentLoaded', () => {
    
    // --- Elements for Modal/vCard Download Handlers ---
    // Get the 'Save Contact' button element using its ID.
    const vcardButton = document.getElementById('vcard-button');
    // Get the modal overlay element for the save instructions.
    const modal = document.getElementById('save-instructions-modal');

    // --- Elements and Data for General Link Tracking (Google Analytics) ---
    // Define an array of objects to map element IDs to Google Analytics event data.
    const trackedElements = [
        // Phone link tracking
        { id: 'phone-link', category: 'direct_contact', label: 'call_phone' },
        // Email link tracking
        { id: 'email-link', category: 'direct_contact', label: 'send_email' },
        // LinkedIn button tracking
        { id: 'linkedin-button', category: 'navigation', label: 'linkedin_profile' },
        // Event Photos button tracking
        { id: 'photos-button', category: 'navigation', label: 'event_photos' },
        // Meeting/Info Request button tracking
        { id: 'meeting-button', category: 'contact_action', label: 'meeting_request' }
    ];

    // Function to handle standard link click tracking using the global gtag function (Google Analytics).
    function trackLinkClick(e) {
        // Get the ID of the element that was clicked.
        const elementId = e.currentTarget.id;
        // Find the corresponding tracking information object in the array.
        const trackingInfo = trackedElements.find(el => el.id === elementId);

        // Check if tracking info exists and if the gtag function is available globally.
        if (trackingInfo && typeof gtag === 'function') {
            // Send a custom event to Google Analytics.
            gtag('event', 'link_click', {
                'event_category': trackingInfo.category,
                'event_label': trackingInfo.label
            });
        }
    }

    // Attach the tracking function to all standard clickable elements defined in trackedElements.
    trackedElements.forEach(item => {
        const element = document.getElementById(item.id);
        if (element) {
            element.addEventListener('click', trackLinkClick);
        }
    });

    // --- Special Handler for vCard Button (with Modal/Timeout) ---
    // This logic handles showing the instruction modal before triggering the vCard download.
    if (vcardButton && modal) {
        vcardButton.addEventListener('click', (e) => {
            // Prevent the default link action (immediate download/navigation)
            e.preventDefault();

            // GA Event Tracking for the vCard download
            if (typeof gtag === 'function') {
                gtag('event', 'vcard_download', {
                    'event_category': 'contact_action',
                    'event_label': 'save_to_phone'
                });
            }

            // Make the instruction modal visible
            modal.classList.add('visible');

            // Wait for a short duration (3.5 seconds) to allow the user to read instructions
            setTimeout(() => {
                // Hide the modal after the instructions timeout
                modal.classList.remove('visible');
                // Trigger the actual download/navigation by changing the window location
                window.location.href = vcardButton.href;
            }, 3500);
        });
    }

    // --- Reverse Scroll Reveal (Footer Animation) ---
    // Get the footer element that should be revealed on scroll.
    const footerReveal = document.getElementById('footer-reveal');

    // Wrap the scroll handler in a small timeout to ensure the DOM and sizes are fully calculated.
    if (footerReveal) {
        setTimeout(() => {
            // Calculate the full height of the document.
            const documentHeight = document.documentElement.scrollHeight;
            // Set a trigger point (e.g., 85% down the page) to reveal the footer.
            const triggerPoint = documentHeight * 0.85; 
        
            // The main function to check scroll position and toggle visibility.
            function handleScroll() {
                // Calculate how far the user has scrolled plus the visible window height.
                const scrolledDistance = window.scrollY + window.innerHeight;

                // If the scrolled distance passes the trigger point, show the footer.
                if (scrolledDistance >= triggerPoint) {
                    footerReveal.classList.add('visible');
                } else {
                    // Otherwise, hide the footer (for an un-scroll/reverse effect).
                    footerReveal.classList.remove('visible');
                }
            }

            // Attach the scroll checking function to the window's scroll event.
            window.addEventListener('scroll', handleScroll);
            // Call it once immediately to check if the footer should be visible on initial load.
            handleScroll();
        }, 100);
    }
});

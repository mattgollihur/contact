/*
 * script.js
 * This file contains JavaScript code to control interactive behavior on the page,
 * including showing the vCard modal, handling button clicks, tracking events,
 * and creating the scroll-reveal effect for the footer.
 */

document.addEventListener('DOMContentLoaded', () => {
    /* * The DOMContentLoaded event fires when the initial HTML document has been 
     * completely loaded and parsed, without waiting for stylesheets or images.
     * All code inside this function runs only after the page structure is ready.
     */

    // --- Elements for Modal/vCard Download ---
    const vcardButton = document.getElementById('vcard-button');
    // Gets the HTML element (the 'Save Contact' button) by its ID.
    const modal = document.getElementById('save-instructions-modal');
    // Gets the HTML element (the full pop-up overlay) by its ID.

    // --- Elements for General Link Tracking ---
    const trackedElements = [
        /* An array of objects defining which elements to track and how to categorize them in Google Analytics (gtag). */
        { id: 'phone-link', category: 'direct_contact', label: 'call_phone' },
        // Tracking details for the phone number link.
        { id: 'email-link', category: 'direct_contact', label: 'send_email' },
        // Tracking details for the email link.
        { id: 'linkedin-button', category: 'navigation', label: 'linkedin_profile' },
        // Tracking details for the LinkedIn button.
        { id: 'photos-button', category: 'navigation', label: 'event_photos' },
        // Tracking details for the Event Photos button.
        { id: 'meeting-button', category: 'contact_action', label: 'meeting_request' }
        // Tracking details for the Meeting Request button.
    ];

    // Function to handle standard link tracking
    function trackLinkClick(e) {
        // This function is executed when a tracked link is clicked.
        const elementId = e.currentTarget.id;
        // Gets the ID of the element that was clicked.
        const trackingInfo = trackedElements.find(el => el.id === elementId);
        // Finds the corresponding tracking data from the 'trackedElements' array.

        if (trackingInfo && typeof gtag === 'function') {
            // Checks if tracking info was found AND if the Google Analytics function 'gtag' exists.
            gtag('event', 'link_click', {
                // Sends a custom 'link_click' event to Google Analytics.
                'event_category': trackingInfo.category,
                // Uses the category defined in the array (e.g., 'direct_contact').
                'event_label': trackingInfo.label
                // Uses the label defined in the array (e.g., 'call_phone').
            });
        }
    }

    // Attach tracking to standard links
    trackedElements.forEach(item => {
        // Loops through every item in the 'trackedElements' array.
        const element = document.getElementById(item.id);
        // Finds the actual HTML element.
        if (element) {
            // Checks if the element exists on the page.
            element.addEventListener('click', trackLinkClick);
            // Attaches the 'trackLinkClick' function to run when the element is clicked.
        }
    });

    // --- Special Handler for vCard Button (with Modal/Timeout) ---
    if (vcardButton && modal) {
        // Checks if both the vCard button and the modal element exist on the page.
        vcardButton.addEventListener('click', (e) => {
            // Attaches a click handler to the vCard button.
            e.preventDefault();
            // STOPS the button's default action (which is to navigate to the vCard link immediately).

            // GA Event Tracking for vCard Button
            if (typeof gtag === 'function') {
                // Checks if the Google Analytics function exists.
                gtag('event', 'vcard_download', {
                    // Sends a specific tracking event for vCard download.
                    'event_category': 'contact_action',
                    'event_label': 'save_to_phone'
                });
            }

            modal.classList.add('visible');
            // Adds the CSS class 'visible' to the modal, which triggers its display and fade-in animation.

            setTimeout(() => {
                // Sets a timer (timeout) to run code after 3500 milliseconds (3.5 seconds).
                modal.classList.remove('visible');
                // Hides the modal by removing the 'visible' class.
                
                // Trigger the actual download/navigation after the modal delay
                window.location.href = vcardButton.href;
                // Finally, redirects the browser to the vCard link, starting the download process.
            }, 3500);
        });
    }

    // --- Reverse Scroll Reveal ---
    const footerReveal = document.getElementById('footer-reveal');
    // Gets the HTML element for the footer section.

    if (footerReveal) {
        // Checks if the footer element exists.
        setTimeout(() => {
            // Sets a small delay (100ms) to ensure all content dimensions are calculated before checking scroll.
            const documentHeight = document.documentElement.scrollHeight;
            // Gets the total height of the entire page content.
            const triggerPoint = documentHeight * 0.85;
            // Calculates the point (85% down the page) where the footer should start appearing.

            function handleScroll() {
                // This function runs every time the user scrolls.
                const scrolledDistance = window.scrollY + window.innerHeight;
                // Calculates the distance from the top of the page to the bottom of the current viewport.

                if (scrolledDistance >= triggerPoint) {
                    // If the user has scrolled past the 85% mark:
                    footerReveal.classList.add('visible');
                    // Add the 'visible' class to fade in the footer.
                } else {
                    // If the user scrolls back up:
                    footerReveal.classList.remove('visible');
                    // Remove the 'visible' class to hide the footer again.
                }
            }

            window.addEventListener('scroll', handleScroll);
            // Attaches the 'handleScroll' function to the window's scroll event.
            handleScroll();
            // Runs the function once immediately, in case the page loaded already scrolled past the trigger point.
        }, 100);
    }
});

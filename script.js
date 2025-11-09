document.addEventListener('DOMContentLoaded', () => {
    
    // --- Elements for Modal/vCard Download ---
    const vcardButton = document.getElementById('vcard-button');
    const modal = document.getElementById('save-instructions-modal');

    // --- Elements for General Link Tracking ---
    const trackedElements = [
        { id: 'phone-link', category: 'direct_contact', label: 'call_phone' },
        { id: 'email-link', category: 'direct_contact', label: 'send_email' },
        { id: 'linkedin-button', category: 'navigation', label: 'linkedin_profile' },
        { id: 'photos-button', category: 'navigation', label: 'event_photos' },
        { id: 'meeting-button', category: 'contact_action', label: 'meeting_request' }
    ];

    // Function to handle standard link tracking
    function trackLinkClick(e) {
        const elementId = e.currentTarget.id;
        const trackingInfo = trackedElements.find(el => el.id === elementId);

        if (trackingInfo && typeof gtag === 'function') {
            gtag('event', 'link_click', {
                'event_category': trackingInfo.category,
                'event_label': trackingInfo.label
            });
        }
    }

    // Attach tracking to standard links
    trackedElements.forEach(item => {
        const element = document.getElementById(item.id);
        if (element) {
            element.addEventListener('click', trackLinkClick);
        }
    });

    // --- Special Handler for vCard Button (with Modal/Timeout) ---
    if (vcardButton && modal) {
        vcardButton.addEventListener('click', (e) => {
            e.preventDefault();

            // GA Event Tracking for vCard Button
            if (typeof gtag === 'function') {
                gtag('event', 'vcard_download', {
                    'event_category': 'contact_action',
                    'event_label': 'save_to_phone'
                });
            }

            modal.classList.add('visible');

            setTimeout(() => {
                modal.classList.remove('visible');
                // Trigger the actual download/navigation after the modal delay
                window.location.href = vcardButton.href;
            }, 5000);
        });
    }

    // --- Reverse Scroll Reveal ---
    const footerReveal = document.getElementById('footer-reveal');

    if (footerReveal) {
        setTimeout(() => {
            const documentHeight = document.documentElement.scrollHeight;
            const triggerPoint = documentHeight * 0.85; 
        
            function handleScroll() {
                const scrolledDistance = window.scrollY + window.innerHeight;

                if (scrolledDistance >= triggerPoint) {
                    footerReveal.classList.add('visible');
                } else {
                    footerReveal.classList.remove('visible');
                }
            }

            window.addEventListener('scroll', handleScroll);
            handleScroll();
        }, 100);
    }
});

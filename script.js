document.addEventListener('DOMContentLoaded', () => {
    const vcardButton = document.getElementById('vcard-button');
    const modal = document.getElementById('save-instructions-modal');

    if (vcardButton && modal) {
        vcardButton.addEventListener('click', (e) => {
            e.preventDefault();

            modal.classList.add('visible');

            setTimeout(() => {
                modal.classList.remove('visible');
                window.location.href = vcardButton.href;
            }, 5000);
        });
    }

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

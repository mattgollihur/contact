// script.js

// --- 1. Time-of-Day Greeting ---
function updateGreeting() {
    const hour = new Date().getHours();
    let greeting;
    const greetingElement = document.getElementById('greeting');

    if (!greetingElement) return; // Exit if the element isn't found

    if (hour < 12) {
        greeting = "Good morning";
    } else if (hour < 18) {
        greeting = "Good afternoon";
    } else {
        greeting = "Good evening";
    }
    
    // Insert the personalized greeting text
    greetingElement.textContent = `${greeting},`; 
}

// --- 2. Light/Dark Mode Toggle ---
function toggleDarkMode() {
    const isDark = document.body.classList.toggle('dark-mode');
    // Save user preference
    localStorage.setItem('dark-mode', isDark ? 'enabled' : 'disabled');
}

// Check for saved preference on load
function applySavedTheme() {
    if (localStorage.getItem('dark-mode') === 'enabled') {
        document.body.classList.add('dark-mode');
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    applySavedTheme();
    updateGreeting();
    // Attach the toggle function to the new button's click event
    const toggleButton = document.getElementById('theme-toggle');
    if (toggleButton) {
        toggleButton.addEventListener('click', toggleDarkMode);
    }
});

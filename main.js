// Utility function to handle keyboard interactions
function handleKeyboardInteraction(event, callback) {
    if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        callback();
    }
}

// Toggle description visibility
document.querySelectorAll('[aria-controls]').forEach(button => {
    button.addEventListener('click', () => toggleDescription(button));
    button.addEventListener('keydown', (e) => handleKeyboardInteraction(e, () => toggleDescription(button)));
});

function toggleDescription(button) {
    const isExpanded = button.getAttribute('aria-expanded') === 'true';
    const descriptionId = button.getAttribute('aria-controls');
    const description = document.getElementById(descriptionId);

    button.setAttribute('aria-expanded', !isExpanded);
    description.classList.toggle('hidden');

    // Announce change to screen readers
    const announcement = !isExpanded ? 'Description expanded' : 'Description collapsed';
    announceToScreenReader(announcement);
}

// Image gallery navigation
let currentImageIndex = 0;
const images = document.querySelectorAll('.image-gallery .card');

document.getElementById('prevButton').addEventListener('click', showPreviousImage);
document.getElementById('nextButton').addEventListener('click', showNextImage);

function showPreviousImage() {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    updateGalleryFocus();
}

function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    updateGalleryFocus();
}

function updateGalleryFocus() {
    // Move focus to current image for screen reader users
    images[currentImageIndex].querySelector('img').focus();
    announceToScreenReader(`Image ${currentImageIndex + 1} of ${images.length}`);
}

// Form submission handling
const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Validate form
    const nameInput = document.getElementById('name');
    const feedbackInput = document.getElementById('feedback');
    
    if (!nameInput.value.trim() || !feedbackInput.value.trim()) {
        announceToScreenReader('Please fill in all required fields');
        return;
    }

    // Mock form submission
    console.log('Form submitted:', {
        name: nameInput.value,
        feedback: feedbackInput.value
    });
    
    announceToScreenReader('Feedback submitted successfully');
    form.reset();
});

// Utility function for screen reader announcements
function announceToScreenReader(message) {
    const announcer = document.createElement('div');
    announcer.className = 'visually-hidden';
    announcer.setAttribute('aria-live', 'polite');
    announcer.textContent = message;
    document.body.appendChild(announcer);
    
    // Remove after announcement
    setTimeout(() => {
        announcer.remove();
    }, 1000);
}

// Add keyboard navigation for the nav menu
const menuItems = document.querySelectorAll('[role="menuitem"]');
menuItems.forEach((item, index) => {
    item.addEventListener('keydown', (e) => {
        let targetItem;
        
        switch(e.key) {
            case 'ArrowRight':
            case 'ArrowDown':
                e.preventDefault();
                targetItem = menuItems[(index + 1) % menuItems.length];
                break;
            case 'ArrowLeft':
            case 'ArrowUp':
                e.preventDefault();
                targetItem = menuItems[(index - 1 + menuItems.length) % menuItems.length];
                break;
            case 'Home':
                e.preventDefault();
                targetItem = menuItems[0];
                break;
            case 'End':
                e.preventDefault();
                targetItem = menuItems[menuItems.length - 1];
                break;
        }
        
        if (targetItem) {
            targetItem.focus();
        }
    });
});

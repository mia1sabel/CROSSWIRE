// Simple vibe coding script for temporary micro-interactions
document.addEventListener('DOMContentLoaded', () => {
    const waitlistForm = document.getElementById('waitlistForm');
    const feedbackText = document.getElementById('formFeedback');

    if (waitlistForm) {
        waitlistForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = waitlistForm.querySelector('input[type="email"]');
            
            if(emailInput.value) {
                console.log(`Email captured for Crosswire 2026 Inner Circle: ${emailInput.value}`);
                // Reveal friendly success text without reloading
                feedbackText.classList.remove('hidden');
                emailInput.value = '';
                
                setTimeout(() => {
                    feedbackText.classList.add('hidden');
                }, 4000);
            }
        });
    }
});

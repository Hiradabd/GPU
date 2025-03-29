document.addEventListener('DOMContentLoaded', () => {
    const formsContainer = document.querySelector('.forms-container');
    const toggleButtons = document.querySelectorAll('.toggle-form');
    const passwordToggles = document.querySelectorAll('.password-toggle');

    // Toggle between forms with slide animation
    toggleButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            formsContainer.classList.toggle('sign-up-active');
        });
    });

    // Password visibility toggle
    passwordToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const passwordInput = toggle.previousElementSibling;
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                toggle.classList.remove('fa-eye-slash');
                toggle.classList.add('fa-eye');
            } else {
                passwordInput.type = 'password';
                toggle.classList.remove('fa-eye');
                toggle.classList.add('fa-eye-slash');
            }
        });
    });
}); 
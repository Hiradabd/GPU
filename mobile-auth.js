document.addEventListener('DOMContentLoaded', () => {
    const signInForm = document.querySelector('.sign-in-form');
    const signUpForm = document.querySelector('.sign-up-form');
    const toggleButtons = document.querySelectorAll('.toggle-form');
    const passwordToggles = document.querySelectorAll('.password-toggle');

    // Toggle between forms
    toggleButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            signInForm.classList.toggle('active');
            signUpForm.classList.toggle('active');
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
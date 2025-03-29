const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
    container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
    container.classList.remove("sign-up-mode");
});

// اضافه کردن توابع مدیریت کاربران
function createAccount(event) {
    event.preventDefault();
    
    const username = document.querySelector('.sign-up-form #username').value;
    const email = document.querySelector('.sign-up-form #email').value;
    const password = document.querySelector('.sign-up-form #password').value;

    // بررسی اعتبار داده‌ها
    if (username.length < 3) {
        alert('Username must be at least 3 characters long');
        return;
    }
    if (password.length < 6) {
        alert('Password must be at least 6 characters long');
        return;
    }

    // بررسی تکراری نبودن نام کاربری
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.some(user => user.username === username)) {
        alert('Username already exists!');
        return;
    }

    // ذخیره کاربر جدید
    users.push({
        username,
        email,
        password
    });
    localStorage.setItem('users', JSON.stringify(users));

    alert('Account created successfully! Please login.');
    container.classList.remove("sign-up-mode");
    document.querySelector('.sign-up-form').reset();
}

function login(event) {
    event.preventDefault();
    
    const username = document.querySelector('.sign-in-form #username').value;
    const password = document.querySelector('.sign-in-form #password').value;

    // بررسی اعتبار اطلاعات ورود
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        // هدایت به صفحه اصلی
        window.location.href = 'home.html';
    } else {
        alert('Invalid username or password!');
    }
}

// اضافه کردن event listener به فرم‌ها
document.querySelector('.sign-up-form').addEventListener('submit', createAccount);
document.querySelector('.sign-in-form').addEventListener('submit', login);

// بررسی وضعیت لاگین در لود صفحه
window.addEventListener('load', () => {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser && window.location.pathname.endsWith('index.html')) {
        window.location.href = 'home.html';
    }
});

// اضافه کردن این کد به auth.js
document.addEventListener('DOMContentLoaded', () => {
    // اضافه کردن event listener به همه آیکون‌های چشم
    const toggleButtons = document.querySelectorAll('.password-toggle');
    
    toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            // پیدا کردن input پسورد مربوطه
            const passwordInput = button.previousElementSibling;
            
            // تغییر نوع input بین password و text
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                button.classList.remove('fa-eye-slash');
                button.classList.add('fa-eye');
            } else {
                passwordInput.type = 'password';
                button.classList.remove('fa-eye');
                button.classList.add('fa-eye-slash');
            }
        });
    });
}); 
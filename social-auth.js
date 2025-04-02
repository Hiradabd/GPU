// تنظیمات Firebase
const firebaseConfig = {
    // تنظیمات Firebase خود را اینجا قرار دهید
};

// مقداردهی اولیه Firebase
firebase.initializeApp(firebaseConfig);

// ارائه‌دهنده‌های احراز هویت
const googleProvider = new firebase.auth.GoogleAuthProvider();
const githubProvider = new firebase.auth.GithubAuthProvider();

// دکمه‌های ورود با شبکه‌های اجتماعی
document.getElementById('google-login').addEventListener('click', async (e) => {
    e.preventDefault();
    try {
        const result = await firebase.auth().signInWithPopup(googleProvider);
        const user = result.user;
        console.log('ورود با گوگل موفقیت‌آمیز بود:', user);
        // اینجا می‌توانید کاربر را به صفحه اصلی هدایت کنید
    } catch (error) {
        console.error('خطا در ورود با گوگل:', error);
    }
});

document.getElementById('github-login').addEventListener('click', async (e) => {
    e.preventDefault();
    try {
        const result = await firebase.auth().signInWithPopup(githubProvider);
        const user = result.user;
        console.log('ورود با گیت‌هاب موفقیت‌آمیز بود:', user);
        // اینجا می‌توانید کاربر را به صفحه اصلی هدایت کنید
    } catch (error) {
        console.error('خطا در ورود با گیت‌هاب:', error);
    }
}); 
// Navigation functions
function goBack() {
    window.location.href = 'nvidia-series.html';
}

function goToHome() {
    window.location.href = 'home.html';
}

// Logout function
function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
} 
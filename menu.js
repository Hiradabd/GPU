document.addEventListener('DOMContentLoaded', function() {
    // Create hamburger menu HTML
    const hamburgerHTML = `
        <div class="hamburger-menu">
            <div class="hamburger-icon">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
        <div class="sidebar">
            <div class="sidebar-header">
                <h3>Menu</h3>
                <button class="close-sidebar">&times;</button>
            </div>
            <div class="sidebar-menu">
                <ul>
                    <li><a href="index.html">Home</a></li>
                    <li><a href="rtx.html">RTX</a></li>
                    <li><a href="about.html">About</a></li>
                    <li><a href="contact.html">Contact</a></li>
                </ul>
            </div>
        </div>
        <div class="overlay"></div>
    `;

    // Insert the hamburger menu HTML at the beginning of the body
    document.body.insertAdjacentHTML('afterbegin', hamburgerHTML);

    // Get elements
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.overlay');
    const closeSidebar = document.querySelector('.close-sidebar');

    // Toggle sidebar
    function toggleSidebar() {
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
    }

    // Event listeners
    hamburgerMenu.addEventListener('click', toggleSidebar);
    closeSidebar.addEventListener('click', toggleSidebar);
    overlay.addEventListener('click', toggleSidebar);
}); 
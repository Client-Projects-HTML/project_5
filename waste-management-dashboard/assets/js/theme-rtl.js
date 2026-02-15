document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle
    const themeToggles = document.querySelectorAll('.theme-toggle');
    const body = document.body;

    function updateThemeIcons() {
        const isDark = body.classList.contains('dark');
        themeToggles.forEach(btn => {
            btn.innerHTML = isDark ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
        });
    }

    // Check local storage for theme
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark');
    }
    updateThemeIcons();

    themeToggles.forEach(btn => {
        btn.addEventListener('click', () => {
            body.classList.toggle('dark');
            const isDark = body.classList.contains('dark');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            updateThemeIcons();
        });
    });

    // RTL Toggle and Word Reversal Logic
    const rtlToggles = document.querySelectorAll('.rtl-toggle');
    const html = document.documentElement;


    // Check local storage for direction
    if (localStorage.getItem('direction') === 'rtl') {
        html.setAttribute('dir', 'rtl');
    } else {
        html.setAttribute('dir', 'ltr');
    }

    rtlToggles.forEach(btn => {
        btn.addEventListener('click', () => {
            const isRtl = html.getAttribute('dir') === 'rtl';
            if (isRtl) {
                html.setAttribute('dir', 'ltr');
                localStorage.setItem('direction', 'ltr');
            } else {
                html.setAttribute('dir', 'rtl');
                localStorage.setItem('direction', 'rtl');
            }
        });
    });

    // Mobile Menu Toggle
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');

    if (menuBtn && navMenu) {
        menuBtn.addEventListener('click', () => {
            const isActive = navMenu.classList.toggle('active');

            // Toggle body scroll
            document.body.style.overflow = isActive ? 'hidden' : '';

            // Toggle icon
            const icon = menuBtn.querySelector('i');
            if (isActive) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Public Navbar Login Dropdown
    const loginDropdownToggles = document.querySelectorAll('.login-dropdown-toggle');

    function closeLoginDropdown(wrapper) {
        wrapper.classList.remove('open');
        const toggle = wrapper.querySelector('.login-dropdown-toggle');
        if (toggle) toggle.setAttribute('aria-expanded', 'false');
    }

    if (loginDropdownToggles.length) {
        loginDropdownToggles.forEach(toggle => {
            toggle.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();

                const wrapper = toggle.closest('.login-dropdown-wrapper');
                if (!wrapper) return;

                const willOpen = !wrapper.classList.contains('open');
                document.querySelectorAll('.login-dropdown-wrapper.open').forEach(openWrapper => {
                    if (openWrapper !== wrapper) closeLoginDropdown(openWrapper);
                });

                wrapper.classList.toggle('open', willOpen);
                toggle.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
            });
        });
    }

    // Dashboard Sidebar Toggle (Mobile)
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');


    // Notification Dropdown Logic
    const bellBtn = document.getElementById('notificationBell');
    const notificationDropdown = document.getElementById('notificationDropdown');

    if (bellBtn && notificationDropdown) {
        bellBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            notificationDropdown.classList.toggle('active');
        });
    }

    // Global click listener to close sidebars and dropdowns
    document.addEventListener('click', (e) => {
        // Close public navbar login dropdown
        document.querySelectorAll('.login-dropdown-wrapper.open').forEach(wrapper => {
            if (!wrapper.contains(e.target)) closeLoginDropdown(wrapper);
        });

        // Close sidebar on mobile
        if (window.innerWidth <= 1024 &&
            sidebar && sidebar.classList.contains('active') &&
            !sidebar.contains(e.target) &&
            !sidebarToggle.contains(e.target)) {
            sidebar.classList.remove('active');
        }

        // Close notification dropdown
        if (notificationDropdown &&
            notificationDropdown.classList.contains('active') &&
            !notificationDropdown.contains(e.target) &&
            !bellBtn.contains(e.target)) {
            notificationDropdown.classList.remove('active');
        }
    });

    // Sidebar Close functionality (optional but good for UX)
    const closeModalBtns = document.querySelectorAll('.close-modal');
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal-backdrop');
            if (modal) {
                modal.style.display = 'none';
            }
        });
    });

    // Dashboard Sidebar Toggle With Overlay
    const mainContent = document.querySelector('.main-content');

    if (sidebar && sidebarToggle) {
        // Create Overlay if not exists
        let overlay = document.querySelector('.sidebar-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'sidebar-overlay';
            // Add styles dynamically or assume in CSS (better to add in CSS if possible, but JS for now to ensure)
            overlay.style.position = 'fixed';
            overlay.style.inset = '0';
            overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
            overlay.style.zIndex = '1050';
            overlay.style.display = 'none';
            overlay.style.opacity = '0';
            overlay.style.transition = 'opacity 0.3s';
            document.body.appendChild(overlay);
        }

        function toggleSidebar() {
            const isActive = sidebar.classList.toggle('active');

            if (isActive) {
                overlay.style.display = 'block';
                setTimeout(() => overlay.style.opacity = '1', 10);
                document.body.style.overflow = 'hidden';
            } else {
                overlay.style.opacity = '0';
                setTimeout(() => {
                    if (!sidebar.classList.contains('active')) {
                        overlay.style.display = 'none';
                    }
                }, 300);
                document.body.style.overflow = '';
            }
        }

        sidebarToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleSidebar();
        });

        overlay.addEventListener('click', () => {
            if (sidebar.classList.contains('active')) toggleSidebar();
        });

        // Close sidebar on route change / link click (optional)
        document.querySelectorAll('.nav-item').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 1024) toggleSidebar();
            });
        });
    }
});

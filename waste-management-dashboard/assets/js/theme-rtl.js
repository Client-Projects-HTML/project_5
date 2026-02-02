
document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle
    const toggleBtn = document.getElementById('themeToggle');
    const body = document.body;

    // Check local storage for theme
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark');
        if (toggleBtn) toggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
    }

    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            body.classList.toggle('dark');
            if (body.classList.contains('dark')) {
                localStorage.setItem('theme', 'dark');
                toggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
            } else {
                localStorage.setItem('theme', 'light');
                toggleBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
            }
        });
    }

    // RTL Toggle and Word Reversal Logic
    const rtlBtn = document.getElementById('rtlToggle');
    const html = document.documentElement;

    function reverseAllText() {
        // Function to reverse characters in a string while preserving word structure
        const reverseWordChars = (str) => {
            return str.split(' ').map(word => word.split('').reverse().join('')).join(' ');
        };

        const walker = document.createTreeWalker(
            document.body,
            NodeFilter.SHOW_TEXT,
            {
                acceptNode: function (node) {
                    // Skip scripts, styles, and empty nodes
                    const parent = node.parentElement.tagName.toLowerCase();
                    if (parent === 'script' || parent === 'style' || parent === 'i') {
                        return NodeFilter.FILTER_REJECT;
                    }
                    return node.textContent.trim().length > 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
                }
            }
        );

        let node;
        while (node = walker.nextNode()) {
            node.textContent = reverseWordChars(node.textContent);
        }
    }

    // Check local storage for direction
    if (localStorage.getItem('direction') === 'rtl') {
        html.setAttribute('dir', 'rtl');
        reverseAllText();
    } else {
        html.setAttribute('dir', 'ltr');
    }

    if (rtlBtn) {
        rtlBtn.innerHTML = '<i class="fa-solid fa-right-left"></i>';

        rtlBtn.addEventListener('click', () => {
            if (html.getAttribute('dir') === 'rtl') {
                html.setAttribute('dir', 'ltr');
                localStorage.setItem('direction', 'ltr');
                reverseAllText(); // Reverse back to normal
            } else {
                html.setAttribute('dir', 'rtl');
                localStorage.setItem('direction', 'rtl');
                reverseAllText(); // Apply reversal
            }
        });
    }

    // Mobile Menu Toggle
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');

    if (menuBtn && navMenu) {
        menuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');

            // Toggle icon
            const icon = menuBtn.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Dashboard Sidebar Toggle (Mobile)
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');

    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');
        });

        // Close sidebar when clicking outside on mobile
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 1024 &&
                sidebar.classList.contains('active') &&
                !sidebar.contains(e.target) &&
                !sidebarToggle.contains(e.target)) {
                sidebar.classList.remove('active');
            }
        });
    }
});

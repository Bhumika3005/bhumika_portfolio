document.addEventListener('DOMContentLoaded', () => {

    // --- Navbar Scroll Effect ---
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    });

    // --- Smooth Scrolling for Navigation Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // offset for fixed navbar
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Intersection Observer for Scroll Animations ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.05
    };

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                obs.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach(el => observer.observe(el));

    // --- Mobile Menu Toggle ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        const toggleMenu = () => {
            navLinks.classList.toggle('active');
            const isOpen = navLinks.classList.contains('active');
            const icon = hamburger.querySelector('i');
            if (icon) {
                if (isOpen) {
                    icon.classList.replace('fa-bars', 'fa-xmark');
                } else {
                    icon.classList.replace('fa-xmark', 'fa-bars');
                }
            }
        };

        const closeMenu = () => {
            navLinks.classList.remove('active');
            const icon = hamburger.querySelector('i');
            if (icon) {
                icon.classList.replace('fa-xmark', 'fa-bars');
            }
        };

        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu();
        });

        hamburger.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleMenu();
            }
        });

        // Hide mobile menu on link click
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                closeMenu();
            });
        });

        // Close menu on click outside
        document.addEventListener('click', (e) => {
            if (!navbar.contains(e.target)) {
                closeMenu();
            }
        });

        // Reset on desktop resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                closeMenu();
            }
        });
    }

    // --- Theme Toggle Logic ---
    const themeToggle = document.querySelector('#theme-toggle');
    if (themeToggle) {
        const themeIcon = themeToggle.querySelector('i');
        const body = document.body;

        // Check for saved theme
        const savedTheme = localStorage.getItem('portfolio-theme');
        if (savedTheme === 'light') {
            body.classList.add('light-mode');
            if (themeIcon) {
                themeIcon.classList.replace('fa-moon', 'fa-sun');
            }
        }

        const handleThemeToggle = () => {
            body.classList.toggle('light-mode');
            const isLight = body.classList.contains('light-mode');

            if (themeIcon) {
                if (isLight) {
                    themeIcon.classList.replace('fa-moon', 'fa-sun');
                    localStorage.setItem('portfolio-theme', 'light');
                } else {
                    themeIcon.classList.replace('fa-sun', 'fa-moon');
                    localStorage.setItem('portfolio-theme', 'dark');
                }
            }
        };

        themeToggle.addEventListener('click', handleThemeToggle);
        themeToggle.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleThemeToggle();
            }
        });
    }

});

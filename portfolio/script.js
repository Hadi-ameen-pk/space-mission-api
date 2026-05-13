// script.js - Interactive functionality for the Space Mission Dashboard Portfolio

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                const navList = document.querySelector('.nav-links');
                if (navList && navList.classList.contains('active')) {
                    navList.classList.remove('active');
                }
            }
        });
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Observe all sections for animation
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        observer.observe(section);
    });

    // Observe feature cards, tech cards, and screenshot cards
    const cards = document.querySelectorAll('.feature-card, .tech-card, .screenshot-card');
    cards.forEach(card => {
        observer.observe(card);
    });

    // Typing effect for hero subtitle (optional enhancement)
    const heroSubtitle = document.querySelector('.hero-subtitle');
    let originalText = '';

    if (heroSubtitle) {
        originalText = heroSubtitle.textContent;
        heroSubtitle.textContent = '';
    }

    let i = 0;
    const typeWriter = () => {
        if (!heroSubtitle || i >= originalText.length) return;
        heroSubtitle.textContent += originalText.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
    };

    // Start typing effect after a short delay
    if (heroSubtitle) {
        setTimeout(typeWriter, 1000);
    }

    // Parallax effect for stars (subtle movement)
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const stars = document.querySelector('.stars');
        if (stars) {
            stars.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Hover effect for tech icons (slight rotation)
    const techIcons = document.querySelectorAll('.tech-icon');
    techIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(5deg)';
            this.style.transition = 'transform 0.3s ease';
        });

        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });

    // Button ripple effect
    const buttons = document.querySelectorAll('.cta-button, .github-button');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            this.appendChild(ripple);

            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = e.clientX - rect.left - size / 2 + 'px';
            ripple.style.top = e.clientY - rect.top - size / 2 + 'px';

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Dynamic year update in footer
    const footerText = document.querySelector('.footer p');
    if (footerText) {
        const currentYear = new Date().getFullYear();
        footerText.innerHTML = footerText.innerHTML.replace('2026', currentYear);
    }

    // Mobile menu toggle (if needed for very small screens)
    const createMobileMenu = () => {
        if (window.innerWidth <= 480) {
            const navbar = document.querySelector('.navbar');
            const navLinks = document.querySelector('.nav-links');

            // Create hamburger menu button
            const menuToggle = document.createElement('button');
            menuToggle.classList.add('menu-toggle');
            menuToggle.innerHTML = '☰';
            menuToggle.style.display = 'none'; // Initially hidden, show if needed

            navbar.appendChild(menuToggle);

            menuToggle.addEventListener('click', function() {
                navLinks.classList.toggle('active');
            });
        }
    };

    createMobileMenu();

    // Resize handler for mobile menu
    window.addEventListener('resize', function() {
        const menuToggle = document.querySelector('.menu-toggle');
        if (window.innerWidth <= 480 && !menuToggle) {
            createMobileMenu();
        } else if (window.innerWidth > 480 && menuToggle) {
            menuToggle.remove();
            document.querySelector('.nav-links').classList.remove('active');
        }
    });
});

// Add CSS for fade-in animation and ripple effect
const style = document.createElement('style');
style.textContent = `
    .fade-in {
        opacity: 0;
        transform: translateY(30px);
        animation: fadeInUp 0.8s ease forwards;
    }

    @keyframes fadeInUp {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    }

    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    .menu-toggle {
        display: none;
        background: none;
        border: none;
        color: #00d4ff;
        font-size: 1.5rem;
        cursor: pointer;
        margin-left: auto;
    }

    @media (max-width: 480px) {
        .menu-toggle {
            display: block;
        }

        .nav-links {
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            background: rgba(26, 26, 46, 0.95);
            flex-direction: column;
            align-items: center;
            padding: 1rem 0;
            transform: translateY(-100%);
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }

        .nav-links.active {
            transform: translateY(0);
            opacity: 1;
            visibility: visible;
        }

        .nav-links li {
            margin: 0.5rem 0;
        }
    }
`;
document.head.appendChild(style);

// Console log for debugging (remove in production)
console.log('Space Mission Dashboard Portfolio loaded successfully!');
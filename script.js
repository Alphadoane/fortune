/*
    Premium Portfolio Interactivity
    Author: Antigravity
*/

document.addEventListener('DOMContentLoaded', () => {
    // 1. Navigation Scroll Effect
    const nav = document.getElementById('main-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // 2. Mobile Menu Toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    mobileMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = mobileMenu.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
    });

    // Add Mobile Menu CSS Dynamically
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 768px) {
            .nav-links {
                display: none;
                flex-direction: column;
                position: absolute;
                top: 100%;
                left: 0;
                width: 100%;
                background: var(--dark-bg);
                padding: 2rem;
                text-align: center;
                gap: 1.5rem;
                border: 1px solid var(--glass-border);
            }
            .nav-links.active {
                display: flex;
            }
        }
    `;
    document.head.appendChild(style);

    // 3. Simple Scroll Reveal
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Apply reveal to some elements
    const revealElements = document.querySelectorAll('.glass, .section-title, .timeline-item');
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });

    // 4. Contact Form Handling (Prevent actual submission)
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerText;
            
            btn.innerText = 'Sending...';
            btn.disabled = true;

            setTimeout(() => {
                btn.innerText = 'Message Sent!';
                btn.style.backgroundColor = '#10b981';
                contactForm.reset();

                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.disabled = false;
                    btn.style.backgroundColor = '';
                }, 3000);
            }, 1500);
        });
    }

    // 5. Staggered reveal for hero text
    const heroElements = document.querySelectorAll('#hero .fade-in');
    heroElements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.2}s`;
    });
});

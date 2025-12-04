/**
 * Meevbrandz - Ultra Fast & Mobile-Optimized JavaScript
 * Custom cursor ONLY on desktop · Zero lag on phones
 * December 2025
 */

document.addEventListener('DOMContentLoaded', () => {

    // ==================================================================
    // 1. CUSTOM CURSOR — ONLY ON DESKTOP WITH MOUSE (zero cost on mobile)
    // ==================================================================
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    const isDesktop = window.innerWidth >= 1024;

    if (hasFinePointer && isDesktop) {
        const cursorDot = document.createElement('div');
        const cursorOutline = document.createElement('div');
        cursorDot.className = 'cursor-dot';
        cursorOutline.className = 'cursor-outline';
        document.body.appendChild(cursorDot);
        document.body.appendChild(cursorOutline);

        let mouseX = 0, mouseY = 0;
        let dotX = 0, dotY = 0;
        let outlineX = 0, outlineY = 0;
        const speedDot = 1;
        const speedOutline = 0.18;

        const updateCursor = () => {
            dotX += (mouseX - dotX) * speedDot;
            dotY += (mouseY - dotY) * speedDot;
            outlineX += (mouseX - outlineX) * speedOutline;
            outlineY += (mouseY - outlineY) * speedOutline;

            cursorDot.style.transform = `translate(${dotX}px, ${dotY}px)`;
            cursorOutline.style.transform = `translate(${outlineX}px, ${outlineY}px) translate(-50%, -50%)`;

            requestAnimationFrame(updateCursor);
        };

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        // Hover effect (buttons, links, gallery items)
        document.querySelectorAll('a, button, .gallery-item, .btn, [data-cursor-hover]').forEach(el => {
            el.addEventListener('mouseenter', () => cursorOutline.classList.add('hover'));
            el.addEventListener('mouseleave', () => cursorOutline.classList.remove('hover'));
        });

        requestAnimationFrame(updateCursor);
    }
    // ← On phones/tablets: nothing happens → 0 overhead


    // ==================================================================
    // 2. SCROLL REVEAL ANIMATIONS
    // ==================================================================
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px'
    });

    document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-fade').forEach(el => {
        revealObserver.observe(el);
    });


    // ==================================================================
    // 3. MOBILE MENU
    // ==================================================================
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', () => {
            const isActive = navLinks.classList.toggle('active');
            mobileBtn.setAttribute('aria-expanded', isActive);
            mobileBtn.textContent = isActive ? '✕' : '☰';
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileBtn.textContent = '☰';
            });
        });
    }


    // ==================================================================
    // 4. NAVBAR SHRINK ON SCROLL (throttled)
    // ==================================================================
    const navbar = document.querySelector('.navbar');
    let ticking = false;

    const updateNavbar = () => {
        navbar.classList.toggle('scrolled', window.scrollY > 80);
        ticking = false;
    };

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    });

    // Initial check
    updateNavbar();


    // ==================================================================
    // 5. SMOOTH SCROLL FOR ANCHOR LINKS
    // ==================================================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                history.pushState(null, null, anchor.getAttribute('href'));
            }
        });
    });
});
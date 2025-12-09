// js/main.js — ZERO LAG VERSION (Dec 2025)
document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // 1. SCROLL REVEAL — super light + unobserve after reveal
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target); // ← stops watching = huge win
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-fade')
            .forEach(el => observer.observe(el));
    }

    // 2. MOBILE MENU — perfect as-is
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', () => {
            const expanded = navLinks.classList.toggle('active');
            mobileBtn.setAttribute('aria-expanded', expanded);
            mobileBtn.textContent = expanded ? '×' : '☰';
        });
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileBtn.textContent = '☰';
                mobileBtn.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // 3. NAVBAR SHRINK — passive listener only
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            navbar.classList.toggle('scrolled', window.scrollY > 60);
        }, { passive: true });
    }

    // 4. SMOOTH SCROLL — native
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', e => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
                history.pushState(null, '', anchor.getAttribute('href'));
            }
        });
    });

    // 5. Fade in page (removes body opacity:0)
    document.body.classList.add('loaded');
});
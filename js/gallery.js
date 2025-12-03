/**
 * Gallery Lightbox Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = lightbox.querySelector('img');
    const closeBtn = document.querySelector('.lightbox-close');

    // Open Lightbox
    items.forEach(item => {
        item.addEventListener('click', () => {
            const src = item.getAttribute('data-src');
            lightboxImg.src = src;
            lightbox.classList.add('active');
        });
    });

    // Close Lightbox
    closeBtn.addEventListener('click', () => {
        lightbox.classList.remove('active');
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
        }
    });

    // TODO: Insert Supabase fetch for gallery here
    // Example:
    // SupabaseService.getGalleryItems().then(items => { ... render items ... });
});

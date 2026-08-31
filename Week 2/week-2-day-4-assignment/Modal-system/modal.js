// Selecting relevant DOM items
const triggerButtons = document.querySelectorAll('[data-modal-target]');
const modalOverlays = document.querySelectorAll('.modal-overlay');

const openModal = modal => {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
};

const closeModal = modal => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
};

// Opening the matching modal for each "Learn More" button
triggerButtons.forEach(button => {
    const modal = document.getElementById(button.dataset.modalTarget);
    button.addEventListener('click', () => openModal(modal));
});

modalOverlays.forEach(overlay => {
    // Closing via the "x" and "Close" buttons inside this modal
    overlay.querySelectorAll('.modal-close, .modal-close-btn').forEach(closeBtn => {
        closeBtn.addEventListener('click', () => closeModal(overlay));
    });

    // Closing when clicking the dark overlay itself, not the modal box
    overlay.addEventListener('click', e => {
        if (e.target === overlay) {
            closeModal(overlay);
        }
    });
});

// Closing the currently open modal with the Escape key
document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;

    const openModalOverlay = document.querySelector('.modal-overlay.active');
    if (openModalOverlay) {
        closeModal(openModalOverlay);
    }
});

document.addEventListener('DOMContentLoaded', function () {
    console.log('Support JS loaded');

    const ticketForm = document.getElementById('ticketForm');
    const infoModal = document.getElementById('infoModal');
    const ticketModal = document.getElementById('ticketModal');
    const closeModalBtns = document.querySelectorAll('.close-modal');

    // Toast Helper
    function showToast(title, message, type = 'success') {
        let container = document.querySelector('.toast-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'toast-container';
            document.body.appendChild(container);
        }

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        const icon = type === 'success' ? 'fa-circle-check' : (type === 'error' ? 'fa-circle-xmark' : 'fa-triangle-exclamation');

        toast.innerHTML = `
            <div class="toast-icon"><i class="fa-solid ${icon}"></i></div>
            <div class="toast-content">
                <span class="toast-title">${title}</span>
                <span class="toast-message">${message}</span>
            </div>
        `;

        container.appendChild(toast);
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(100%)';
            setTimeout(() => toast.remove(), 300);
        }, 4000);
    }

    // Helper to show info modal
    function showInfoModal(title, message, iconClass = 'fa-circle-check', color = 'var(--primary)') {
        if (!infoModal) return;
        document.getElementById('infoModalTitle').textContent = title;
        document.getElementById('infoModalMessage').innerHTML = message.replace(/\n/g, '<br>');
        const iconDiv = document.getElementById('infoModalIcon');
        iconDiv.innerHTML = `<i class="fa-solid ${iconClass}"></i>`;
        iconDiv.style.color = color;
        infoModal.style.display = 'flex';
    }

    if (ticketForm) {
        ticketForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const subject = document.getElementById('ticketSubject').value;
            const description = document.getElementById('ticketDescription').value;
            const project = document.getElementById('ticketProject') ? document.getElementById('ticketProject').value : 'General';

            if (!subject || !description) {
                showToast('Missing Info', 'Please fill in all required fields.', 'error');
                return;
            }

            // Simulate ticket creation
            const submitBtn = ticketForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Submitting...';
            submitBtn.disabled = true;

            setTimeout(() => {
                const ticketId = 'TKT-' + Math.floor(1000 + Math.random() * 9000);

                // Close creation modal
                if (ticketModal) ticketModal.style.display = 'none';

                // Show Success Toast
                showToast('Ticket Created', `Support ticket ${ticketId} for ${project} has been generated.`);

                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                ticketForm.reset();
            }, 1200);
        });
    }

    // Satisfaction Survey Trigger (Mock for demonstration)
    const resolvedTickets = document.querySelectorAll('.status-success');
    resolvedTickets.forEach(badge => {
        const row = badge.closest('.ticket-row');
        if (row) {
            row.addEventListener('click', () => {
                showSatisfactionSurvey();
            });
        }
    });

    function showSatisfactionSurvey() {
        showInfoModal(
            'How did we do?',
            `We'd love to hear your feedback on this ticket.<br>
            <div class="survey-stars">
                <button class="star-btn"><i class="fa-solid fa-star"></i></button>
                <button class="star-btn"><i class="fa-solid fa-star"></i></button>
                <button class="star-btn"><i class="fa-solid fa-star"></i></button>
                <button class="star-btn"><i class="fa-solid fa-star"></i></button>
                <button class="star-btn"><i class="fa-solid fa-star"></i></button>
            </div>
            <textarea class="form-input" placeholder="Any comments?" rows="2"></textarea>`,
            'fa-comment-dots'
        );

        // Add star interaction logic after modal is open
        setTimeout(() => {
            const stars = document.querySelectorAll('.star-btn');
            stars.forEach((star, index) => {
                star.addEventListener('click', () => {
                    stars.forEach((s, i) => s.classList.toggle('active', i <= index));
                    showToast('Thank you!', 'Your feedback helps us improve.');
                    setTimeout(() => { if (infoModal) infoModal.style.display = 'none'; }, 800);
                });
            });
        }, 100);
    }

    // Modal Closing Logic
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (infoModal) infoModal.style.display = 'none';
            if (ticketModal) ticketModal.style.display = 'none';
        });
    });

    window.addEventListener('click', (e) => {
        if (e.target === infoModal) infoModal.style.display = 'none';
        if (e.target === ticketModal) ticketModal.style.display = 'none';
    });
});

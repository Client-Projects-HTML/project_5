document.addEventListener('DOMContentLoaded', function () {
    console.log('Schedule Pickup JS loaded');

    const pickupForm = document.getElementById('pickupForm');
    const infoModal = document.getElementById('infoModal');
    const closeModalBtns = document.querySelectorAll('.close-modal');

    // Helper to show info modal (reused pattern)
    function showInfoModal(title, message, iconClass = 'fa-circle-check', color = 'var(--primary)') {
        if (!infoModal) return;
        document.getElementById('infoModalTitle').textContent = title;
        document.getElementById('infoModalMessage').innerHTML = message.replace(/\n/g, '<br>');
        const iconDiv = document.getElementById('infoModalIcon');
        iconDiv.innerHTML = `<i class="fa-solid ${iconClass}"></i>`;
        iconDiv.style.color = color;
        infoModal.style.display = 'flex';
    }

    if (pickupForm) {
        pickupForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const type = document.getElementById('pickupType').value;
            const date = document.getElementById('pickupDate').value;

            if (!type || !date) {
                showInfoModal('Incomplete Form', 'Please select a pickup type and preferred date.', 'fa-circle-exclamation', 'var(--warning)');
                return;
            }

            // Simulate submission
            const submitBtn = pickupForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Submitting...';
            submitBtn.disabled = true;

            setTimeout(() => {
                showInfoModal(
                    'Request Submitted',
                    `Your <b>${type}</b> request for <b>${date}</b> has been received.<br><br>A confirmation email has been sent to your registered address.`,
                    'fa-calendar-check'
                );

                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                pickupForm.reset();
            }, 1500);
        });
    }

    // Modal Closing Logic
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (infoModal) infoModal.style.display = 'none';
        });
    });

    window.addEventListener('click', (e) => {
        if (e.target === infoModal) {
            infoModal.style.display = 'none';
        }
    });
});

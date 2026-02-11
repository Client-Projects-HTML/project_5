document.addEventListener('DOMContentLoaded', function () {
    console.log('Billing JS loaded');

    const payNowBtn = document.getElementById('payNowBtn');
    const downloadStatementBtn = document.getElementById('downloadStatementBtn');
    const downloadInvoiceBtns = document.querySelectorAll('.download-invoice-btn');
    const infoModal = document.getElementById('infoModal');
    const closeModalBtns = document.querySelectorAll('.close-modal');

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

    // Pay Now simulation
    if (payNowBtn) {
        payNowBtn.addEventListener('click', () => {
            const originalText = payNowBtn.innerHTML;
            payNowBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Processing...';
            payNowBtn.disabled = true;

            setTimeout(() => {
                showInfoModal(
                    'Payment Successful',
                    'Your payment of <b>$450.00</b> has been processed successfully.<br>Transaction ID: #TXN-9928374<br><br>Thank you for your timely payment!',
                    'fa-credit-card'
                );
                payNowBtn.innerHTML = originalText;
                payNowBtn.disabled = false;

                // Optional: UI update for balance
                const balanceStrong = payNowBtn.closest('.card').querySelector('strong');
                if (balanceStrong) {
                    balanceStrong.textContent = '$0.00';
                    balanceStrong.className = 'text-success';
                }
                payNowBtn.style.display = 'none';
            }, 2000);
        });
    }

    // Download Statement
    if (downloadStatementBtn) {
        downloadStatementBtn.addEventListener('click', () => {
            showInfoModal(
                'Statement Generated',
                'Your account statement for the current quarter is being generated.<br>File: <code>statement_oct_2026.pdf</code><br><br>Your download will begin shortly.',
                'fa-file-pdf'
            );
        });
    }

    // Individual Invoices
    downloadInvoiceBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const row = btn.closest('tr');
            const invId = row ? row.cells[0].textContent : 'Invoice';
            showInfoModal(
                'Invoice Downloaded',
                `Downloading <b>${invId}</b>...<br>The file has been saved to your downloads folder.`,
                'fa-file-invoice-dollar'
            );
        });
    });

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

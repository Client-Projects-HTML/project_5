document.addEventListener('DOMContentLoaded', function () {
    console.log('Reports Management JS loaded');

    // DOM Elements
    const exportAllBtn = document.getElementById('exportAllReportsBtn');
    const customReportForm = document.getElementById('customReportForm');
    const downloadBtns = document.querySelectorAll('.download-report-btn');

    // Modal Elements
    const downloadModal = document.getElementById('downloadModal');
    const modalReportTitle = document.getElementById('modalReportTitle');
    const modalReportMessage = document.getElementById('modalReportMessage');
    const confirmDownloadBtn = document.getElementById('confirmDownloadBtn');
    const closeModalBtns = document.querySelectorAll('.close-modal');

    // Handle Individual Report Downloads
    downloadBtns.forEach(btn => {
        btn.addEventListener('click', function (e) {
            const card = e.target.closest('.report-card');
            const reportName = card ? card.getAttribute('data-report-name') : 'Report';

            // Visual feedback
            const originalContent = this.innerHTML;
            this.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Preparing...';
            this.disabled = true;

            setTimeout(() => {
                this.innerHTML = '<i class="fa-solid fa-check"></i> Ready';
                this.style.borderColor = 'var(--success)';
                this.style.color = 'var(--success)';

                // Open Custom Modal instead of alert
                if (downloadModal) {
                    modalReportTitle.textContent = reportName;
                    modalReportMessage.textContent = `The "${reportName}" is now ready. Click below to save it to your device.`;
                    downloadModal.style.display = 'flex';
                }

                // Revert button after a delay
                setTimeout(() => {
                    this.innerHTML = originalContent;
                    this.disabled = false;
                    this.style.borderColor = '';
                    this.style.color = '';
                }, 3000);
            }, 1000);
        });
    });

    // Modal Controls
    if (confirmDownloadBtn) {
        confirmDownloadBtn.addEventListener('click', () => {
            if (downloadModal) downloadModal.style.display = 'none';
        });
    }

    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (downloadModal) downloadModal.style.display = 'none';
        });
    });

    // Close on backdrop click
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-backdrop')) {
            if (downloadModal) downloadModal.style.display = 'none';
        }
    });

    // Handle Export All
    if (exportAllBtn) {
        exportAllBtn.addEventListener('click', function () {
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Archiving...';
            this.disabled = true;

            setTimeout(() => {
                if (downloadModal) {
                    modalReportTitle.textContent = "All Reports Bundle";
                    modalReportMessage.textContent = "All system reports have been bundled into a ZIP archive. Your download is starting.";
                    downloadModal.style.display = 'flex';
                }
                this.innerHTML = originalText;
                this.disabled = false;
            }, 2000);
        });
    }

    // Handle Custom Report Generation
    if (customReportForm) {
        customReportForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const type = document.getElementById('customReportType').value;
            const date = document.getElementById('customReportDate').value;

            if (!date) {
                if (downloadModal) {
                    modalReportTitle.textContent = "Selection Required";
                    modalReportMessage.textContent = "Please select a valid date range before generating the custom report.";
                    const iconContainer = downloadModal.querySelector('.fa-cloud-arrow-down').parentElement;
                    if (iconContainer) {
                        iconContainer.style.background = '#FEF2F2';
                        iconContainer.style.color = '#EF4444';
                        iconContainer.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i>';
                    }
                    downloadModal.style.display = 'flex';
                }
                return;
            }

            const generateBtn = document.getElementById('generateReportBtn');
            const originalText = generateBtn.textContent;

            generateBtn.innerHTML = '<i class="fa-solid fa-gear fa-spin"></i> Processing Data...';
            generateBtn.disabled = true;

            setTimeout(() => {
                if (downloadModal) {
                    modalReportTitle.textContent = `${type} Prepared`;
                    modalReportMessage.textContent = `Your custom report for ${date} has been generated successfully.`;
                    const iconContainer = downloadModal.querySelector('.fa-triangle-exclamation')?.parentElement || downloadModal.querySelector('.fa-cloud-arrow-down')?.parentElement;
                    if (iconContainer) {
                        iconContainer.style.background = '#ECFDF5';
                        iconContainer.style.color = '#10B981';
                        iconContainer.innerHTML = '<i class="fa-solid fa-cloud-arrow-down"></i>';
                    }
                    downloadModal.style.display = 'flex';
                }
                generateBtn.textContent = originalText;
                generateBtn.disabled = false;
                customReportForm.reset();
            }, 2500);
        });
    }
});

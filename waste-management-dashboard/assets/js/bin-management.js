document.addEventListener('DOMContentLoaded', function () {
    console.log('Bin Management JS loaded');

    // DOM Elements
    const searchInput = document.getElementById('binSearchInput');
    const typeFilter = document.getElementById('binTypeFilter');
    const statusFilter = document.getElementById('binStatusFilter');
    const binsGrid = document.getElementById('binsGrid');
    const binCards = document.querySelectorAll('.bin-card');

    // Modal Elements
    const addBinModal = document.getElementById('addBinModal');
    const binDetailsModal = document.getElementById('binDetailsModal');
    const addNewBinBtn = document.getElementById('addNewBinBtn');
    const closeModalBtns = document.querySelectorAll('.close-modal');

    // Filter State
    let currentStatusFilter = 'all';

    console.log('Elements initialized:', {
        searchInput: !!searchInput,
        typeFilter: !!typeFilter,
        statusFilter: !!statusFilter,
        binsGrid: !!binsGrid,
        binCardsCount: binCards.length,
        addBinModal: !!addBinModal,
        binDetailsModal: !!binDetailsModal
    });

    // Search and Filter Logic
    function filterBins() {
        if (!searchInput || !typeFilter || !statusFilter) return;

        const searchTerm = searchInput.value.toLowerCase();
        const selectedType = typeFilter.value;
        const selectedStatus = statusFilter.value;

        binCards.forEach(card => {
            const binId = (card.getAttribute('data-bin-id') || '').toLowerCase();
            const binLocation = (card.getAttribute('data-location') || '').toLowerCase();
            const binType = card.getAttribute('data-type');
            const binStatus = card.getAttribute('data-status');

            const matchesSearch = binId.includes(searchTerm) || binLocation.includes(searchTerm);
            const matchesType = selectedType === 'all' || binType === selectedType;
            const matchesStatus = selectedStatus === 'all' || binStatus === selectedStatus;

            card.style.display = (matchesSearch && matchesType && matchesStatus) ? 'block' : 'none';
        });
    }

    // Event Listeners for Filters
    if (searchInput) searchInput.addEventListener('input', filterBins);
    if (typeFilter) typeFilter.addEventListener('change', filterBins);
    if (statusFilter) statusFilter.addEventListener('change', filterBins);

    // Modal Logic
    if (addNewBinBtn && addBinModal) {
        addNewBinBtn.addEventListener('click', () => {
            console.log('Opening Add Bin Modal');
            addBinModal.style.display = 'flex';
        });
    }

    // Info Modal Helper
    const infoModal = document.getElementById('infoModal');
    function showInfoModal(title, message, icon = 'fa-circle-check', color = '#10B981', bgColor = '#ECFDF5') {
        if (!infoModal) return;
        document.getElementById('infoModalTitle').textContent = title;
        document.getElementById('infoModalMessage').textContent = message;
        const iconEl = document.getElementById('infoModalIcon');
        iconEl.className = `fa-solid ${icon}`;
        iconEl.parentElement.style.color = color;
        iconEl.parentElement.style.background = bgColor;
        infoModal.style.display = 'flex';
    }

    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (addBinModal) addBinModal.style.display = 'none';
            if (binDetailsModal) binDetailsModal.style.display = 'none';
            if (infoModal) infoModal.style.display = 'none';
        });
    });

    // Close on backdrop click for modals
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-backdrop')) {
            if (addBinModal) addBinModal.style.display = 'none';
            if (binDetailsModal) binDetailsModal.style.display = 'none';
            if (infoModal) infoModal.style.display = 'none';
        }
    });

    // Action Buttons (delegated)
    if (binsGrid) {
        binsGrid.addEventListener('click', (e) => {
            const viewBtn = e.target.closest('.view-details-btn');
            const pickupBtn = e.target.closest('.schedule-pickup-btn');
            const repairBtn = e.target.closest('.log-repair-btn');

            if (viewBtn) {
                const card = viewBtn.closest('.bin-card');
                if (!card || !binDetailsModal) return;

                const binId = card.getAttribute('data-bin-id');
                const binLocation = card.getAttribute('data-location');
                const binType = card.getAttribute('data-type');
                const binStatus = card.getAttribute('data-status');

                document.getElementById('modalBinTitle').textContent = `Bin #${binId} Details`;
                document.getElementById('modalBinLocation').textContent = binLocation;
                document.getElementById('modalBinType').textContent = binType;

                const statusBadge = document.getElementById('modalBinStatus');
                if (statusBadge) {
                    statusBadge.textContent = binStatus;
                    statusBadge.className = 'status-badge';
                    if (binStatus === 'Full') statusBadge.classList.add('status-danger');
                    else if (binStatus === 'Active') statusBadge.classList.add('status-success');
                    else if (binStatus === 'Wait') statusBadge.classList.add('status-warning');
                    else statusBadge.classList.add('status-info');
                }

                binDetailsModal.style.display = 'flex';
            }

            if (pickupBtn) {
                const card = pickupBtn.closest('.bin-card');
                const binId = card ? card.getAttribute('data-bin-id') : 'Unknown';
                showInfoModal('Pickup Scheduled', `Pickup for Bin #${binId} has been added to the next available route. Logistics team notified.`);
                pickupBtn.textContent = 'Scheduled';
                pickupBtn.disabled = true;
                pickupBtn.style.opacity = '0.7';
            }

            if (repairBtn) {
                const card = repairBtn.closest('.bin-card');
                const binId = card ? card.getAttribute('data-bin-id') : 'Unknown';

                if (repairBtn.textContent.trim() === 'Logged') {
                    showInfoModal('Ticket Status', `Maintenance for Bin #${binId} is currently in progress. Ticket status: IN_QUEUE.\nExpected completion: Tomorrow, 4:00 PM.`, 'fa-clock', '#F59E0B', '#FFFBEB');
                } else {
                    showInfoModal('Repair Logged', `Repair request for Bin #${binId} has been submitted. Maintenance ticket #TKT-${Math.floor(Math.random() * 9000) + 1000} created.`);
                    repairBtn.textContent = 'Logged';
                    repairBtn.style.opacity = '0.7';
                }
            }
        });
    }

    // Add Bin Form Submission
    const addBinForm = document.getElementById('addBinForm');
    if (addBinForm && addBinModal) {
        addBinForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const binId = addBinForm.querySelector('input[type="text"]').value;
            showInfoModal('Bin Added', `New bin #${binId} has been successfully registered in the system and assigned to its zone.`);
            addBinModal.style.display = 'none';
            addBinForm.reset();
        });
    }
});

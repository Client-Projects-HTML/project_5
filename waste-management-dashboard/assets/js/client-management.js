document.addEventListener('DOMContentLoaded', function () {
    console.log('Client Management JS loaded');

    // DOM Elements
    const searchInput = document.getElementById('clientSearchInput');
    const typeFilter = document.getElementById('clientTypeFilter');
    const applyFilterBtn = document.getElementById('applyFilterBtn');
    const exportClientsBtn = document.getElementById('exportClientsBtn');
    const clientsTableBody = document.getElementById('clientsTableBody');
    const clientRows = document.querySelectorAll('.client-row');

    // Modal Elements
    const addClientModal = document.getElementById('addClientModal');
    const clientDetailsModal = document.getElementById('clientDetailsModal');
    const infoModal = document.getElementById('infoModal');
    const addClientBtn = document.getElementById('addClientBtn');
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

    // Search and Filter Logic
    function filterClients() {
        if (!searchInput || !typeFilter) return;

        const searchTerm = searchInput.value.toLowerCase();
        const selectedType = typeFilter.value;

        clientRows.forEach(row => {
            const name = (row.getAttribute('data-name') || '').toLowerCase();
            const company = (row.getAttribute('data-company') || '').toLowerCase();
            const email = (row.getAttribute('data-email') || '').toLowerCase();
            const type = row.getAttribute('data-type');

            const matchesSearch = name.includes(searchTerm) ||
                company.includes(searchTerm) ||
                email.includes(searchTerm);

            const matchesType = selectedType === 'all' || type === selectedType;

            row.style.display = (matchesSearch && matchesType) ? 'table-row' : 'none';
        });
    }

    // Event Listeners for Filters
    if (searchInput) searchInput.addEventListener('input', filterClients);
    if (typeFilter) typeFilter.addEventListener('change', filterClients);

    if (applyFilterBtn) {
        applyFilterBtn.addEventListener('click', () => {
            filterClients();
            const visibleRows = Array.from(clientRows).filter(row => row.style.display !== 'none').length;
            showInfoModal('Filters Applied', `Advanced filters applied!<br>Found <b>${visibleRows}</b> clients matching your current criteria.`, 'fa-filter');
        });
    }

    if (exportClientsBtn) {
        exportClientsBtn.addEventListener('click', () => {
            const date = new Date().toISOString().split('T')[0];
            showInfoModal('Export Started', `Exporting Client Database...<br>Format: <b>CSV</b><br>Total Records: <b>128</b><br>Filename: <code>eco_track_clients_${date}.csv</code><br><br>Your download will start automatically soon.`, 'fa-file-export');
        });
    }

    // Modal Logic
    if (addClientBtn && addClientModal) {
        addClientBtn.addEventListener('click', () => {
            addClientModal.style.display = 'flex';
        });
    }

    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (addClientModal) addClientModal.style.display = 'none';
            if (clientDetailsModal) clientDetailsModal.style.display = 'none';
            if (infoModal) infoModal.style.display = 'none';
        });
    });

    // Close on backdrop click
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-backdrop')) {
            if (addClientModal) addClientModal.style.display = 'none';
            if (clientDetailsModal) clientDetailsModal.style.display = 'none';
            if (infoModal) infoModal.style.display = 'none';
        }
    });

    // Action Buttons in Table
    if (clientsTableBody) {
        clientsTableBody.addEventListener('click', (e) => {
            const actionBtn = e.target.closest('.client-action-btn');

            if (actionBtn) {
                const row = actionBtn.closest('.client-row');
                if (!row || !clientDetailsModal) return;

                const name = row.getAttribute('data-name');
                const type = row.getAttribute('data-type');
                const email = row.getAttribute('data-email');
                const status = row.getAttribute('data-status');

                document.getElementById('modalClientTitle').textContent = `${name} Details`;
                document.getElementById('modalClientEmail').textContent = email;
                document.getElementById('modalClientType').textContent = type;

                const statusBadge = document.getElementById('modalClientStatus');
                if (statusBadge) {
                    statusBadge.textContent = status;
                    statusBadge.className = 'status-badge'; // Reset classes

                    if (status === 'Active') statusBadge.classList.add('status-success');
                    else if (status === 'Expiring Soon') statusBadge.classList.add('status-warning');
                    else if (status === 'Overdue') statusBadge.classList.add('status-danger');
                    else statusBadge.style.cssText = 'background: #F3F4F6; color: #374151;';
                }

                clientDetailsModal.style.display = 'flex';
            }
        });
    }

    // Add Client Form Submission
    const addClientForm = document.getElementById('addClientForm');
    if (addClientForm && addClientModal) {
        addClientForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showInfoModal('Client Added', 'New client account created successfully!', 'fa-user-check');
            addClientModal.style.display = 'none';
            addClientForm.reset();
        });
    }
});

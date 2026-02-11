document.addEventListener('DOMContentLoaded', function () {
    console.log('Route Planning JS loaded');

    // Initialize Map (NYC center for demo)
    const map = L.map('map').setView([40.7128, -74.0060], 13);

    // Add Tiles (OpenStreetMap CartoDB Voyager - cleaner for dashboards)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; OpenStreetMap &copy; CartoDB',
        subdomains: 'abcd',
        maxZoom: 20
    }).addTo(map);

    // Sample Truck Locations
    const trucks = [
        { id: 'Truck #04', pos: [40.7128, -74.0060], status: 'Active', driver: 'Mike S.' },
        { id: 'Truck #11', pos: [40.7306, -73.9352], status: 'Idle', driver: 'Unassigned' },
        { id: 'Truck #02', pos: [40.6782, -73.9442], status: 'Active', driver: 'Sarah J.' }
    ];

    // Custom Truck Icon
    const truckIcon = L.divIcon({
        html: '<i class="fa-solid fa-truck" style="color: #10B981; font-size: 20px; text-shadow: 0 0 3px #fff;"></i>',
        className: 'custom-div-icon',
        iconSize: [24, 24],
        iconAnchor: [12, 12]
    });

    // Add Truck Markers
    trucks.forEach(truck => {
        L.marker(truck.pos, { icon: truckIcon })
            .addTo(map)
            .bindPopup(`<b>${truck.id}</b><br>Driver: ${truck.driver}<br>Status: ${truck.status}`);
    });

    // Sample Route Line (Route A-12)
    const routePoints = [
        [40.7128, -74.0060],
        [40.7150, -74.0100],
        [40.7200, -74.0080],
        [40.7250, -73.9960],
        [40.7300, -73.9900]
    ];

    const routeLine = L.polyline(routePoints, {
        color: '#3b82f6',
        weight: 4,
        opacity: 0.7,
        dashArray: '10, 10'
    }).addTo(map);

    routeLine.bindPopup("<b>Route A-12</b><br>In Progress (65% Complete)");

    // Info Modal Helper
    const infoModal = document.getElementById('infoModal');
    const closeModalBtns = document.querySelectorAll('.close-modal');

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
            if (infoModal) infoModal.style.display = 'none';
        });
    });

    // Close on backdrop click for modals
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-backdrop')) {
            if (infoModal) infoModal.style.display = 'none';
        }
    });

    // Button Listeners
    const historyBtn = document.getElementById('routeHistoryBtn');
    const optimizeBtn = document.getElementById('autoOptimizeBtn');

    if (historyBtn) {
        historyBtn.addEventListener('click', () => {
            showInfoModal('Route History', 'Loading historical route data from the last 30 days... This may take a moment.', 'fa-clock', '#3b82f6', '#eff6ff');
        });
    }

    if (optimizeBtn) {
        optimizeBtn.addEventListener('click', () => {
            const btn = optimizeBtn;
            const originalText = btn.innerHTML;

            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Optimizing...';
            btn.disabled = true;

            setTimeout(() => {
                showInfoModal('Optimization Complete', 'Routes adjusted for real-time traffic. 12% reduction in fuel usage estimated.', 'fa-wand-magic-sparkles', '#10B981', '#ECFDF5');
                btn.innerHTML = originalText;
                btn.disabled = false;
            }, 1500);
        });
    }

    // Fix map size on container resize (if needed)
    setTimeout(() => {
        map.invalidateSize();
    }, 100);
});

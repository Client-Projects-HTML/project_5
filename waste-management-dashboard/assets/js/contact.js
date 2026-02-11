
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const successModal = document.getElementById('contactSuccessModal');
    const closeModalBtns = document.querySelectorAll('.close-modal');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const submitBtn = document.getElementById('submitContactBtn');
            const originalText = submitBtn.innerHTML;

            // Simple validation check (HTML5 'required' is already there, but good to have)
            const firstName = document.getElementById('firstName').value;
            const email = document.getElementById('emailAddress').value;
            const message = document.getElementById('message').value;

            if (!firstName || !email || !message) {
                return; // Let browser validation handle it
            }

            // Simulated submission
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;

            setTimeout(() => {
                if (successModal) {
                    successModal.style.display = 'flex';
                }
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                contactForm.reset();
            }, 1500);
        });
    }

    // Modal Close Logic
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (successModal) successModal.style.display = 'none';
        });
    });

    // Close on backdrop click
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-backdrop')) {
            if (successModal) successModal.style.display = 'none';
        }
    });

    // Initialize Interactive Map
    const mapContainer = document.getElementById('contactMap');
    if (mapContainer) {
        // Office Coordinates: San Francisco (37.7749, -122.4194)
        const officeCoords = [37.7749, -122.4194];

        const map = L.map('contactMap', {
            center: officeCoords,
            zoom: 14,
            scrollWheelZoom: false // Better UX on scrollable pages
        });

        // Add standard OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 19
        }).addTo(map);

        // Custom icon for the office (Green circle with shadow)
        const officeIcon = L.divIcon({
            className: 'custom-div-icon',
            html: `<div style="background-color: var(--primary); width: 12px; height: 12px; border: 2px solid white; border-radius: 50%; box-shadow: 0 0 10px rgba(5,150,105,0.5);"></div>`,
            iconSize: [12, 12],
            iconAnchor: [6, 6]
        });

        // Add marker with descriptive popup
        L.marker(officeCoords, { icon: officeIcon })
            .addTo(map)
            .bindPopup('<b>EcoTrack Head Office</b><br>1200 Sustainability Way<br>San Francisco, CA 94105')
            .openPopup();

        // Fix for potentially hidden container issues
        setTimeout(() => {
            map.invalidateSize();
        }, 100);
    }
});

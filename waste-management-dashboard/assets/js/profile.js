document.addEventListener('DOMContentLoaded', function () {
    console.log('Profile JS loaded');

    const profileForm = document.getElementById('profileForm');
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

    if (profileForm) {
        profileForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Basic validation
            const inputs = profileForm.querySelectorAll('input[required]');
            let valid = true;
            inputs.forEach(input => {
                if (!input.value.trim()) valid = false;
            });

            if (!valid) {
                showInfoModal('Missing Information', 'Please fill in all required fields.', 'fa-circle-exclamation', 'var(--warning)');
                return;
            }

            // Simulate update
            const submitBtn = profileForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Updating Profile...';
            submitBtn.disabled = true;

            setTimeout(() => {
                showInfoModal(
                    'Profile Updated',
                    'Your company profile details have been successfully updated in our records.',
                    'fa-user-check'
                );

                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }

    // Location Management
    const addLocationBtn = document.getElementById('addLocationBtn');
    const addLocationModal = document.getElementById('addLocationModal');
    const addLocationForm = document.getElementById('addLocationForm');
    const locationsList = document.getElementById('locationsList');

    if (addLocationBtn && addLocationModal) {
        addLocationBtn.addEventListener('click', () => {
            addLocationModal.style.display = 'flex';
        });
    }

    if (addLocationForm) {
        addLocationForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const locName = document.getElementById('locName').value;
            const locAddress = document.getElementById('locAddress').value;

            // Simulate loading
            const submitBtn = addLocationForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Saving...';
            submitBtn.disabled = true;

            setTimeout(() => {
                // Add to list
                const newLocation = document.createElement('div');
                newLocation.className = 'p-3 rounded bg-gray-50';
                newLocation.style.animation = 'fadeIn 0.5s ease-out';
                newLocation.innerHTML = `
                    <div class="font-bold">${locName}</div>
                    <div class="text-sm text-muted">${locAddress}</div>
                `;
                locationsList.appendChild(newLocation);

                // Reset and close
                addLocationForm.reset();
                addLocationModal.style.display = 'none';
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;

                showInfoModal(
                    'Location Added',
                    `New service location "<strong>${locName}</strong>" has been recorded and will be available for future pickups.`,
                    'fa-location-dot'
                );
            }, 1000);
        });
    }

    // Modal Closing Logic
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (infoModal) infoModal.style.display = 'none';
            if (addLocationModal) addLocationModal.style.display = 'none';
        });
    });

    window.addEventListener('click', (e) => {
        if (e.target === infoModal) {
            infoModal.style.display = 'none';
        }
        if (e.target === addLocationModal) {
            addLocationModal.style.display = 'none';
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    console.log('Settings JS loaded');

    // Selectors
    const saveChangesBtn = document.querySelector('.btn-primary[style*="padding: 0.5rem 1rem"]');
    const changePhotoBtn = document.querySelector('.btn-outline[style*="padding: 0.25rem 0.75rem"]');
    const updatePasswordBtn = document.getElementById('updatePasswordBtn');

    const infoModal = document.getElementById('infoModal');
    const closeModalBtns = document.querySelectorAll('.close-modal');

    // Modal Helper
    function showInfoModal(title, message, icon = 'fa-circle-check', color = '#10B981', bgColor = '#ECFDF5') {
        if (!infoModal) return;
        document.getElementById('infoModalTitle').textContent = title;
        document.getElementById('infoModalMessage').textContent = message;

        const iconEl = document.getElementById('infoModalIcon');
        iconEl.className = `fa-solid ${icon}`;

        const iconContainer = document.getElementById('infoModalIconContainer');
        iconContainer.style.color = color;
        iconContainer.style.background = bgColor;

        infoModal.style.display = 'flex';
    }

    // Save Changes Handler
    if (saveChangesBtn) {
        saveChangesBtn.addEventListener('click', function () {
            const originalText = saveChangesBtn.textContent;
            saveChangesBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Saving...';
            saveChangesBtn.disabled = true;

            setTimeout(() => {
                showInfoModal(
                    'Changes Saved',
                    'Your profile and notification preferences have been updated successfully.',
                    'fa-user-check',
                    '#10B981',
                    '#ECFDF5'
                );
                saveChangesBtn.textContent = originalText;
                saveChangesBtn.disabled = false;
            }, 1200);
        });
    }

    // Change Photo Handler
    if (changePhotoBtn) {
        changePhotoBtn.addEventListener('click', function () {
            showInfoModal(
                'Upload Profile Photo',
                'The photo upload feature is currently in maintenance. Please try again later or contact support.',
                'fa-image',
                '#3B82F6',
                '#DBEAFE'
            );
        });
    }

    // Update Password Handler
    if (updatePasswordBtn) {
        updatePasswordBtn.addEventListener('click', function () {
            const currentPass = document.getElementById('currentPassword').value;
            const newPass = document.getElementById('newPassword').value;
            const confirmPass = document.getElementById('confirmPassword').value;

            if (!currentPass || !newPass || !confirmPass) {
                showInfoModal(
                    'Invalid Input',
                    'Please fill in all password fields to proceed with the security update.',
                    'fa-circle-exclamation',
                    '#EF4444',
                    '#FEE2E2'
                );
                return;
            }

            if (newPass !== confirmPass) {
                showInfoModal(
                    'Password Mismatch',
                    'Your new password and confirmation password do not match. Please verify and try again.',
                    'fa-triangle-exclamation',
                    '#F59E0B',
                    '#FEF3C7'
                );
                return;
            }

            const originalText = updatePasswordBtn.textContent;
            updatePasswordBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Updating...';
            updatePasswordBtn.disabled = true;

            setTimeout(() => {
                showInfoModal(
                    'Password Updated',
                    'Your security credentials have been successfully updated. You will need to use your new password next time you log in.',
                    'fa-shield-halved',
                    '#10B981',
                    '#ECFDF5'
                );
                updatePasswordBtn.textContent = originalText;
                updatePasswordBtn.disabled = false;

                // Clear fields
                document.getElementById('currentPassword').value = '';
                document.getElementById('newPassword').value = '';
                document.getElementById('confirmPassword').value = '';
            }, 1500);
        });
    }

    // Modal Closing
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            infoModal.style.display = 'none';
        });
    });

    window.addEventListener('click', (e) => {
        if (e.target === infoModal) {
            infoModal.style.display = 'none';
        }
    });
});

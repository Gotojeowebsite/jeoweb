/**
 * Pointer Lock API Integration Module
 *
 * This module manages mouse pointer locking for an improved gameplay experience,
 * especially for first-person or 3D games. It captures the mouse cursor,
 * provides raw input data, and displays a pause overlay when the user exits
 * pointer lock.
 */
document.addEventListener('DOMContentLoaded', () => {
    const gameContainer = document.getElementById('gameFrame');
    const lockMouseBtn = document.getElementById('lockMouseBtn');
    const modalInner = document.querySelector('.modal-inner');

    if (!gameContainer || !lockMouseBtn || !modalInner) {
        console.warn('Pointer Lock: Required elements (gameFrame, lockMouseBtn, or .modal-inner) not found.');
        return;
    }

    // --- 1. Create the "Paused" Overlay ---
    // A graphical overlay to inform the user that the game is paused and
    // to provide a clear way to resume.
    const pauseOverlay = document.createElement('div');
    pauseOverlay.id = 'pause-overlay';
    pauseOverlay.style.cssText = `
        position: absolute;
        inset: 45px 0 0 0; /* Position below the modal toolbar */
        background: rgba(12, 11, 20, 0.85);
        backdrop-filter: blur(8px);
        color: white;
        display: none; /* Hidden by default */
        flex-direction: column;
        align-items: center;
        justify-content: center;
        z-index: 100;
        cursor: pointer;
        text-align: center;
    `;
    pauseOverlay.innerHTML = `
        <h2 style="font-size: 2rem; margin-bottom: 1rem;">Paused</h2>
        <p style="font-size: 1rem;">Click to Resume</p>
    `;
    modalInner.appendChild(pauseOverlay);

    // --- 2. Handle Pointer Lock Acquisition ---
    const requestLock = async () => {
        if (document.pointerLockElement === gameContainer) return;
        try {
            // Request pointer lock with unadjustedMovement.
            // This is crucial for 3D games as it bypasses OS-level mouse
            // acceleration and provides raw, unfiltered mouse movement data
            // (movementX and movementY), which is essential for accurate
            // camera controls.
            await gameContainer.requestPointerLock({ unadjustedMovement: true });
        } catch (e) {
            console.warn('Could not lock pointer with unadjustedMovement, falling back.', e.message);
            // Fallback for browsers that do not support the option.
            try {
                await gameContainer.requestPointerLock();
            } catch (err) {
                console.error("Pointer lock failed:", err.message);
            }
        }
    };

    // Clicking the button in the modal toolbar initiates the lock.
    lockMouseBtn.addEventListener('click', requestLock);
    // Clicking the pause overlay also re-initiates the lock.
    pauseOverlay.addEventListener('click', requestLock);

    // --- 3. Manage Pointer State Changes ---
    // A robust listener for the 'pointerlockchange' event is the core of
    // state management. It detects when the pointer is successfully locked
    // or when it is unlocked (e.g., by the user pressing the 'Escape' key).
    document.addEventListener('pointerlockchange', () => {
        const playModal = document.getElementById('playModal');
        const isModalVisible = playModal && !playModal.classList.contains('hidden');

        if (document.pointerLockElement === gameContainer) {
            // The pointer is now locked. Hide the pause overlay.
            pauseOverlay.style.display = 'none';
        } else if (isModalVisible) {
            // The pointer has been unlocked, and the game modal is visible.
            // Show the "Paused" overlay to prevent accidental clicks outside
            // the game and to provide a clear resume path.
            pauseOverlay.style.display = 'flex';
        }
    });

    // Also, if the modal is closed, ensure the overlay is hidden.
    const closeModalBtn = document.getElementById('closeModal');
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            if (document.pointerLockElement) {
                document.exitPointerLock();
            }
            pauseOverlay.style.display = 'none';
        });
    }
});

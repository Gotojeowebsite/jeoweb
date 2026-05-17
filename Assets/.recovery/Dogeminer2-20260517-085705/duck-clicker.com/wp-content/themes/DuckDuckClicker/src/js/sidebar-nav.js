/**
 * Left Sidebar Navigation Toggle
 */

(function() {
    'use strict';

    console.log('Sidebar nav script file loaded - v1.0.0.9');

    function initSidebar() {
        console.log('Initializing sidebar navigation...');

        const menuToggle = document.getElementById('menuToggle');
        const sidebarClose = document.getElementById('sidebarClose');
        const leftSidebar = document.getElementById('leftSidebar');
        const sidebarOverlay = document.getElementById('sidebarOverlay');

        console.log('Elements found:', {
            menuToggle: !!menuToggle,
            sidebarClose: !!sidebarClose,
            leftSidebar: !!leftSidebar,
            sidebarOverlay: !!sidebarOverlay
        });

        if (!menuToggle || !leftSidebar) {
            console.error('Required sidebar elements not found');
            return;
        }

        // Open sidebar (lock expanded state)
        function openSidebar() {
            console.log('Opening sidebar');
            leftSidebar.classList.add('active');
            if (sidebarOverlay) {
                sidebarOverlay.classList.add('active');
            }
        }

        // Close sidebar (remove locked state, return to hover behavior)
        function closeSidebar() {
            console.log('Closing sidebar');
            leftSidebar.classList.remove('active');
            leftSidebar.classList.add('manually-closed');
            if (sidebarOverlay) {
                sidebarOverlay.classList.remove('active');
            }
            
            // Remove manually-closed after mouse leaves sidebar
            setTimeout(function() {
                leftSidebar.classList.remove('manually-closed');
            }, 500);
        }

        // Toggle button click - locks sidebar in expanded state
        menuToggle.addEventListener('click', function(e) {
            console.log('Menu toggle clicked');
            e.stopPropagation();
            if (leftSidebar.classList.contains('active')) {
                closeSidebar();
            } else {
                openSidebar();
            }
        });

        // Close button click - removes lock, returns to icon-only with hover
        if (sidebarClose) {
            sidebarClose.addEventListener('click', function(e) {
                console.log('Close button clicked!');
                e.preventDefault();
                e.stopPropagation();
                closeSidebar();
            });
            console.log('Close button listener attached');
        } else {
            console.warn('Close button not found');
        }

        // Overlay click
        if (sidebarOverlay) {
            sidebarOverlay.addEventListener('click', function() {
                console.log('Overlay clicked');
                closeSidebar();
            });
        }

        // Close on ESC key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && leftSidebar.classList.contains('active')) {
                console.log('ESC key pressed');
                closeSidebar();
            }
        });

        // Prevent body scroll when sidebar is open
        if (leftSidebar) {
            leftSidebar.addEventListener('touchmove', function(e) {
                e.stopPropagation();
            });
        }

        console.log('Sidebar navigation initialized successfully');
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSidebar);
    } else {
        // DOM already loaded
        initSidebar();
    }

})();

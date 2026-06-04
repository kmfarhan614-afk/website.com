/* =============================================
   THE LIGHTHOUSE ACADEMY - JAVASCRIPT
   ============================================= */

document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeTabSystem();
    initializeMenuToggle();
    initializeSearch();
    initializeFormValidation();
});

/* =============================================
   NAVIGATION SYSTEM
   ============================================= */

function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = this.getAttribute('data-section');

            // Remove active class from all sections and links
            sections.forEach(section => section.classList.remove('active'));
            navLinks.forEach(navLink => navLink.classList.remove('active'));

            // Add active class to target section and link
            const targetElement = document.getElementById(targetSection);
            if (targetElement) {
                targetElement.classList.add('active');
                this.classList.add('active');
                window.scrollTo(0, 0);
            }

            // Close sidebar on mobile after navigation
            closeSidebarMobile();
        });
    });

    // Set dashboard as default active
    if (document.querySelector('[data-section="dashboard"]')) {
        document.querySelector('[data-section="dashboard"]').click();
    }
}

/* =============================================
   TAB SYSTEM FOR REPORTS
   ============================================= */

function initializeTabSystem() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');

            // Remove active class from all tabs and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));

            // Add active class to clicked tab and corresponding pane
            this.classList.add('active');
            const targetPane = document.getElementById(tabId);
            if (targetPane) {
                targetPane.classList.add('active');
            }
        });
    });

    // Set first tab as default
    if (tabButtons.length > 0) {
        tabButtons[0].classList.add('active');
    }
    if (tabPanes.length > 0) {
        tabPanes[0].classList.add('active');
    }
}

/* =============================================
   MOBILE MENU TOGGLE
   ============================================= */

function initializeMenuToggle() {
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');

    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
        });
    }

    // Close sidebar when clicking outside
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
                sidebar.classList.remove('active');
            }
        }
    });
}

function closeSidebarMobile() {
    if (window.innerWidth <= 768) {
        const sidebar = document.querySelector('.sidebar');
        sidebar.classList.remove('active');
    }
}

/* =============================================
   SEARCH FUNCTIONALITY
   ============================================= */

function initializeSearch() {
    const searchBoxes = document.querySelectorAll('.search-box input, .filter-bar input');

    searchBoxes.forEach(searchBox => {
        searchBox.addEventListener('keyup', function() {
            const searchTerm = this.value.toLowerCase();
            const table = this.closest('section').querySelector('.data-table');

            if (table) {
                const rows = table.querySelectorAll('tbody tr');
                rows.forEach(row => {
                    const text = row.textContent.toLowerCase();
                    row.style.display = text.includes(searchTerm) ? '' : 'none';
                });
            }
        });
    });
}

/* =============================================
   FORM VALIDATION
   ============================================= */

function initializeFormValidation() {
    const buttons = document.querySelectorAll('.btn-primary, .quick-btn, .action-btn');

    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const buttonText = this.textContent.trim();

            if (buttonText.includes('Add') || buttonText.includes('Record') || buttonText.includes('Upload')) {
                showNotification('Opening form...', 'info');
            } else if (buttonText.includes('Download')) {
                showNotification('Downloading report...', 'success');
            } else if (buttonText.includes('Details')) {
                showNotification('Loading details...', 'info');
            }
        });
    });
}

/* =============================================
   NOTIFICATION SYSTEM
   ============================================= */

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background-color: ${getNotificationColor(type)};
        color: white;
        border-radius: 0.5rem;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 9999;
        animation: slideIn 0.3s ease-in-out;
        font-weight: 600;
        max-width: 400px;
    `;

    notification.textContent = message;
    document.body.appendChild(notification);

    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function getNotificationColor(type) {
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b',
        info: '#2563eb'
    };
    return colors[type] || colors.info;
}

/* =============================================
   TABLE INTERACTIONS
   ============================================= */

document.addEventListener('DOMContentLoaded', function() {
    const tableRows = document.querySelectorAll('.data-table tbody tr');

    tableRows.forEach(row => {
        row.addEventListener('hover', function() {
            this.style.backgroundColor = '#f3f4f6';
        });

        row.addEventListener('mouseover', function() {
            this.style.cursor = 'pointer';
        });
    });
});

/* =============================================
   FILTER SYSTEM
   ============================================= */

document.addEventListener('DOMContentLoaded', function() {
    const selects = document.querySelectorAll('.filter-bar select');

    selects.forEach(select => {
        select.addEventListener('change', function() {
            const filterValue = this.value;
            const table = this.closest('section').querySelector('.data-table');

            if (table && filterValue !== 'All Departments' && filterValue !== 'All Status' && filterValue !== 'All Classes') {
                const rows = table.querySelectorAll('tbody tr');
                rows.forEach(row => {
                    const text = row.textContent;
                    row.style.display = text.includes(filterValue) ? '' : 'none';
                });
            } else if (table) {
                const rows = table.querySelectorAll('tbody tr');
                rows.forEach(row => {
                    row.style.display = '';
                });
            }
        });
    });
});

/* =============================================
   DATE PICKER FUNCTIONALITY
   ============================================= */

document.addEventListener('DOMContentLoaded', function() {
    const datePickers = document.querySelectorAll('input[type="date"]');

    datePickers.forEach(picker => {
        picker.addEventListener('change', function() {
            const selectedDate = this.value;
            const table = this.closest('section').querySelector('.data-table');

            if (table && selectedDate) {
                const rows = table.querySelectorAll('tbody tr');
                rows.forEach(row => {
                    const cellText = row.textContent;
                    row.style.display = cellText.includes(selectedDate) ? '' : 'none';
                });
            } else if (table) {
                const rows = table.querySelectorAll('tbody tr');
                rows.forEach(row => {
                    row.style.display = '';
                });
            }
        });
    });
});

/* =============================================
   REAL-TIME STATISTICS UPDATES
   ============================================= */

function updateStatistics() {
    const statCards = document.querySelectorAll('.stat-card');

    statCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const content = this.querySelector('.stat-content h3');
            if (content) {
                // Animate number update effect
                const originalValue = content.textContent;
                content.style.animation = 'pulse 0.6s ease-in-out';
            }
        });
    });
}

/* =============================================
   RESPONSIVE SIDEBAR
   ============================================= */

window.addEventListener('resize', function() {
    const sidebar = document.querySelector('.sidebar');
    if (window.innerWidth > 768) {
        sidebar.classList.remove('active');
    }
});

/* =============================================
   KEYBOARD SHORTCUTS
   ============================================= */

document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + K for search focus
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.querySelector('.search-box input');
        if (searchInput) {
            searchInput.focus();
        }
    }

    // Escape to close sidebar on mobile
    if (e.key === 'Escape') {
        closeSidebarMobile();
    }
});

/* =============================================
   LOGOUT FUNCTIONALITY
   ============================================= */

const logoutBtn = document.querySelector('.logout-btn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', function() {
        if (confirm('Are you sure you want to logout?')) {
            showNotification('Logging out...', 'info');
            setTimeout(() => {
                alert('Logout successful! Redirecting to login page...');
                // window.location.href = '/login.html'; // Uncomment when login page is ready
            }, 1500);
        }
    });
}

/* =============================================
   NOTIFICATION BELL
   ============================================= */

document.addEventListener('DOMContentLoaded', function() {
    const notificationBell = document.querySelector('.header-icons button');

    if (notificationBell) {
        notificationBell.addEventListener('click', function() {
            showNotification('You have 3 new notifications', 'info');
        });
    }
});

/* =============================================
   SETTINGS BUTTON
   ============================================= */

document.addEventListener('DOMContentLoaded', function() {
    const settingsBtn = document.querySelectorAll('.header-icons button')[1];

    if (settingsBtn) {
        settingsBtn.addEventListener('click', function() {
            showNotification('Settings panel opening...', 'info');
        });
    }
});

/* =============================================
   ANIMATIONS
   ============================================= */

const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }

    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.1);
        }
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

/* =============================================
   PERFORMANCE OPTIMIZATIONS
   ============================================= */

// Debounce function for search
function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

// Apply debounce to search boxes
document.addEventListener('DOMContentLoaded', function() {
    const searchInputs = document.querySelectorAll('.search-box input, .filter-bar input');
    searchInputs.forEach(input => {
        const debouncedSearch = debounce(function() {
            const event = new Event('keyup');
            input.dispatchEvent(event);
        }, 300);

        input.addEventListener('input', debouncedSearch);
    });
});

/* =============================================
   EXPORT/DOWNLOAD FUNCTIONALITY
   ============================================= */

document.addEventListener('DOMContentLoaded', function() {
    const downloadBtns = document.querySelectorAll('.action-btn i.fa-download');

    downloadBtns.forEach(btn => {
        btn.parentElement.addEventListener('click', function() {
            const row = this.closest('tr');
            const studentName = row.querySelector('td:nth-child(1)')?.textContent;
            showNotification(`Downloading receipt for ${studentName}...`, 'success');

            // Simulate download delay
            setTimeout(() => {
                showNotification(`Receipt downloaded successfully!`, 'success');
            }, 1500);
        });
    });
});

/* =============================================
   LIVE CLOCK
   ============================================= */

function updateClock() {
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    const dateString = now.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    // You can display this in a specific element if needed
    // console.log(`${dateString} - ${timeString}`);
}

setInterval(updateClock, 1000);
updateClock();

/* =============================================
   MODAL/POPUP SYSTEM
   ============================================= */

function openModal(modalContent) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
    `;

    const modalBox = document.createElement('div');
    modalBox.style.cssText = `
        background: white;
        padding: 2rem;
        border-radius: 1rem;
        max-width: 600px;
        width: 90%;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
    `;

    modalBox.innerHTML = modalContent;
    modal.appendChild(modalBox);

    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    });

    document.body.appendChild(modal);
}

/* =============================================
   DATA PERSISTENCE (LOCAL STORAGE)
   ============================================= */

function saveUserPreference(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function getUserPreference(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
}

// Save last active section
document.addEventListener('DOMContentLoaded', function() {
    const lastSection = getUserPreference('lastActiveSection');
    if (lastSection) {
        const link = document.querySelector(`[data-section="${lastSection}"]`);
        if (link) {
            link.click();
        }
    }
});

document.addEventListener('click', function(e) {
    if (e.target.classList.contains('nav-link')) {
        const section = e.target.getAttribute('data-section');
        saveUserPreference('lastActiveSection', section);
    }
});

console.log('The Lighthouse Academy - Management System Initialized Successfully');

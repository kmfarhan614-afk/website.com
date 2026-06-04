/* =============================================
   THE LIGHTHOUSE ACADEMY - JAVASCRIPT
   ============================================= */

document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeTabSystem();
    initializeMenuToggle();
    initializeSearch();
    initializeFormValidation();
    loadStudentsFromStorage();
    initializeAddStudentButton();
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

/* =============================================
   STUDENT MANAGEMENT - ADD & SAVE
   ============================================= */

function initializeAddStudentButton() {
    const addButtons = document.querySelectorAll('[class*="Add New Student"]');
    const allAddButtons = document.querySelectorAll('.btn-primary');

    allAddButtons.forEach(button => {
        if (button.textContent.includes('Add New Student')) {
            button.addEventListener('click', openAddStudentModal);
        }
    });
}

function openAddStudentModal() {
    const modalHTML = `
        <div style="background: white; padding: 2rem; border-radius: 1rem;">
            <h2 style="margin-bottom: 1.5rem; color: #2563eb;">Add New Student</h2>
            <form id="addStudentForm" style="display: grid; gap: 1rem;">
                <div>
                    <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Roll Number:</label>
                    <input type="text" id="rollNo" placeholder="e.g., 005" required style="width: 100%; padding: 0.75rem; border: 1px solid #e5e7eb; border-radius: 0.5rem;">
                </div>
                <div>
                    <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Student Name:</label>
                    <input type="text" id="studentName" placeholder="Full Name" required style="width: 100%; padding: 0.75rem; border: 1px solid #e5e7eb; border-radius: 0.5rem;">
                </div>
                <div>
                    <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Department:</label>
                    <select id="department" required style="width: 100%; padding: 0.75rem; border: 1px solid #e5e7eb; border-radius: 0.5rem;">
                        <option>English Language</option>
                        <option>IT & Programming</option>
                        <option>Web Development</option>
                    </select>
                </div>
                <div>
                    <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Class Level:</label>
                    <select id="classLevel" required style="width: 100%; padding: 0.75rem; border: 1px solid #e5e7eb; border-radius: 0.5rem;">
                        <option>Beginner</option>
                        <option>Intermediate</option>
                        <option>Advanced</option>
                    </select>
                </div>
                <div>
                    <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Email:</label>
                    <input type="email" id="studentEmail" placeholder="student@email.com" required style="width: 100%; padding: 0.75rem; border: 1px solid #e5e7eb; border-radius: 0.5rem;">
                </div>
                <div>
                    <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Contact Number:</label>
                    <input type="tel" id="studentContact" placeholder="+966-555-0000" required style="width: 100%; padding: 0.75rem; border: 1px solid #e5e7eb; border-radius: 0.5rem;">
                </div>
                <div>
                    <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Admission Date:</label>
                    <input type="date" id="admissionDate" required style="width: 100%; padding: 0.75rem; border: 1px solid #e5e7eb; border-radius: 0.5rem;">
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 1rem;">
                    <button type="button" onclick="this.closest('[style*=\"background: white\"]').parentElement.remove()" style="padding: 0.75rem; background: #e5e7eb; color: #374151; border: none; border-radius: 0.5rem; font-weight: 600; cursor: pointer;">Cancel</button>
                    <button type="submit" style="padding: 0.75rem; background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%); color: white; border: none; border-radius: 0.5rem; font-weight: 600; cursor: pointer;">Add Student</button>
                </div>
            </form>
        </div>
    `;

    openModal(modalHTML);

    document.getElementById('addStudentForm').addEventListener('submit', function(e) {
        e.preventDefault();
        addNewStudent();
    });
}

function addNewStudent() {
    const student = {
        rollNo: document.getElementById('rollNo').value,
        name: document.getElementById('studentName').value,
        department: document.getElementById('department').value,
        classLevel: document.getElementById('classLevel').value,
        email: document.getElementById('studentEmail').value,
        contact: document.getElementById('studentContact').value,
        admissionDate: document.getElementById('admissionDate').value,
        status: 'Active'
    };

    // Get existing students from localStorage
    let students = JSON.parse(localStorage.getItem('students')) || [];

    // Add new student
    students.push(student);

    // Save to localStorage
    localStorage.setItem('students', JSON.stringify(students));

    showNotification('Student added successfully!', 'success');

    // Close modal
    document.querySelector('.modal').remove();

    // Reload students table if on students page
    const studentsSection = document.getElementById('students');
    if (studentsSection && studentsSection.classList.contains('active')) {
        loadStudentsFromStorage();
    }
}

function loadStudentsFromStorage() {
    const students = JSON.parse(localStorage.getItem('students')) || [];

    if (students.length === 0) return;

    // Find the students table
    const studentsSection = document.getElementById('students');
    if (!studentsSection) return;

    const table = studentsSection.querySelector('.data-table tbody');
    if (!table) return;

    // Clear existing rows
    table.innerHTML = '';

    // Add stored students
    students.forEach(student => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.rollNo}</td>
            <td>${student.name}</td>
            <td>${student.department}</td>
            <td>${student.classLevel}</td>
            <td>${student.email}</td>
            <td>${student.contact}</td>
            <td>${student.admissionDate}</td>
            <td><span class="status-badge active">Active</span></td>
            <td><button class="action-btn" onclick="deleteStudent('${student.rollNo}')"><i class="fas fa-trash"></i></button></td>
        `;
        table.appendChild(row);
    });

    // Also add original sample data
    const sampleStudents = [
        ['001', 'Ahmed Hassan', 'English Language', 'Advanced', 'ahmed@email.com', '+966-555-0123', '2026-01-15'],
        ['002', 'Fatima Al-Mansouri', 'IT & Programming', 'Intermediate', 'fatima@email.com', '+966-555-0124', '2026-02-20'],
        ['003', 'Mohammed Ali', 'Web Development', 'Beginner', 'mohammed@email.com', '+966-555-0125', '2026-03-10'],
        ['004', 'Noor Ibrahim', 'English Language', 'Beginner', 'noor@email.com', '+966-555-0126', '2026-03-25']
    ];

    sampleStudents.forEach(data => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${data[0]}</td>
            <td>${data[1]}</td>
            <td>${data[2]}</td>
            <td>${data[3]}</td>
            <td>${data[4]}</td>
            <td>${data[5]}</td>
            <td>${data[6]}</td>
            <td><span class="status-badge active">Active</span></td>
            <td><button class="action-btn"><i class="fas fa-eye"></i></button></td>
        `;
        table.appendChild(row);
    });
}

function deleteStudent(rollNo) {
    if (confirm('Are you sure you want to delete this student?')) {
        let students = JSON.parse(localStorage.getItem('students')) || [];
        students = students.filter(s => s.rollNo !== rollNo);
        localStorage.setItem('students', JSON.stringify(students));

        showNotification('Student deleted successfully!', 'success');
        loadStudentsFromStorage();
    }
}

console.log('The Lighthouse Academy - Management System Initialized Successfully');

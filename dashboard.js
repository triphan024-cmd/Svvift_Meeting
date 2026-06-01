document.addEventListener('DOMContentLoaded', () => {
    // --- Tabs Navigation Logic ---
    const navItems = document.querySelectorAll('.sidebar-nav .nav-item');
    const tabPanes = document.querySelectorAll('.tab-pane');
    const sidebar = document.querySelector('.sidebar');
    const mobileOverlay = document.getElementById('mobileOverlay');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active from all nav items
            navItems.forEach(nav => nav.classList.remove('active'));
            // Add active to clicked
            item.classList.add('active');

            // Hide all tab panes
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Show target tab pane
            const targetId = item.getAttribute('data-target');
            if (targetId) {
                document.getElementById(targetId).classList.add('active');
            }

            // Close sidebar on mobile/iPad after clicking a link
            if (window.innerWidth <= 820) {
                sidebar.classList.remove('open');
                mobileOverlay.classList.remove('active');
            }
        });
    });

    // --- Mobile/iPad Sidebar Toggle ---
    mobileMenuBtn.addEventListener('click', () => {
        sidebar.classList.add('open');
        mobileOverlay.classList.add('active');
    });

    mobileOverlay.addEventListener('click', () => {
        sidebar.classList.remove('open');
        mobileOverlay.classList.remove('active');
    });

    // --- Charts Initialization ---
    // Production Chart
    const prodCanvas = document.getElementById('productionChart');
    if (prodCanvas) {
        const prodCtx = prodCanvas.getContext('2d');
        new Chart(prodCtx, {
            type: 'line',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [
                    {
                        label: 'Actual Output',
                        data: [1200, 1350, 1250, 1400, 1450, 1100, 1280],
                        borderColor: '#2563EB',
                        backgroundColor: 'rgba(37, 99, 235, 0.1)',
                        borderWidth: 3,
                        fill: true,
                        tension: 0.4
                    },
                    {
                        label: 'Target',
                        data: [1300, 1300, 1300, 1300, 1300, 1100, 1100],
                        borderColor: '#94A3B8',
                        borderWidth: 2,
                        borderDash: [5, 5],
                        fill: false,
                        tension: 0
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'top', labels: { font: { family: "'Outfit', sans-serif" } } }
                },
                scales: {
                    y: { beginAtZero: true, grid: { color: '#E2E8F0' } },
                    x: { grid: { display: false } }
                }
            }
        });
    }

    // HR Chart (Doughnut)
    const hrCanvas = document.getElementById('hrChart');
    if (hrCanvas) {
        const hrCtx = hrCanvas.getContext('2d');
        new Chart(hrCtx, {
            type: 'doughnut',
            data: {
                labels: ['Morning', 'Evening', 'Night', 'On Leave'],
                datasets: [{
                    data: [45, 35, 15, 5],
                    backgroundColor: ['#2563EB', '#10B981', '#F59E0B', '#E2E8F0'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '70%',
                plugins: {
                    legend: { position: 'right', labels: { font: { family: "'Outfit', sans-serif" }, boxWidth: 12 } }
                }
            }
        });
    }
});

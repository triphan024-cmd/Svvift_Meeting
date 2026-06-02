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
            
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');

            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            const targetId = item.getAttribute('data-target');
            if (targetId) {
                document.getElementById(targetId).classList.add('active');
            }

            if (window.innerWidth <= 820) {
                sidebar.classList.remove('open');
                mobileOverlay.classList.remove('active');
            }
        });
    });

    mobileMenuBtn.addEventListener('click', () => {
        sidebar.classList.add('open');
        mobileOverlay.classList.add('active');
    });

    mobileOverlay.addEventListener('click', () => {
        sidebar.classList.remove('open');
        mobileOverlay.classList.remove('active');
    });

    // --- Sub-Tabs Navigation Logic ---
    const subNavBtns = document.querySelectorAll('.sub-nav-btn');
    subNavBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const parentPane = btn.closest('.tab-pane');
            if (!parentPane) return;

            parentPane.querySelectorAll('.sub-nav-btn').forEach(b => b.classList.remove('active'));
            parentPane.querySelectorAll('.sub-pane').forEach(p => p.classList.remove('active'));

            btn.classList.add('active');
            
            const targetId = btn.getAttribute('data-sub');
            if (targetId) {
                const targetPane = document.getElementById(targetId);
                if (targetPane) targetPane.classList.add('active');
            }
        });
    });

    // --- Chart Helpers ---
    const commonOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { position: 'top', labels: { font: { family: "'Outfit', sans-serif" } } }
        },
        scales: {
            y: { beginAtZero: true, grid: { color: '#E2E8F0' } },
            x: { grid: { display: false } }
        }
    };

    // 1. Overview Tab: Production Chart
    const prodCanvas = document.getElementById('productionChart');
    if (prodCanvas) {
        new Chart(prodCanvas.getContext('2d'), {
            type: 'line',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [
                    { label: 'Actual Output', data: [1200, 1350, 1100, 1400, 1500, 1450, 1600], borderColor: '#2563EB', backgroundColor: 'rgba(37, 99, 235, 0.1)', fill: true, tension: 0.4 },
                    { label: 'Target', data: [1300, 1300, 1300, 1400, 1400, 1500, 1500], borderColor: '#94A3B8', borderDash: [5, 5], fill: false, tension: 0 }
                ]
            },
            options: commonOptions
        });
    }

    const overviewFinCanvas = document.getElementById('overviewFinancialChart');
    if (overviewFinCanvas) {
        new Chart(overviewFinCanvas.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [
                    { label: 'Revenue ($)', data: [1.1, 1.3, 1.2, 1.5, 1.4, 1.7], backgroundColor: '#10B981' },
                    { label: 'OpCost ($)', data: [0.8, 0.9, 0.85, 1.0, 0.95, 1.1], backgroundColor: '#EF4444' }
                ]
            },
            options: commonOptions
        });
    }

    // 2. SOPs Tab: Compliance Chart
    const compCanvas = document.getElementById('complianceChart');
    if (compCanvas) {
        new Chart(compCanvas.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [
                    { label: 'Adherence %', data: [75, 80, 82, 88, 92, 95], backgroundColor: '#10B981', borderRadius: 4 }
                ]
            },
            options: commonOptions
        });
    }

    // 3. Workflows Tab: Automation Chart
    const autoCanvas = document.getElementById('automationChart');
    if (autoCanvas) {
        new Chart(autoCanvas.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['Q1', 'Q2', 'Q3', 'Q4'],
                datasets: [
                    { label: 'Manual Tasks', data: [450, 320, 210, 150], backgroundColor: '#94A3B8' },
                    { label: 'Automated Tasks', data: [120, 250, 360, 420], backgroundColor: '#8B5CF6' }
                ]
            },
            options: { ...commonOptions, scales: { x: { stacked: true }, y: { stacked: true } } }
        });
    }

    // 4. Production Tab: OEE Trend & Defect Pareto
    const oeeCanvas = document.getElementById('oeeTrendChart');
    if (oeeCanvas) {
        new Chart(oeeCanvas.getContext('2d'), {
            type: 'line',
            data: {
                labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8'],
                datasets: [{ label: 'OEE %', data: [78, 79, 81, 82, 85, 84, 86, 87.4], borderColor: '#2563EB', tension: 0.3 }]
            },
            options: commonOptions
        });
    }
    const defectCanvas = document.getElementById('defectChart');
    if (defectCanvas) {
        new Chart(defectCanvas.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['Scratches', 'Dimension', 'Color', 'Assembly', 'Other'],
                datasets: [{ label: 'Occurrences', data: [120, 85, 40, 20, 10], backgroundColor: '#F59E0B' }]
            },
            options: { responsive: true, maintainAspectRatio: false }
        });
    }

    // 5. Inventory Tab: Value Trend & Pie
    const invCanvas = document.getElementById('inventoryTrendChart');
    if (invCanvas) {
        new Chart(invCanvas.getContext('2d'), {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
                datasets: [{ label: 'Inventory Value ($k)', data: [520, 500, 480, 450, 420], borderColor: '#10B981', fill: true, backgroundColor: 'rgba(16,185,129,0.1)' }]
            },
            options: commonOptions
        });
    }
    const invPie = document.getElementById('inventoryPieChart');
    if (invPie) {
        new Chart(invPie.getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: ['Raw Materials', 'WIP', 'Finished Goods'],
                datasets: [{ data: [45, 20, 35], backgroundColor: ['#8B5CF6', '#F59E0B', '#2563EB'] }]
            },
            options: { responsive: true, maintainAspectRatio: false }
        });
    }

    // 6. HR Tab: Labor Cost
    const laborCanvas = document.getElementById('laborCostChart');
    if (laborCanvas) {
        new Chart(laborCanvas.getContext('2d'), {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
                datasets: [
                    { label: 'Direct Labor Cost', data: [45000, 44000, 43500, 42000, 41500], borderColor: '#F59E0B', tension: 0.3 },
                    { label: 'Total Output Units', data: [50000, 52000, 55000, 58000, 60000], borderColor: '#2563EB', type: 'bar', yAxisID: 'y1', backgroundColor: 'rgba(37,99,235,0.2)' }
                ]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                scales: {
                    y: { type: 'linear', display: true, position: 'left' },
                    y1: { type: 'linear', display: true, position: 'right', grid: { drawOnChartArea: false } }
                }
            }
        });
    }

    // 7. Sales Tab: OTIF & Client Pie
    const otifCanvas = document.getElementById('otifChart');
    if (otifCanvas) {
        new Chart(otifCanvas.getContext('2d'), {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
                datasets: [{ label: 'OTIF %', data: [94, 95, 96.5, 97, 98.2], borderColor: '#10B981', tension: 0.2 }]
            },
            options: commonOptions
        });
    }
    const clientPie = document.getElementById('clientPieChart');
    if (clientPie) {
        new Chart(clientPie.getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: ['Toyota', 'Honda', 'Local Dist.', 'Others'],
                datasets: [{ data: [50, 30, 15, 5], backgroundColor: ['#2563EB', '#EF4444', '#10B981', '#94A3B8'] }]
            },
            options: { responsive: true, maintainAspectRatio: false }
        });
    }

    // 8. Financials Tab: EBITDA
    const ebitdaCanvas = document.getElementById('ebitdaChart');
    if (ebitdaCanvas) {
        new Chart(ebitdaCanvas.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['Q1', 'Q2', 'Q3', 'Q4'],
                datasets: [
                    { label: 'Revenue', data: [1.2, 1.5, 1.8, 2.1], backgroundColor: '#2563EB' },
                    { label: 'EBITDA', data: [0.18, 0.25, 0.35, 0.45], backgroundColor: '#F59E0B' }
                ]
            },
            options: commonOptions
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // 1. Production Chart
    const prodCtx = document.getElementById('productionChart').getContext('2d');
    
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
                legend: {
                    position: 'top',
                    labels: {
                        font: { family: "'Outfit', sans-serif" }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: { color: '#E2E8F0' }
                },
                x: {
                    grid: { display: false }
                }
            }
        }
    });

    // 2. HR Chart (Doughnut)
    const hrCtx = document.getElementById('hrChart').getContext('2d');
    
    new Chart(hrCtx, {
        type: 'doughnut',
        data: {
            labels: ['Morning Shift', 'Evening Shift', 'Night Shift', 'On Leave'],
            datasets: [{
                data: [45, 35, 15, 5],
                backgroundColor: [
                    '#2563EB',
                    '#10B981',
                    '#F59E0B',
                    '#E2E8F0'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '70%',
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        font: { family: "'Outfit', sans-serif" },
                        boxWidth: 12
                    }
                }
            }
        }
    });
});

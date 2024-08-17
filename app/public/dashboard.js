document.addEventListener('DOMContentLoaded', function() {
    const totalPipelinesElement = document.getElementById('total-pipelines');
    const activePipelinesElement = document.getElementById('active-pipelines');
    const recentActivityElement = document.getElementById('recent-activity');

    function loadDashboardData() {
        const data = JSON.parse(localStorage.getItem('dashboardData')) || {
            totalPipelines: 0,
            activePipelines: 0,
            recentActivity: []
        };

        // Populate the dashboard
        totalPipelinesElement.textContent = data.totalPipelines;
        activePipelinesElement.textContent = data.activePipelines;
        recentActivityElement.innerHTML = data.recentActivity.map(activity => `<li>${activity}</li>`).join('');
    }

    loadDashboardData();
});

document.addEventListener('DOMContentLoaded', () => {
    updateDashboardStats();
    updateRecentActivity();
});

function updateDashboardStats() {
    document.getElementById('totalPipelines').textContent = pipelines.length;
    document.getElementById('activePipelines').textContent = pipelines.filter(p => p.status === 'in-progress').length;
    document.getElementById('lastDeploymentStatus').textContent = history.length ? history[history.length - 1].status : 'N/A';
}

function updateRecentActivity() {
    const recentActivityList = document.getElementById('recentActivity');
    recentActivityList.innerHTML = "";

    history.slice(-5).forEach(pipeline => {  // Show the last 5 activities
        const listItem = document.createElement('li');
        listItem.className = pipeline.status;
        listItem.textContent = `${pipeline.name} (${pipeline.environment}) - ${pipeline.status} - ${pipeline.timestamp}`;
        recentActivityList.appendChild(listItem);
    });
}

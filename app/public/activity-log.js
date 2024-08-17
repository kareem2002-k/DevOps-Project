document.addEventListener('DOMContentLoaded', function() {
    const activityLogElement = document.getElementById('activity-log');
    const addActivityButton = document.getElementById('add-activity');

    function loadActivityLog() {
        const activities = JSON.parse(localStorage.getItem('activityLog')) || [];
        activityLogElement.innerHTML = activities.map(activity => `
            <li>
                <strong>Description:</strong> ${activity.description}<br>
                <strong>Date:</strong> ${activity.date}
            </li>
        `).join('');
    }

    function addActivity() {
        const description = prompt('Enter activity description:');
        const date = new Date().toLocaleString();
        if (description) {
            const activities = JSON.parse(localStorage.getItem('activityLog')) || [];
            activities.push({ description, date });
            localStorage.setItem('activityLog', JSON.stringify(activities));
            loadActivityLog();
            updateDashboard();
        }
    }

    function updateDashboard() {
        const totalPipelines = (JSON.parse(localStorage.getItem('pipelines')) || []).length;
        const activePipelines = totalPipelines; // Example calculation
        localStorage.setItem('dashboardData', JSON.stringify({
            totalPipelines,
            activePipelines,
            recentActivity: JSON.parse(localStorage.getItem('activityLog')) || []
        }));
    }

    addActivityButton.addEventListener('click', addActivity);

    loadActivityLog();
});

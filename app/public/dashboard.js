document.addEventListener('DOMContentLoaded', function() {
    const totalPipelinesElement = document.getElementById('total-pipelines');
    const totalActivitiesElement = document.getElementById('total-activities');
    const recentActivitiesElement = document.getElementById('recent-activities');
    const logoutButton = document.getElementById('logout-button');

    const user = JSON.parse(localStorage.getItem('loggedInUser'));

    if (!user) {
        window.location.href = 'login.html';
        return;
    }

    function updateDashboard() {
        // Load pipelines and activities for the logged-in user
        const pipelines = JSON.parse(localStorage.getItem(`pipelines_${user.username}`)) || [];
        const activities = JSON.parse(localStorage.getItem(`activityLog_${user.username}`)) || [];

        totalPipelinesElement.textContent = pipelines.length;
        totalActivitiesElement.textContent = activities.length;

        // Display recent activities
        const recentActivities = activities.slice(-5).reverse(); // Show the last 5 activities
        recentActivitiesElement.innerHTML = recentActivities.map(activity => `
            <li>
                <strong>Description:</strong> ${activity.description}<br>
                <strong>Type:</strong> ${activity.type}<br>
                <strong>Date:</strong> ${activity.date}
            </li>
        `).join('');
    }

    logoutButton.addEventListener('click', function() {
        localStorage.removeItem('loggedInUser');
        window.location.href = 'login.html';
    });

    updateDashboard();
});

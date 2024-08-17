document.addEventListener('DOMContentLoaded', function() {
    const activityLogElement = document.getElementById('activity-log');
    const addActivityForm = document.getElementById('add-activity-form');
    const showAddActivityFormButton = document.getElementById('show-add-activity-form');
    const activityForm = document.getElementById('activity-form');
    const logoutButton = document.getElementById('logout-button');

    const user = JSON.parse(localStorage.getItem('loggedInUser'));

    if (!user) {
        window.location.href = 'login.html';
        return;
    }

    function loadActivityLog() {
        const activities = JSON.parse(localStorage.getItem(`activityLog_${user.username}`)) || [];
        activityLogElement.innerHTML = activities.map(activity => `
            <li>
                <strong>Description:</strong> ${activity.description}<br>
                <strong>Type:</strong> ${activity.type}<br>
                <strong>Date:</strong> ${activity.date}
            </li>
        `).join('');
    }

    function addActivity(event) {
        event.preventDefault();
        const description = document.getElementById('activity-description').value;
        const type = document.getElementById('activity-type').value;
        const date = new Date().toLocaleString();

        const activities = JSON.parse(localStorage.getItem(`activityLog_${user.username}`)) || [];
        activities.push({ description, type, date });
        localStorage.setItem(`activityLog_${user.username}`, JSON.stringify(activities));
        loadActivityLog();
    }

    showAddActivityFormButton.addEventListener('click', function() {
        addActivityForm.style.display = addActivityForm.style.display === 'none' ? 'block' : 'none';
    });

    activityForm.addEventListener('submit', addActivity);

    logoutButton.addEventListener('click', function() {
        localStorage.removeItem('loggedInUser');
        window.location.href = 'login.html';
    });

    loadActivityLog();
});

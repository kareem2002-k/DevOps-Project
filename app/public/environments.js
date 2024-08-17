document.addEventListener('DOMContentLoaded', () => {
    updateEnvironmentStatus();
});

function updateEnvironmentStatus() {
    const productionStatus = document.getElementById('productionStatus');
    const stagingStatus = document.getElementById('stagingStatus');
    const developmentStatus = document.getElementById('developmentStatus');

    productionStatus.textContent = Math.random() > 0.2 ? 'Healthy' : 'Issues';
    stagingStatus.textContent = Math.random() > 0.3 ? 'Healthy' : 'Issues';
    developmentStatus.textContent = Math.random() > 0.4 ? 'Healthy' : 'Issues';

    // Optionally, add visual indicators (e.g., colors) based on status
}

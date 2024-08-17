document.addEventListener('DOMContentLoaded', function() {
    const pipelineListElement = document.getElementById('pipeline-list');
    const addPipelineButton = document.getElementById('add-pipeline');

    function loadPipelines() {
        const pipelines = JSON.parse(localStorage.getItem('pipelines')) || [];
        pipelineListElement.innerHTML = pipelines.map(pipeline => `
            <li>
                <strong>Name:</strong> ${pipeline.name}<br>
                <strong>Description:</strong> ${pipeline.description}<br>
                <strong>Tools:</strong> ${pipeline.tools}<br>
                <strong>Status:</strong> ${pipeline.status}
            </li>
        `).join('');
    }

    function addPipeline() {
        const name = prompt('Enter pipeline name:');
        const description = prompt('Enter pipeline description:');
        const tools = prompt('Enter tools used (comma-separated):');
        const status = prompt('Enter pipeline status:');
        if (name && description && tools && status) {
            const pipelines = JSON.parse(localStorage.getItem('pipelines')) || [];
            pipelines.push({ name, description, tools, status });
            localStorage.setItem('pipelines', JSON.stringify(pipelines));
            loadPipelines();
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

    addPipelineButton.addEventListener('click', addPipeline);

    loadPipelines();
});

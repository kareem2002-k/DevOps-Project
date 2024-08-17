document.addEventListener('DOMContentLoaded', function() {
    const pipelineListElement = document.getElementById('pipeline-list');
    const addPipelineForm = document.getElementById('add-pipeline-form');
    const showAddPipelineFormButton = document.getElementById('show-add-pipeline-form');
    const logoutButton = document.getElementById('logout-button');

    const user = JSON.parse(localStorage.getItem('loggedInUser'));

    if (!user) {
        window.location.href = 'login.html';
        return;
    }

    function loadPipelines() {
        const pipelines = JSON.parse(localStorage.getItem(`pipelines_${user.username}`)) || [];
        pipelineListElement.innerHTML = pipelines.map(pipeline => `
            <li>
                <strong>Name:</strong> ${pipeline.name}<br>
                <strong>Description:</strong> ${pipeline.description}<br>
                <strong>Tools:</strong> ${pipeline.tools}<br>
                <strong>Status:</strong> ${pipeline.status}
            </li>
        `).join('');
    }

    function addPipeline(event) {
        event.preventDefault();
        const name = document.getElementById('pipeline-name').value;
        const description = document.getElementById('pipeline-description').value;
        const tools = document.getElementById('pipeline-tools').value;
        const status = document.getElementById('pipeline-status').value;

        const pipelines = JSON.parse(localStorage.getItem(`pipelines_${user.username}`)) || [];
        pipelines.push({ name, description, tools, status });
        localStorage.setItem(`pipelines_${user.username}`, JSON.stringify(pipelines));
        loadPipelines();
        addPipelineForm.reset(); // Clear the form after submission
    }

    showAddPipelineFormButton.addEventListener('click', function() {
        addPipelineForm.style.display = addPipelineForm.style.display === 'none' ? 'block' : 'none';
    });

    addPipelineForm.addEventListener('submit', addPipeline); // Ensure form element is correctly referenced

    logoutButton.addEventListener('click', function() {
        localStorage.removeItem('loggedInUser');
        window.location.href = 'login.html';
    });

    loadPipelines();
});

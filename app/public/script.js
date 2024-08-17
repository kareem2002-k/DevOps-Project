let pipelines = [];
let history = [];

function addPipeline() {
    const pipelineName = document.getElementById('pipelineName').value.trim();
    const environment = document.getElementById('environment').value;

    if (pipelineName === "") {
        alert("Please enter a valid pipeline name.");
        return;
    }

    const pipeline = {
        id: Date.now(),
        name: pipelineName,
        environment,
        status: 'in-progress',  // Default status when added
        timestamp: new Date().toLocaleString()
    };

    pipelines.push(pipeline);
    history.push(pipeline);

    updatePipelinesUI();
    clearInputs();
}

function updatePipelinesUI() {
    const pipelineList = document.getElementById('pipelineList');
    if (pipelineList) {
        pipelineList.innerHTML = "";

        pipelines.forEach(pipeline => {
            const listItem = document.createElement('li');
            listItem.className = pipeline.status;
            listItem.textContent = `${pipeline.name} (${pipeline.environment}) - ${pipeline.status}`;

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.className = 'delete-btn';
            deleteBtn.onclick = () => deletePipeline(pipeline.id);

            listItem.appendChild(deleteBtn);
            pipelineList.appendChild(listItem);
        });
    }
}

function deletePipeline(id) {
    pipelines = pipelines.filter(pipeline => pipeline.id !== id);
    updatePipelinesUI();
}

function clearInputs() {
    document.getElementById('pipelineName').value = '';
    document.getElementById('environment').value = 'development';
}

// Simulate deployment status update
setInterval(() => {
    pipelines = pipelines.map(pipeline => {
        if (pipeline.status === 'in-progress') {
            const randomStatus = Math.random() > 0.5 ? 'success' : 'failure';
            return { ...pipeline, status: randomStatus };
        }
        return pipeline;
    });
    updatePipelinesUI();
}, 5000);  // Updates every 5 seconds

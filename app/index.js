const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve the Dashboard page
app.get('/', (req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, 'public') });
});

// Serve the Pipeline Management page
app.get('/pipelines', (req, res) => {
  res.sendFile('pipelines.html', { root: path.join(__dirname, 'public') });
});

// Serve the Environment Monitoring page
app.get('/environments', (req, res) => {
  res.sendFile('environments.html', { root: path.join(__dirname, 'public') });
});

// Optional: API route to fetch deployment data (example)
app.get('/api/deployments', (req, res) => {
  // Sample data, replace with actual data fetching logic
  const deployments = [
    { id: 1, name: 'Deployment 1', status: 'success' },
    { id: 2, name: 'Deployment 2', status: 'failure' },
  ];
  res.json(deployments);
});

// Start the server
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
}

module.exports = app;


# DevOps-Project

This project sets up and deploys a real-time chat application using Docker and Ansible. The application consists of a front-end interface built with React and a back-end API built with Node.js and Express. Docker Compose is used to manage both the front-end and back-end services, ensuring they work together seamlessly.

## Project Structure

```plaintext
DevOps-Project/
│
├── ansible/
│   ├── playbook.yml        # Ansible playbook for deployment
│   └── inventory           # Ansible inventory file
│
├── chatapp/
│   ├── Dockerfile          # Dockerfile for the front end
│   ├── src/                # Source code for the front end
│   └── package.json        # Front end dependencies and scripts
│
├── chat-app-backend/
│   ├── Dockerfile          # Dockerfile for the back end
│   ├── src/                # Source code for the back end
│   └── package.json        # Back end dependencies and scripts
│
├── docker-compose.yml      # Docker Compose file defining the application
│
└── README.md               # Project documentation
```

## Front End

The front end of the chat application is built using **React**. It provides a user-friendly interface where users can:

- Log in and view their contacts.
- Send and receive messages in real-time.
- Search for friends and start conversations.

The front end communicates with the back-end API to retrieve and send data. The UI is responsive and designed to resemble modern chat applications like Messenger.

### Front-End Directory Structure

- **Dockerfile**: Defines how the front end is built and run inside a Docker container.
- **src/**: Contains all the React components, styles, and assets.
- **package.json**: Manages the front-end dependencies and scripts.

## Back End

The back end of the chat application is built using **Node.js** and **Express**. It provides the API endpoints necessary for the front end to interact with the server, including:

- User authentication and session management.
- Handling real-time messaging using WebSockets.
- Managing user data, contacts, and messages.

The back end connects to a MongoDB database to store and retrieve chat data.

### Back-End Directory Structure

- **Dockerfile**: Defines how the back end is built and run inside a Docker container.
- **routes**:  inclueds API routes .
- **index** : Contains all the server-side code,and WebSocket logic.
- **package.json**: Manages the back-end dependencies and scripts.

## Docker Compose

**Docker Compose** is used to manage and orchestrate both the front-end and back-end services. The `docker-compose.yml` file defines the services, networks, and volumes required to run the application.

### How Docker Compose Works

1. **Front End**: The front end is built and served using a React development server or a production build served by a simple HTTP server.
2. **Back End**: The back end runs on a Node.js server, listening for API requests and WebSocket connections.
3. **Networking**: Docker Compose sets up a network so that the front end can communicate with the back end using service names.

### Commands

- To start the application: `docker-compose up -d`
- To stop the application: `docker-compose down`

This setup ensures that the front end and back end are consistently up and running together, making development and deployment more straightforward.

## Ansible Automation

Ansible is used to automate the deployment process. The `playbook.yml` installs Docker and Docker Compose, verifies the installation, and then uses Docker Compose to bring up the entire application stack.

## Getting Started

1. Clone this repository:
   ```sh
   git clone https://github.com/kareem2002-k/DevOps-Project.git
   cd DevOps-Project
   cd ansible

   ```

2. Run the Ansible playbook to set up the environment and deploy the application:
   ```sh
   ansible-playbook ansible/playbook.yml
   ```

3. Access the chat application by navigating to `http://localhost:3000` in your web browser (assuming the front end is exposed on port 3000).


## Jenkin Automation

## Getting Started

1. Clone this repository:
   ```sh
   git clone https://github.com/kareem2002-k/DevOps-Project.git
   cd DevOps-Project
   cd jenkins
   ```

2. Run the Jenkins with docker compose :
   ```sh
   docker-compose up
   ```

3. Access Jenkins by navigating to `http://localhost:8081/` in your web browser.


## Terraform 

## Getting Started

1. Clone this repository:
   ```sh
   git clone https://github.com/kareem2002-k/DevOps-Project.git
   cd DevOps-Project
   cd terraform
   ```

2. Run the Terraform with  :
   ```sh
      terraform init
      steraform apply
   ```

## Conclusion

This project demonstrates how to deploy a modern, real-time chat application using Docker and Ansible. By containerizing both the front end and back end, Docker Compose ensures that the entire application stack is up and running in a consistent and reproducible environment.

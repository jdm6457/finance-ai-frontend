Personal Finance AI - Frontend MockupThis project is a standalone, containerized frontend for a modern Personal Finance AI dashboard. It is built with React and styled with Tailwind CSS, providing a visually appealing and responsive user interface for displaying financial data.The application is currently running with mock data and is designed to be connected to a backend API for full functionality.FeaturesModern Dashboard UI: A clean, dark-themed interface designed for clarity and ease of use.Responsive Design: The layout adapts gracefully to various screen sizes, from mobile to desktop.Data Visualization: Interactive charts powered by Recharts for visualizing spending by category and cash flow over time.Component-Based Architecture: Built with reusable React components for maintainability and scalability.Containerized: Packaged with Docker and served by a lightweight Nginx server for consistent and reliable deployment.Tech StackFrontend: React.jsStyling: Tailwind CSSCharting: RechartsIcons: Lucide ReactBuild Tool: Create React App (react-scripts)Deployment: Docker & NginxPrerequisitesBefore you begin, ensure you have the following installed on your local machine:Node.js (LTS version recommended)npm (comes with Node.js)Docker DesktopSetup and InstallationClone the repository:git clone <your-repo-url>
cd finance-ai-frontend
Install dependencies:This command will install all the necessary packages listed in package.json.npm install
Running the ApplicationYou can run the application in two ways: locally for development or in a Docker container for a production-like environment.1. Local Development ModeThis method is best for active development as it provides hot-reloading.npm start
This will start the development server and open the application in your default web browser, typically at http://localhost:3000.2. Production Mode (with Docker)This method builds the application for production and serves it from a lightweight Nginx container, exactly as we have been doing.Build the Docker image:docker build -t finance-ai-frontend .
Run the Docker container:docker run --name finance-app -p 3000:80 finance-ai-frontend
The application will be available at http://localhost:3000.Project Structure/
├── public/           # Static assets and index.html template
├── src/              # Main application source code
│   ├── App.js        # Main application component
│   ├── index.css     # Tailwind CSS directives
│   └── index.js      # Application entry point
├── .dockerignore     # Files to ignore in the Docker build
├── Dockerfile        # Instructions for building the Docker image
├── nginx.conf        # Nginx configuration for serving the app
├── package.json      # Project dependencies and scripts
└── tailwind.config.js # Tailwind CSS configuration

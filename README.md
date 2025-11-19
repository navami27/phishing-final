# 🛡️ AI Phishing Guard (Final Year Project)

An AI-powered Chrome Extension that detects phishing websites in real-time using Local LLMs (Large Language Models). The system uses a Microservices architecture with a Node.js bridge and Langflow AI engine, fully containerized with Docker.

![Project Status](https://img.shields.io/badge/Status-Complete-green)
![Docker](https://img.shields.io/badge/Docker-Enabled-blue)
![CI/CD](https://img.shields.io/badge/CI%2FCD-GitHub%20Actions-orange)

## 🏗️ Architecture

The project follows a modern Microservices pattern:

1.  **Frontend (Chrome Extension):** Captures the user's current tab URL.
2.  **Bridge Server (Node.js - Port 3000):** Handles browser security (CORS) and data formatting.
3.  **AI Engine (Langflow - Port 7860):** Orchestrates the LLM (Qwen/Llama) to analyze the URL.
4.  **Infrastructure:** Both services run inside a unified **Docker Container**.

## 🚀 Quick Start (For Developers)

### Prerequisites
* [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running.
* Google Chrome.

### Step 1: Start the Backend (Docker)
Run the entire system with one command. Docker handles all Python and Node.js dependencies automatically.

```bash
# 1. Clone the repo
git clone <YOUR_REPO_URL>
cd Phishing_Project_Final

# 2. Start the container
docker-compose up --build

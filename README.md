Full-Stack Web App with CI/CD and AWS Deployment

A production-ready Node.js + Express + MongoDB application, fully containerized with Docker and automatically deployed to AWS EC2 via GitHub Actions.

This project showcases modern DevOps practices — automation, security, and reproducible deployment.

Tech Stack

Backend: Node.js (Express)

Database: MongoDB Atlas

Containerization: Docker

CI/CD: GitHub Actions

Cloud: AWS EC2

 Architecture Flow

Commit → triggers GitHub Actions

Builds Docker image → pushes to Docker Hub

EC2 pulls latest image → restarts container

App goes live on EC2 public IP / DNS

 Docker Commands
docker build -t <dockerhub-username>/cynthias-hub .
docker run -d -p 5000:5000 <dockerhub-username>/cynthias-hub
docker push <dockerhub-username>/cynthias-hub

 Environment Variables

Create a .env file:

PORT=5000
MONGO_URI=<your-mongodb-uri>
JWT_SECRET=<your-jwt-secret>
EC2_PUBLIC_IP=<your-ec2-ip>


 Secrets are stored securely under GitHub → Settings → Secrets → Actions

☁️ Deployment Steps

Launch EC2 (Ubuntu 22.04)

Install Docker

sudo apt update && sudo apt install docker.io -y


Allow inbound ports 22 (SSH) and 80 (HTTP)

GitHub Actions automatically deploys on push to main

 Next Steps

Add authentication (JWT)

Integrate Nginx for reverse proxy + SSL

Add monitoring (CloudWatch / PM2)

Metadata

Category: DevOps · Full-Stack · Cloud Automation
Topics: nodejs · express · mongodb · docker · aws · ec2 · github-actions · cicd

 License

Open-source under the MIT License
.

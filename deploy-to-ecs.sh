#!/bin/bash

# Secure PIN App - ECS Deployment Script
# Run this script in your ECS instance terminal

set -e

echo "🚀 Starting deployment to ECS..."

# Configuration
APP_NAME="secure-pin-app"
PORT=3000
DOCKER_IMAGE="${APP_NAME}:latest"

# Step 1: Check if Docker is installed
echo "📦 Checking Docker installation..."
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Installing Docker..."
    curl -fsSL https://get.docker.com -o get-docker.sh
    sudo sh get-docker.sh
    sudo systemctl start docker
    sudo systemctl enable docker
    sudo usermod -aG docker $USER
    echo "✅ Docker installed successfully"
else
    echo "✅ Docker is already installed"
fi

# Step 2: Stop and remove existing container if running
echo "🛑 Stopping existing container (if any)..."
sudo docker stop ${APP_NAME} 2>/dev/null || true
sudo docker rm ${APP_NAME} 2>/dev/null || true

# Step 3: Build Docker image
echo "🔨 Building Docker image..."
sudo docker build -t ${DOCKER_IMAGE} .

# Step 4: Run the container
echo "🚀 Starting container..."
sudo docker run -d \
  --name ${APP_NAME} \
  --restart unless-stopped \
  -p ${PORT}:3000 \
  -e NEXT_PUBLIC_API_BASE_URL=https://testfunction-ydwtamynnu.ap-southeast-3-vpc.fcapp.run \
  -e NEXT_PUBLIC_API_KEY=yjdeCUp67eIG90DKXuvi9YH4bKErZfPz \
  -e NEXT_PUBLIC_APP_KEY=205003178 \
  ${DOCKER_IMAGE}

# Step 5: Check container status
echo "✅ Checking container status..."
sleep 3
sudo docker ps | grep ${APP_NAME}

# Step 6: Show logs
echo "📋 Container logs:"
sudo docker logs ${APP_NAME} --tail 50

echo ""
echo "✅ Deployment complete!"
echo "🌐 Your app should be accessible at: http://YOUR_ECS_IP:${PORT}"
echo ""
echo "Useful commands:"
echo "  View logs: sudo docker logs ${APP_NAME} -f"
echo "  Stop app: sudo docker stop ${APP_NAME}"
echo "  Restart app: sudo docker restart ${APP_NAME}"
echo "  Remove app: sudo docker rm -f ${APP_NAME}"

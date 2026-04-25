# ECS Deployment Guide

## Prerequisites
- ECS instance running (you have this ready)
- SSH/Terminal access to ECS instance via workbench

## Deployment Steps

### Option 1: Automated Deployment (Recommended)

1. **Upload your project to ECS**
   
   In your ECS workbench terminal, run:
   ```bash
   # Install git if not available
   sudo yum install git -y  # For Alibaba Cloud Linux/CentOS
   # OR
   sudo apt-get install git -y  # For Ubuntu/Debian
   
   # Clone or upload your project
   # If using git:
   git clone <your-repo-url>
   cd <your-project-folder>
   
   # OR upload files manually using the workbench file upload feature
   ```

2. **Make deployment script executable**
   ```bash
   chmod +x deploy-to-ecs.sh
   ```

3. **Run deployment script**
   ```bash
   ./deploy-to-ecs.sh
   ```

### Option 2: Manual Deployment

If you prefer manual steps, run these commands in your ECS workbench:

```bash
# 1. Install Docker (if not installed)
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo systemctl start docker
sudo systemctl enable docker

# 2. Navigate to your project directory
cd /path/to/secure-pin-app

# 3. Build Docker image
sudo docker build -t secure-pin-app:latest .

# 4. Stop existing container (if any)
sudo docker stop secure-pin-app 2>/dev/null || true
sudo docker rm secure-pin-app 2>/dev/null || true

# 5. Run the container
sudo docker run -d \
  --name secure-pin-app \
  --restart unless-stopped \
  -p 3000:3000 \
  -e NEXT_PUBLIC_API_BASE_URL=https://testfunction-ydwtamynnu.ap-southeast-3-vpc.fcapp.run \
  -e NEXT_PUBLIC_API_KEY=yjdeCUp67eIG90DKXuvi9YH4bKErZfPz \
  -e NEXT_PUBLIC_APP_KEY=205003178 \
  secure-pin-app:latest

# 6. Check if it's running
sudo docker ps

# 7. View logs
sudo docker logs secure-pin-app -f
```

## Configure Security Group

Make sure your ECS security group allows inbound traffic on port 3000:

1. Go to ECS Console → Security Groups
2. Find your instance's security group
3. Add inbound rule:
   - Protocol: TCP
   - Port: 3000
   - Source: 0.0.0.0/0 (or your specific IP)

## Access Your App

Once deployed, access your app at:
```
http://YOUR_ECS_PUBLIC_IP:3000
```

To find your ECS public IP:
```bash
curl ifconfig.me
```

## Useful Docker Commands

```bash
# View running containers
sudo docker ps

# View all containers
sudo docker ps -a

# View logs
sudo docker logs secure-pin-app -f

# Stop container
sudo docker stop secure-pin-app

# Start container
sudo docker start secure-pin-app

# Restart container
sudo docker restart secure-pin-app

# Remove container
sudo docker rm -f secure-pin-app

# View Docker images
sudo docker images

# Remove image
sudo docker rmi secure-pin-app:latest
```

## Troubleshooting

### Container won't start
```bash
# Check logs
sudo docker logs secure-pin-app

# Check if port is already in use
sudo netstat -tulpn | grep 3000
```

### Can't access the app
1. Check if container is running: `sudo docker ps`
2. Check security group rules allow port 3000
3. Check if firewall is blocking: `sudo firewall-cmd --list-all`
4. Try accessing from ECS instance itself: `curl http://localhost:3000`

### Update deployment
```bash
# Pull latest code
git pull

# Rebuild and restart
sudo docker stop secure-pin-app
sudo docker rm secure-pin-app
sudo docker build -t secure-pin-app:latest .
sudo docker run -d --name secure-pin-app --restart unless-stopped -p 3000:3000 \
  -e NEXT_PUBLIC_API_BASE_URL=https://testfunction-ydwtamynnu.ap-southeast-3-vpc.fcapp.run \
  -e NEXT_PUBLIC_API_KEY=yjdeCUp67eIG90DKXuvi9YH4bKErZfPz \
  -e NEXT_PUBLIC_APP_KEY=205003178 \
  secure-pin-app:latest
```

## Production Considerations

For production deployment, consider:

1. **Use NGINX as reverse proxy** (port 80/443 instead of 3000)
2. **Set up SSL/TLS** with Let's Encrypt
3. **Use environment file** instead of inline env vars
4. **Set up monitoring** and logging
5. **Configure automatic backups**
6. **Use Docker Compose** for easier management

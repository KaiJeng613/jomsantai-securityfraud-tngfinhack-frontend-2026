# Deploy To Alibaba ECS

This project is prepared for Alibaba Cloud ECS in two ways:

- Docker deployment
- Direct Node.js deployment with `systemd`

The app listens on port `3000`. Put Nginx in front of it if you want port `80` or HTTPS.

## 1. Server Prerequisites

Use an Alibaba ECS Linux instance such as Ubuntu 22.04.

Open these ports in the ECS security group:

- `22` for SSH
- `80` for HTTP
- `443` for HTTPS
- `3000` only if you plan to expose the app directly

Install base packages:

```bash
sudo apt update
sudo apt install -y curl git nginx
```

## 2. Environment Variables

Create a production env file on the server:

```bash
cat > /var/www/secure-pin-app/.env.production <<'EOF'
NEXT_PUBLIC_API_BASE_URL=https://your-api-gateway-url.execute-api.region.amazonaws.com/prod
NEXT_PUBLIC_API_KEY=your-api-key-here
NEXT_PUBLIC_PIN_CREATE_ENDPOINT=/pin/create
NEXT_PUBLIC_PIN_VERIFY_ENDPOINT=/pin/verify
NEXT_PUBLIC_PIN_UPDATE_ENDPOINT=/pin/update
NEXT_PUBLIC_PIN_RESET_ENDPOINT=/pin/reset
EOF
```

## 3. Docker Deployment

Install Docker:

```bash
curl -fsSL https://get.docker.com | sh
sudo systemctl enable docker
sudo systemctl start docker
```

Copy the project to the server, then build and run:

```bash
cd /var/www/secure-pin-app
sudo docker build -t secure-pin-app .
sudo docker run -d \
  --name secure-pin-app \
  --restart unless-stopped \
  -p 3000:3000 \
  --env-file .env.production \
  secure-pin-app
```

Useful commands:

```bash
sudo docker logs -f secure-pin-app
sudo docker ps
sudo docker restart secure-pin-app
```

## 4. Direct Node.js Deployment

Install Node.js 20:

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
```

Build the app:

```bash
cd /var/www/secure-pin-app
npm ci
npm run build
```

Create the runtime user:

```bash
sudo useradd --system --shell /usr/sbin/nologin --home /var/www/secure-pin-app www-data || true
```

Install the service:

```bash
sudo cp deploy/ecs/secure-pin-app.service /etc/systemd/system/secure-pin-app.service
sudo systemctl daemon-reload
sudo systemctl enable secure-pin-app
sudo systemctl start secure-pin-app
```

Check status:

```bash
sudo systemctl status secure-pin-app
journalctl -u secure-pin-app -f
```

## 5. Nginx Reverse Proxy

Create `/etc/nginx/sites-available/secure-pin-app`:

```nginx
server {
    listen 80;
    server_name _;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

Enable it:

```bash
sudo ln -sf /etc/nginx/sites-available/secure-pin-app /etc/nginx/sites-enabled/secure-pin-app
sudo nginx -t
sudo systemctl restart nginx
```

## 6. Update Workflow

When you deploy a new version:

```bash
cd /var/www/secure-pin-app
git pull
```

For Docker:

```bash
sudo docker build -t secure-pin-app .
sudo docker rm -f secure-pin-app
sudo docker run -d \
  --name secure-pin-app \
  --restart unless-stopped \
  -p 3000:3000 \
  --env-file .env.production \
  secure-pin-app
```

For direct Node.js:

```bash
npm ci
npm run build
sudo systemctl restart secure-pin-app
```

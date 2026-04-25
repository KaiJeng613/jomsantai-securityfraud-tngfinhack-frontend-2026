# Secure PIN App

Next.js app for the Secure PIN flow, account screens, and authentication UI.

## Local Development

Install dependencies:

```bash
npm install
```

Create your local env file:

```bash
cp .env.example .env.local
```

Run the app:

```bash
npm run dev
```

## Environment Variables

```env
NEXT_PUBLIC_API_BASE_URL=https://your-api-gateway-url.execute-api.region.amazonaws.com/prod
NEXT_PUBLIC_API_KEY=your-api-key-here
NEXT_PUBLIC_PIN_CREATE_ENDPOINT=/pin/create
NEXT_PUBLIC_PIN_VERIFY_ENDPOINT=/pin/verify
NEXT_PUBLIC_PIN_UPDATE_ENDPOINT=/pin/update
NEXT_PUBLIC_PIN_RESET_ENDPOINT=/pin/reset
```

## Production Build

This project is configured with Next.js `standalone` output for VM deployment.

Build locally:

```bash
npm run build
```

Run the standalone server:

```bash
npm run start:standalone
```

## Alibaba ECS Deployment

Deployment instructions are in:

[deploy/alibaba-ecs.md](C:\Source\Repos\tnghackathon\jomsantai-securityfraud-tngfinhack-frontend-2026\deploy\alibaba-ecs.md)

The repo now includes:

- `Dockerfile` for container deployment on ECS
- `deploy/ecs/secure-pin-app.service` for direct Node.js + `systemd`
- `next.config.mjs` with `output: "standalone"`

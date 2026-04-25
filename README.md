# Secure PIN App

A Next.js mobile-responsive financial app with Secure PIN feature.

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure AWS Lambda Endpoints

Copy `.env.example` to `.env.local` and update with your AWS Lambda API Gateway URL:

```bash
cp .env.example .env.local
```

Edit `.env.local`:
```
NEXT_PUBLIC_API_BASE_URL=https://your-api-gateway-url.execute-api.region.amazonaws.com/prod
NEXT_PUBLIC_API_KEY=your-api-key-here
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Configuration

The app is configured to call AWS Lambda endpoints for PIN operations:

- **Create PIN**: `POST /pin/create`
- **Verify PIN**: `POST /pin/verify`
- **Update PIN**: `PUT /pin/update`
- **Reset PIN**: `POST /pin/reset`

### Using the API Service

```typescript
import { pinService } from '@/lib/api/pinService';

// Create PIN
const result = await pinService.createPin({
  userId: '12345',
  pin: '1234',
});

if (result.success) {
  console.log('PIN created:', result.data);
} else {
  console.error('Error:', result.error);
}
```

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── page.tsx           # Home page
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── BalanceCard.tsx
│   ├── QuickActions.tsx
│   ├── PromoSection.tsx
│   ├── RecommendedSection.tsx
│   ├── FavouritesSection.tsx
│   ├── GoFinanceBanner.tsx
│   └── BottomNav.tsx
├── lib/                   # Utilities and services
│   └── api/              # API configuration
│       ├── config.ts     # API endpoints config
│       ├── client.ts     # HTTP client
│       └── pinService.ts # PIN service methods
├── .env.local            # Environment variables (not in git)
└── .env.example          # Example environment variables
```

## Build for Production

```bash
npm run build
npm start
```

## Notes

- Update `.env.local` with your actual AWS Lambda endpoint tonight
- The API client includes timeout handling (30s default)
- All API calls return a consistent `ApiResponse` format
- API key is sent via `x-api-key` header

# Virenix Frontend

Modern Next.js 14+ App Router + TypeScript frontend for Virenix game server hosting.

## Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Icons**: lucide-react
- **Font**: Outfit + Inter (Google Fonts)

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Visit `http://localhost:3000` to see the coming soon page.

### Building for Production

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── waitlist/
│   │       └── route.ts          # Waitlist API endpoint
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Coming soon page
│   ├── globals.css               # Global styles + Virenix colors
│   └── ...
└── ...
```

## API Integration

### Waitlist Endpoint

The waitlist form submits to `/api/waitlist`:

**POST** `/api/waitlist`
```json
{
  "email": "user@example.com"
}
```

**TODO**: Connect this to your Laravel backend:

```typescript
// src/app/api/waitlist/route.ts
const res = await fetch('https://api.virenix.nl/waitlist', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email }),
});
```

## Styling

All colors use CSS variables from the Virenix brand guide:

```css
--primary-bg-navy: #0d1219
--secondary-bg-blue: #185fa5
--secondary-bg-cyan: #1f73c2
--secondary-bg-teal: #1d9e75
--text-primary: #ffffff
--text-secondary: #7a9cc4
```

## Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel deploy
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Traditional Hosting

```bash
npm run build
# Copy `.next/`, `public/`, and `package.json` to production server
npm install --production
npm start
```

## Next Steps

1. **Landing Page**: Create `/src/app/landing/` with full marketing content
2. **Pricing Page**: `/src/app/pricing/`
3. **About Page**: `/src/app/about/`
4. **Dashboard Portal**: Connect to Laravel API for authenticated pages
5. **Blog/Docs**: Add MDX support for content

## Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Then update with your actual values.

## Contributing

Follow the Next.js and TypeScript best practices. Use `btn-polish` and `card-polish` classes for consistent interactions.

## License

Proprietary - Virenix

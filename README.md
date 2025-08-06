This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## PayFast Java SDK Example UI

This project demonstrates PayFast integration using the PayFast Java SDK with a modern Next.js frontend and AWS Lambda backend architecture:

### Architecture Overview:
- **Frontend**: Next.js React application with TypeScript and Tailwind CSS
- **Backend**: AWS Lambda function using the PayFast Java SDK
- **Integration**: UI makes API calls to Lambda endpoints that generate PayFast form data
- **Payment Processing**: Secure PayFast payment forms generated server-side using Java SDK

### Features:
- Product listing with responsive design
- PayFast Java SDK integration via Lambda functions
- Smooth animations with Framer Motion
- Server-side payment form generation for security
- Environment-based configuration

## Environment Configuration

Before running the application, copy the example environment file and configure your API host:

```bash
cp .env.example .env.local
```

Edit `.env.local` and update the following variables:

```env
# API Configuration
NEXT_PUBLIC_API_HOST=http://localhost:3000
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

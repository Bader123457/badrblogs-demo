# BlogBoost

A modern AI-powered blog idea generator that helps content creators generate engaging blog post ideas instantly.

## Features

- **AI-Powered Generation**: Generate creative blog post titles and descriptions using OpenAI's GPT models
- **Topic-Based Ideas**: Input any topic or niche to get 5 tailored blog post ideas
- **Responsive Design**: Beautiful, mobile-first design that works on all devices
- **Real-time Generation**: Fast idea generation with loading states and error handling
- **Mock Data Fallback**: Works seamlessly even without OpenAI credits for local development

## Technologies Used

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui components
- **Backend**: Supabase (Edge Functions)
- **AI**: OpenAI GPT-4o-mini API (optional - mock data fallback included)

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account and project (for Edge Functions)
- OpenAI API key (optional - app includes fallback mock data)

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd blogboost
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

### OpenAI Integration (Optional)

If you want to use real AI-generated ideas instead of mock data:

1. Get an OpenAI API key from [OpenAI Platform](https://platform.openai.com/)
2. Configure the `OPENAI_API_KEY` secret in your Supabase project dashboard
3. The app will automatically use OpenAI when credits are available

**Note**: If OpenAI credits are $0 or the API key is not configured, the app automatically falls back to high-quality mock data, so you can still demo and use the application locally.

## Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Route components
├── lib/                # Utility functions
├── integrations/       # Supabase integration
└── index.css          # Global styles and design tokens

supabase/
└── functions/          # Edge functions (auto-deployed)
```

## Features Overview

- **Clean, Modern UI**: Built with Tailwind CSS and shadcn/ui components
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **AI-Powered**: Uses OpenAI's GPT-4o-mini for generating creative blog ideas
- **Fallback System**: Includes mock data when AI is unavailable
- **No Authentication Required**: Simple, accessible design without login barriers

## Deployment

The app can be deployed to any static hosting service:

1. Build the project:
```bash
npm run build
```

2. Deploy the `dist` folder to your hosting service (Vercel, Netlify, etc.)

## License

This project is licensed under the MIT License.

## Tech Stack

Built with modern web technologies:
- **Vite** for fast development and building
- **TypeScript** for type safety
- **React 18** with modern hooks and patterns
- **Tailwind CSS** for responsive styling
- **Supabase** for backend Edge Functions
- **OpenAI** for AI-powered content generation
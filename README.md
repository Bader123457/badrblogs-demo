# BlogBoost

A modern AI-powered blog idea generator that helps content creators generate engaging blog post ideas instantly.

## Features

- **AI-Powered Generation**: Generate creative blog post titles and descriptions using OpenAI's GPT models
- **Topic-Based Ideas**: Input any topic or niche to get 5 tailored blog post ideas
- **Save & Organize**: Save your favorite ideas for later reference (authentication required)
- **Responsive Design**: Beautiful, mobile-first design that works on all devices
- **Real-time Generation**: Fast idea generation with loading states and error handling

## Technologies Used

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui components
- **Backend**: Supabase (Database, Auth, Edge Functions)
- **AI**: OpenAI GPT-4o-mini API
- **State Management**: React Query for server state
- **Routing**: React Router DOM

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account and project
- OpenAI API key (optional - app includes fallback mock data)

### Environment Variables

Create a Supabase project and configure these environment variables in your Supabase dashboard:

```bash
# Supabase Secrets (configure in Supabase Dashboard > Settings > Secrets)
OPENAI_API_KEY=your_openai_api_key_here  # Optional - fallback data will be used if not provided
```

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

3. Set up Supabase:
   - Create a new Supabase project
   - Run the included migrations to set up the database schema
   - Configure authentication providers as needed

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:5173](http://localhost:5173) in your browser

## Database Schema

The app uses a simple `blog_ideas` table with Row Level Security (RLS) policies:

```sql
- id (uuid, primary key)
- user_id (uuid, references auth.users)
- title (text)
- description (text)
- topic (text, optional)
- created_at (timestamp)
- updated_at (timestamp)
```

## API Integration

### OpenAI Integration
- Uses GPT-4o-mini for generating blog ideas
- Includes comprehensive error handling
- Falls back to mock data if API is unavailable
- Configurable temperature and token limits

### Edge Functions
- `generate-blog-ideas`: Processes topic input and returns structured blog ideas
- Includes CORS handling for web app integration
- Built-in fallback system for reliability

## Development

### Project Structure
```
src/
├── components/          # Reusable UI components
├── pages/              # Route components
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── integrations/       # Third-party service integrations
└── index.css          # Global styles and design tokens

supabase/
├── functions/          # Edge functions
└── migrations/         # Database migrations
```

### Design System
- Uses semantic color tokens defined in `index.css`
- Consistent spacing and typography scale
- Dark/light mode support
- Mobile-first responsive design

## Deployment

The app can be deployed to any static hosting service:

1. Build the project:
```bash
npm run build
```

2. Deploy the `dist` folder to your hosting service
3. Configure Supabase environment variables in your hosting dashboard

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with modern React and TypeScript best practices
- Styled with Tailwind CSS and shadcn/ui components
- Powered by Supabase for backend functionality
- AI capabilities provided by OpenAI's GPT models
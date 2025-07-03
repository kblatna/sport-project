# Sport Project - Frontend

Vue.js frontend application for sports project with race results and registrations.

## Technologies

- **Vue 3** - Progressive JavaScript framework
- **Vite** - Fast build tool
- **TypeScript** - Type-safe JavaScript
- **Bootstrap** - CSS framework for styling
- **Axios** - HTTP client for API communication

## Quick Start

### With Docker Compose (recommended)
```sh
# Start entire project including backend and database
docker compose up -d

# Frontend will be available at: http://localhost:8080
```

### Local Development
```sh
# Install dependencies
npm install

# Start dev server
npm run dev

# Application will be available at: http://localhost:5173
```

## Project Structure

```
src/
├── assets/          # Static files (images, styles)
├── components/      # Vue components
├── views/          # Application pages
├── services/       # API services and configuration
├── interface/      # TypeScript types and interfaces
└── router/         # Vue Router configuration
```

## Available Commands

```sh
# Development
npm run dev          # Start dev server

# Production
npm run build        # Build for production
npm run preview      # Preview production build

# Linting
npm run lint         # Code linting
```

## API Communication

Frontend communicates with backend API through Vite proxy configuration:

- **Development**: `/api/*` → `http://localhost:3001/api/*`
- **Production**: Configuration via environment variables

## Features

- **Results Display** - Overview of race results
- **Registration** - Form for race registration
- **Contact** - Contact form
- **User Management** - CRUD operations (admin)

## Configuration

### Environment Variables

Create `.env` file:
```env
VITE_API_BASE_URL=http://localhost:3001
```

### Proxy Configuration

Proxy is configured in `vite.config.ts` to redirect API calls to backend.

## Troubleshooting

### Port 3002 Error
If you see error with port 3002, check:
- That backend is running on port 3001
- Environment variables in `.env`
- Proxy configuration in `vite.config.ts`

### CORS Errors
Backend must have CORS configured for frontend port (8080 or 5173).

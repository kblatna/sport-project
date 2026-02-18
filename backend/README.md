# Sport Project - Backend API

NestJS REST API for sports application with user management, race results and registrations.

## Technologies

- **NestJS** - Progressive Node.js framework
- **TypeScript** - Type-safe JavaScript
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM with pagination
- **Docker** - Containerization
- **Joi** - Environment validation
- **Throttler** - Rate limiting

## Quick Start

### With Docker Compose (recommended)
```bash
# Start entire project including frontend and database
docker compose up --build

# API will be available at: http://localhost:3001
```

### Local Development
```bash
# Install dependencies
npm install

# Set up environment variables (see Configuration section)
cp .env.example .env

# Start in watch mode
npm run start:dev

# API will be available at: http://localhost:3001
```

## 📁 Project Structure

```
src/
├── @types/              # TypeScript type definitions
├── databases/           # MongoDB schemas and models
├── global/              # Global utilities (decorators, DTOs, error handling)
├── integrations/        # External integrations
│   ├── mail/           # Email service (Mailgun)
│   └── turnstile/      # Cloudflare Turnstile validation
└── modules/            # Modular application structure
    ├── user/           # User management
    ├── contact/        # Contact forms
    ├── raceApplication/ # Race registrations
    ├── result/         # Race results with pagination
    └── *PageContent/   # CMS content modules
```

## 🔧 Available Commands

```bash
# Development
npm run start          # Start application
npm run start:dev      # Watch mode with hot reload
npm run start:debug    # Debug mode

# Production
npm run start:prod     # Production mode
npm run build          # Build application

# Testing
npm run test           # Unit tests
npm run test:e2e       # End-to-end tests
npm run test:cov       # Coverage report

# Linting
npm run lint           # Code linting
npm run format         # Code formatting
```

## 🌐 API Endpoints

### 👤 Users (`/api/users`)
- `GET /` - Get all users
- `GET /:id` - Get user by ID
- `POST /` - Create new user
- `PATCH /:id` - Update user
- `DELETE /:id` - Delete user

### 📊 Results (`/api/results`)
- `GET /` - Get paginated results with optional filters

**Query Parameters:**
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 25, max: 500)
- `sortBy` - Sort field (e.g., 'rank', 'name')
- `sortOrder` - Sort direction ('asc' or 'desc')
- `rank`, `startNumber`, `name`, `category`, `year` - Filter fields

### 📝 Race Applications (`/api/race-application`)
- `POST /` - Register for a race (rate limited: 5/min)

**Required fields:** firstName, lastName, email, dateOfBirth, category, race, token (Turnstile)

### 📞 Contact (`/api/contact`)
- `POST /` - Send contact form (rate limited: 3/min)

**Required fields:** name, email, message, token (Turnstile)

### 📄 Content Pages
- `GET /api/main-page-content` - Main page content
- `GET /api/result-page-content` - Results page content
- `GET /api/organizers-page-content` - Organizers page content
- `GET /api/links-page-content` - Links page content
- `GET /api/signup-page-content` - Signup page content
- `GET /api/contact-page-content` - Contact page content
- `GET /api/info-page-content` - Info page content
- `GET /api/footer-content` - Footer content
- `GET /api/navigation` - Navigation menu

## 🗄️ Database

### MongoDB Connection
Connection string is configured via environment variable `MONGODB_URI`.

**Example:**
```
MONGODB_URI=mongodb://root:password@mongodb:27017/mulda?authSource=admin
```

### Database Indexes

For optimal performance, the following indexes are automatically created:

**Users:**
- `username` (unique)
- `email` (unique)

**Results:**
- `year + category` (compound)
- `name`

**RaceApplications:**
- `createdAt` (descending)
- `email`
- `race + category` (compound)

**Contacts:**
- `createdAt` (descending)

### Schemas

**User Schema:**
```typescript
{
  name: string,
  username: string (unique),
  email: string (unique),
  createdAt: Date,
  updatedAt: Date | null
}
```

**Result Schema:**
```typescript
{
  rank: number,
  startNumber: number,
  dateOfBirth: number,
  name: string,
  totalTime: string,
  category: string,
  year: number
}
```

**RaceApplication Schema:**
```typescript
{
  firstName: string,
  lastName: string,
  email: string,
  dateOfBirth: Date,
  category: string,
  race: string,
  note?: string,
  token: string (Turnstile),
  honeypot?: string,
  createdAt: Date
}
```

## 🔧 Configuration

### Environment Variables

All environment variables are validated on application startup using Joi schema.

**Required:**
- `MONGODB_URI` - MongoDB connection string

**Optional:**
- `NODE_ENV` - Environment (development/production/test, default: development)
- `PORT` - Server port (default: 3001)
- `TURNSTILE_SECRET` - Cloudflare Turnstile secret key
- `MAILGUN_API_KEY` - Mailgun API key for emails
- `MAILGUN_DOMAIN` - Mailgun domain
- `MAILGUN_FROM` - Email sender address

**Example `.env` file:**
```env
NODE_ENV=development
PORT=3001
MONGODB_URI=mongodb://root:password@localhost:27017/mulda?authSource=admin
TURNSTILE_SECRET=your-turnstile-secret
MAILGUN_API_KEY=your-mailgun-key
MAILGUN_DOMAIN=your-domain.com
MAILGUN_FROM=noreply@your-domain.com
```

### Docker Compose
Database and all dependencies are automatically started via Docker Compose.
Make sure to set `TURNSTILE_SECRET` in your environment or docker-compose.yml.

## 🔒 Security & Validation

### Input Validation
- **DTOs** - Automatic input validation using class-validator
- **Transform pipes** - Data transformation before processing
- **Global validation** - Applied to all endpoints with whitelist mode

### Rate Limiting
Global and endpoint-specific rate limiting implemented using @nestjs/throttler:
- **Global:** 100 requests / 60 seconds
- **Contact form:** 3 requests / 60 seconds
- **Race applications:** 5 requests / 60 seconds

### Anti-Spam Protection
- **Cloudflare Turnstile** - Bot protection for forms
- **Honeypot fields** - Additional spam detection
- **Shared TurnstileService** - Centralized token validation

### CORS
CORS is configured for frontend ports:
- `http://localhost:8080`
- `http://localhost:5173`

## 🚨 Error Handling

- **Global exception filter** - Unified error processing
- **Custom ErrorException** - Custom error class for business logic errors
- **HTTP status codes** - Proper status codes for all responses
- **Validation errors** - Detailed error messages for invalid input
- **Environment validation** - Application fails fast if required env vars are missing

## 🐛 Troubleshooting

### Application Won't Start

**Environment validation error:**
```
Error: Config validation error: "MONGODB_URI" is required
```
→ Make sure all required environment variables are set

**Port already in use:**
```
Error: listen EADDRINUSE: address already in use :::3001
```
→ Change PORT in .env or stop process using port 3001

### Database Connection

**Connection refused:**
- Check that MongoDB container is running: `docker ps`
- Verify connection string in environment variables
- Try connecting from MongoDB Compass with the same URI

**Authentication failed:**
- Verify username and password in MONGODB_URI
- Check authSource parameter (should be `admin`)

### Rate Limiting

**429 Too Many Requests:**
→ You've exceeded the rate limit. Wait 60 seconds or adjust limits in `app.module.ts`

### CORS Errors

**Access-Control-Allow-Origin error:**
→ Make sure frontend is running on port 8080 or 5173, or add your port to CORS config in `main.ts`

## 📚 Additional Documentation

- [TODO.md](./TODO.md) - Planned improvements and deferred tasks
- [CODE_REVIEW_CHANGES.md](./CODE_REVIEW_CHANGES.md) - Recent code review fixes

## 🔗 Related Projects

- Frontend: `../frontend`
- Docker Compose: `../docker-compose.yml`


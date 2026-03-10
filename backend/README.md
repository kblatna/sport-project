# Sport Project - Backend API

NestJS REST API server for sports race management with user authentication, race results, participant registrations, and dynamic content management.

## 🚀 Technologies

### Core Framework
- **NestJS** - Progressive Node.js framework with modular architecture
- **TypeScript** - Type-safe JavaScript development
- **Node.js** - JavaScript runtime environment

### Database
- **MongoDB 7** - NoSQL database for flexible data storage
- **Mongoose** - Elegant MongoDB ODM with schema validation and pagination

### Security & Validation
- **Class Validator** - DTO validation and transformation
- **Joi** - Environment variable validation schema
- **Bcrypt** - Secure password hashing
- **Throttler** - Rate limiting and DDoS protection

### DevOps
- **Docker** - Containerization for consistent environments
- **ESLint** - Code linting and quality assurance

### External Services
- **Mailgun** - Email delivery service integration
- **Cloudflare Turnstile** - Bot protection for form submissions

## ⚡ Quick Start

### With Docker Compose (Recommended)

```bash
# Start entire project (backend, frontend, database)
docker compose up -d

# API will be available at: http://localhost:3001
# Health check: http://localhost:3001/health
```

### Local Development

```bash
# Install dependencies
npm install

# Create environment file
cp .env.example .env
# Edit .env with your configuration (see Configuration section)

# Start in development mode with hot reload
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

### Database Seeding

The project includes seed data for development and testing purposes.

**Run seeds:**
```bash
npm run seed
```

**Default admin accounts:**
- **Admin:** `admin@example.com` / `Admin123!`
- **Editor:** `editor@example.com` / `Editor123!`

**Security Notice:** Change these credentials in production or disable seeding entirely.

The seed script will populate:
- Admin and editor users
- Navigation menu
- Footer content
- Page content (main, contact, info, signup, links, organizers, results)
- Sample race results

### Schemas

**User Schema:**
```typescript
{
  name: string,
  email: string (unique),
  password: string (bcrypt hashed),
  role: 'editor' | 'admin' (default: 'editor'),
  isActive: boolean (default: true),
  createdAt: Date,
  lastLogin: Date | null,
  updatedAt: Date
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

- **Main Project**: [../README.md](../README.md) - Complete project overview and setup
- **Frontend**: [../frontend/README.md](../frontend/README.md) - Frontend application documentation
- **Database Seeds**: [./src/seeds/README.md](./src/seeds/README.md) - Database seeding guide
- **TODO**: [./TODO.md](./TODO.md) - Planned improvements and deferred tasks
- **Auth Setup**: [./AUTH_SETUP.md](./AUTH_SETUP.md) - Authentication configuration guide

## 🔗 Related Resources

- **NestJS Documentation**: https://docs.nestjs.com
- **Mongoose Documentation**: https://mongoosejs.com/docs
- **MongoDB Manual**: https://docs.mongodb.com/manual
- **Cloudflare Turnstile**: https://developers.cloudflare.com/turnstile

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Code Standards

- **TypeScript**: Strict mode with proper typing
- **ESLint**: Must pass linting checks
- **Testing**: Add tests for new features
- **Documentation**: Update README for significant changes

## 📄 License

[Your License Here]

---

**Project Status**: Active Development  
**Last Updated**: March 2026  
**API Version**: 1.0.0

For complete project documentation, see the [main README](../README.md).


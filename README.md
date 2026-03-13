# Sport Project - Mulda Race Management System

Full-stack web application for managing sport race results, participant registrations, and content management for the Mulda race event.
**INFO NOTICE: The app is still in development, but you can check it out at [https://mulda.netlify.app](https://mulda.netlify.app). Please be patient. The app is deployed in free mode on render.com, so there's currently a so-called cold start and the app takes longer to load.**

## 📋 Overview

This application provides:
- **Public Website**: Information about races, organizers, and sponsors
- **Race Registration**: Online registration system with anti-spam protection
- **Results Display**: Paginated race results with filtering and sorting
- **Contact Form**: Communication channel with rate limiting
- **Content Management**: Dynamic page content via RESTful API
- **Admin Panel**: User and content management (planned)

## 🏗️ Architecture

```
sport-project/
├── frontend/          # Vue.js 3 + TypeScript SPA
├── backend/           # NestJS REST API server
├── docker-compose.yml # Service orchestration
└── README.md         # This file
```

**Technology Stack:**
- **Frontend**: Vue 3, TypeScript, Vite, Tailwind CSS, PrimeVue
- **Backend**: NestJS, TypeScript, MongoDB, Mongoose
- **Infrastructure**: Docker, Docker Compose, MongoDB 7
- **Security**: Cloudflare Turnstile, Rate Limiting, Input Validation
- **Communication**: Mailgun for email notifications

## 🚀 Quick Start

### Prerequisites

- Docker and Docker Compose installed
- Ports 8080, 3001, and 27018 available

### Running the Complete Application

```bash
# Clone the repository
git clone <repository-url>
cd sport-project

# Start all services (frontend, backend, database)
docker compose up -d

# Check status
docker compose ps

# View logs
docker compose logs -f

# View logs for specific service
docker compose logs -f backend
```

### Application Access

Once all services are running, access:

- **Frontend Website**: http://localhost:8080
- **Backend API**: http://localhost:3001/api
- **API Health Check**: http://localhost:3001/health
- **MongoDB**: `mongodb://root:defekt2025@localhost:27018/mulda?authSource=admin`

### Initial Setup

1. **Start the application**:
   ```bash
   docker compose up -d
   ```

2. **Seed the database** (optional, for development):
   ```bash
   docker compose exec backend npm run seed
   ```
   
   This creates:
   - Admin account: `admin@example.com` / `Admin123!`
   - Editor account: `editor@example.com` / `Editor123!`
   - Sample content for all pages
   - Sample race results

3. **Access the website** at http://localhost:8080

### Stopping the Application

```bash
# Stop all services
docker compose down

# Stop and remove all data (including database)
docker compose down -v
```

## 🛠️ Technologies

### Frontend Stack
- **Vue 3.5** - Progressive JavaScript framework with Composition API
- **TypeScript** - Type-safe development with strict mode
- **Vite 7** - Next-generation build tool with HMR
- **Tailwind CSS 3** - Utility-first CSS framework
- **PrimeVue 4** - Rich UI component library
- **Vue Router 4** - Client-side routing with lazy loading
- **Axios** - HTTP client for API communication
- **Vuelidate** - Form validation
- **DOMPurify** - XSS protection

### Backend Stack
- **NestJS** - Progressive Node.js framework
- **TypeScript** - Type-safe server-side development
- **MongoDB 7** - NoSQL database
- **Mongoose** - MongoDB ODM with schema validation
- **Class Validator** - DTO validation
- **Joi** - Environment configuration validation
- **Bcrypt** - Password hashing
- **Throttler** - Rate limiting protection

### Infrastructure & DevOps
- **Docker & Docker Compose** - Containerization and orchestration
- **Node.js 20** - Runtime environment
- **ESLint 9** - Code linting and formatting

### External Services
- **Cloudflare Turnstile** - Bot protection for forms
- **Mailgun** - Email delivery service

## 📁 Project Structure

### Frontend Application (Port 8080)
```
frontend/
├── src/
│   ├── components/      # Reusable Vue components
│   │   ├── header/     # Navigation components
│   │   └── footer/     # Footer components
│   ├── views/          # Page views/routes
│   │   └── app/
│   │       └── views/  # Feature views (about, results, signup, etc.)
│   ├── services/       # API communication layer
│   │   ├── api/       # Service factories and instances
│   │   └── router/    # Vue Router configuration
│   ├── composables/   # Reusable composition functions
│   ├── interface/     # TypeScript interfaces
│   ├── types/         # Type declarations
│   ├── utils/         # Utility functions
│   └── config/        # App configuration
├── public/            # Static assets
│   ├── images/       # Image gallery
│   └── logo/         # Brand assets
└── Dockerfile        # Frontend container config
```

### Backend API Server (Port 3001)
```
backend/
├── src/
│   ├── @types/           # Custom TypeScript types
│   ├── config/           # Configuration and validation
│   ├── database/         # MongoDB schemas
│   │   ├── User.schema.ts
│   │   ├── Result.schema.ts
│   │   ├── RaceApplication.schema.ts
│   │   ├── Contact.schema.ts
│   │   └── *PageContent.schema.ts  # CMS schemas
│   ├── global/           # Global utilities and filters
│   ├── integrations/     # External service integrations
│   │   ├── mail/        # Mailgun integration
│   │   └── turnstile/   # Cloudflare Turnstile
│   ├── modules/          # Feature modules
│   │   ├── user/        # User management
│   │   ├── result/      # Race results
│   │   ├── raceApplication/ # Registration
│   │   ├── contact/     # Contact forms
│   │   └── *PageContent/ # CMS modules
│   └── seeds/           # Database seeding
│       ├── seed.ts
│       └── data/        # Seed data files
└── Dockerfile          # Backend container config
```

### Database (Port 27018)
- **Database Name**: `mulda`
- **Authentication**: Root credentials
- **Persistent Storage**: Docker volume `mongo_data`

## 🌐 API Documentation

### Core Endpoints

#### User Management (`/api/users`)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/users` | List all users | Yes |
| GET | `/api/users/:id` | Get user by ID | Yes |
| POST | `/api/users` | Create new user | Yes |
| PATCH | `/api/users/:id` | Update user | Yes |
| DELETE | `/api/users/:id` | Delete user | Yes |

#### Race Results (`/api/results`)
| Method | Endpoint | Description | Rate Limit |
|--------|----------|-------------|------------|
| GET | `/api/results` | Get paginated results with filters | - |

**Query Parameters:**
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 25, max: 500)
- `sortBy` - Sort field (rank, name, totalTime, category)
- `sortOrder` - asc/desc
- `rank`, `startNumber`, `name`, `category`, `year` - Filters

#### Race Registration (`/api/race-application`)
| Method | Endpoint | Description | Rate Limit |
|--------|----------|-------------|------------|
| POST | `/api/race-application` | Submit race registration | 5 req/min |

**Required fields:** firstName, lastName, email, dateOfBirth, category, race, token (Turnstile)

#### Contact Form (`/api/contact`)
| Method | Endpoint | Description | Rate Limit |
|--------|----------|-------------|------------|
| POST | `/api/contact` | Send contact message | 3 req/min |

**Required fields:** name, email, message, token (Turnstile)

#### Content Management System
| Endpoint | Description |
|----------|-------------|
| GET `/api/navigation` | Navigation menu structure |
| GET `/api/footer-content` | Footer content and links |
| GET `/api/main-page-content` | Main/home page content |
| GET `/api/info-page-content` | Info page content |
| GET `/api/contact-page-content` | Contact page content |
| GET `/api/signup-page-content` | Registration page content |
| GET `/api/links-page-content` | Links/sponsors page content |
| GET `/api/organizers-page-content` | Organizers page content |
| GET `/api/result-page-content` | Results page content |

#### Health Check
| Endpoint | Description |
|----------|-------------|
| GET `/health` | Application health status |

## 🔧 Development

### Local Development Setup

**Option 1: Full Docker Environment (Recommended)**
```bash
# Start all services
docker compose up -d

# Access:
# - Frontend: http://localhost:8080
# - Backend: http://localhost:3001/api
# - MongoDB: localhost:27018
```

**Option 2: Local Development with Docker Database**

1. **Start only MongoDB:**
   ```bash
   docker compose up mongodb -d
   ```

2. **Backend development:**
   ```bash
   cd backend
   npm install
   
   # Create .env file
   cp .env.example .env
   # Edit .env with your configuration
   
   npm run start:dev
   # API available at http://localhost:3001
   ```

3. **Frontend development:**
   ```bash
   cd frontend
   npm install
   
   # Create .env file (optional)
   echo "VITE_API_URL=http://localhost:3001/api" > .env
   echo "VITE_TURNSTILE_SITE_KEY=your_site_key" >> .env
   
   npm run dev
   # Frontend available at http://localhost:5173
   ```

### Environment Variables

**Backend (.env):**
```env
NODE_ENV=development
PORT=3001
MONGODB_URI=mongodb://root:defekt2025@localhost:27018/mulda?authSource=admin
TURNSTILE_SECRET=your_turnstile_secret
MAILGUN_API_KEY=your_mailgun_key
MAILGUN_DOMAIN=your_domain.com
MAILGUN_FROM=noreply@your_domain.com
```

**Frontend (.env):**
```env
VITE_API_URL=http://localhost:3001/api
VITE_TURNSTILE_SITE_KEY=your_turnstile_site_key
```

### Development Commands

**Docker:**
```bash
# Rebuild containers
docker compose up --build

# Follow logs for specific service
docker compose logs -f backend
docker compose logs -f frontend

# Restart specific service
docker compose restart backend

# Enter container shell
docker compose exec backend bash
docker compose exec frontend sh

# Stop all services
docker compose down

# Remove all containers and volumes
docker compose down -v
```

**Backend:**
```bash
npm run start:dev      # Development with watch mode
npm run start:debug    # Debug mode
npm run build          # Build for production
npm run start:prod     # Run production build
npm run lint           # Lint code
npm run format         # Format code
npm run test           # Run tests
npm run seed           # Seed database
```

**Frontend:**
```bash
npm run dev            # Development server (port 5173)
npm run build          # Build for production
npm run preview        # Preview production build
```

### Database Management

**Access MongoDB:**
```bash
# Using MongoDB Compass
mongodb://root:defekt2025@localhost:27018/mulda?authSource=admin

# Using mongosh
docker compose exec mongodb mongosh -u root -p defekt2025 --authenticationDatabase admin
```

**Seed Database:**
```bash
# From host
cd backend
npm run seed

# From Docker
docker compose exec backend npm run seed
```

**Backup/Restore:**
```bash
# Backup
docker compose exec mongodb mongodump -u root -p defekt2025 --authenticationDatabase admin -d mulda -o /backup

# Restore
docker compose exec mongodb mongorestore -u root -p defekt2025 --authenticationDatabase admin -d mulda /backup/mulda
```

## 🐛 Troubleshooting

### Common Issues

#### Port Already in Use

**Frontend ports (5173/8080):**
```bash
# Find process using port
lsof -i :8080
lsof -i :5173

# Kill process
kill -9 <PID>

# Or change port in docker-compose.yml
```

**Backend port (3001):**
```bash
# Find and kill process
lsof -i :3001
kill -9 <PID>
```

**MongoDB port (27018):**
```bash
# Find and kill process
lsof -i :27018
kill -9 <PID>

# Or stop Docker containers
docker compose down
```

#### Database Connection Issues

**Cannot connect to MongoDB:**
```bash
# Check MongoDB container status
docker compose ps

# View MongoDB logs
docker compose logs mongodb

# Restart MongoDB
docker compose restart mongodb

# Complete reset (WARNING: deletes all data)
docker compose down -v
docker compose up -d
```

**Authentication failed:**
- Verify credentials in MONGODB_URI
- Check `authSource=admin` parameter
- Ensure MongoDB container is fully started

#### Frontend Cannot Connect to API

**Check backend status:**
```bash
# Test backend health
curl http://localhost:3001/health

# Check backend logs
docker compose logs backend
```

**Common causes:**
- Backend not running
- Wrong API URL in frontend `.env`
- CORS configuration issues
- Proxy misconfiguration in `vite.config.ts`

#### Docker Issues

**Containers won't start:**
```bash
# View detailed logs
docker compose logs

# Remove all containers and rebuild
docker compose down
docker compose up --build

# Clean Docker system
docker system prune -a
```

**Out of disk space:**
```bash
# Remove unused Docker resources
docker system prune -a --volumes
```

#### CORS Errors

**"Access-Control-Allow-Origin" error:**
- Verify frontend port matches CORS config in backend `main.ts`
- Default allowed: `http://localhost:8080` and `http://localhost:5173`
- Add custom port if needed

#### Rate Limiting (429 Errors)

**"Too Many Requests":**
- Default limits: 100 req/min (global), 5 req/min (race application), 3 req/min (contact)
- Wait 60 seconds or adjust limits in backend `app.module.ts`

#### Turnstile Validation Errors

**"Invalid token" errors:**
- Verify `TURNSTILE_SECRET` in backend `.env`
- Verify `VITE_TURNSTILE_SITE_KEY` in frontend `.env`
- Check Cloudflare Turnstile dashboard for valid keys
- Turnstile tokens are single-use only

### Performance Issues

**Slow API responses:**
- Check database indexes (automatically created on startup)
- Monitor MongoDB performance
- Review application logs for errors

**Frontend slow to load:**
```bash
# Clear Vite cache
rm -rf frontend/node_modules/.vite

# Rebuild
npm run build
```

## 🔒 Security Considerations

### Production Deployment

Before deploying to production:

1. **Change default credentials:**
   - MongoDB root password
   - Admin user passwords
   - All seed account passwords

2. **Environment variables:**
   - Use strong, unique secrets
   - Never commit `.env` files
   - Use environment-specific configurations

3. **Security settings:**
   - Enable HTTPS
   - Configure proper CORS origins
   - Set up firewall rules
   - Regular security updates

4. **Rate limiting:**
   - Review and adjust rate limits based on traffic
   - Consider implementing IP-based blocking

5. **Monitoring:**
   - Set up error tracking (e.g., Sentry)
   - Monitor API usage and performance
   - Regular log reviews

### Security Features

- **Input Validation:** All inputs validated using DTOs with class-validator
- **Bot Protection:** Cloudflare Turnstile on all forms
- **Rate Limiting:** Global and endpoint-specific limits
- **XSS Protection:** DOMPurify sanitizes user HTML
- **Password Hashing:** Bcrypt with 10 salt rounds
- **Honeypot Fields:** Anti-spam protection in forms
- **CORS:** Configured for specific origins only
- **Environment Validation:** Joi validates all env vars on startup

## 📚 Additional Documentation

- **Backend**: See [backend/README.md](backend/README.md) for detailed API documentation
- **Frontend**: See [frontend/README.md](frontend/README.md) for frontend architecture
- **Database Seeds**: See [backend/src/seeds/README.md](backend/src/seeds/README.md) for seeding structure
- **TODOs**: Check `TODO.md` files in each directory for planned improvements

## 🚀 Deployment

### Docker Production Build

```bash
# Build production images
docker compose -f docker-compose.prod.yml build

# Start production services
docker compose -f docker-compose.prod.yml up -d
```

### Manual Deployment

**Backend:**
```bash
cd backend
npm install --production
npm run build
npm run start:prod
```

**Frontend:**
```bash
cd frontend
npm install
npm run build
# Serve dist/ folder with nginx or similar
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Code Standards

- **TypeScript**: Strict mode enabled
- **Linting**: ESLint must pass
- **Formatting**: Follow existing code style
- **Testing**: Add tests for new features (when test framework is set up)

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Support

For issues, questions, or contributions:
1. Check existing documentation
2. Review open issues on GitHub
3. Create a new issue with detailed information

---

**Project Status**: Active Development  
**Last Updated**: March 2026  
**Version**: 1.0.0

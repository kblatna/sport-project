# Sport Project - Backend API

NestJS REST API for sports application with user management, race results and registrations.

## Technologies

- **NestJS** - Progressive Node.js framework
- **TypeScript** - Type-safe JavaScript
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **Docker** - Containerization

## Quick Start

### With Docker Compose (recommended)
```bash
# Start entire project including frontend and database
docker compose up -d

# API will be available at: http://localhost:3001
```

### Local Development
```bash
# Install dependencies
npm install

# Start in watch mode
npm run start:dev

# API will be available at: http://localhost:3001
```

## 📁 Project Structure

```
src/
├── Databases/           # MongoDB schemas and models
├── Global/             # Global utilities (error handling)
├── Integrations/       # External integrations (mail)
├── Modules/            # Modular application structure
│   ├── user/          # User management
│   ├── contact/       # Contact forms
│   ├── raceApplication/ # Race registrations
│   └── result/        # Race results
└── main.ts            # Application entry point
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
- `GET /` - Get all results

### 📝 Race Applications (`/api/race-application`)
- `POST /` - Register for a race

### 📞 Contact (`/api/contact`)
- `POST /` - Send contact form

## 🗄️ Database

### MongoDB Connection
```javascript
mongodb://root:defekt2025@mongodb:27017/mulda?authSource=admin
```

### Schemas

**User Schema:**
```typescript
{
  name: string,
  username: string (unique),
  email: string,
  createdAt: Date,
  updatedAt: Date | null
}
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file:
```env
NODE_ENV=development
PORT=3001
MONGODB_URI=mongodb://root:defekt2025@mongodb:27017/mulda?authSource=admin
```

### Docker Compose
Database and all dependencies are automatically started via Docker Compose.

## 🔒 Validation

- **DTOs** - Automatic input validation using class-validator
- **Transform pipes** - Data transformation before processing
- **Global validation** - Applied to all endpoints

## 🚨 Error Handling

- **Global exception filter** - Unified error processing
- **Custom ErrorException** - Custom error class
- **HTTP status codes** - Proper return codes

## 🐛 Troubleshooting

### Database Connection
- Check that MongoDB container is running
- Verify connection string in environment variables
- Try connecting from MongoDB Compass

### Port Conflicts
- Backend runs on port 3001
- MongoDB on port 27018 (host) → 27017 (container)

### CORS Errors
CORS is configured for ports 8080 and 5173 (frontend).


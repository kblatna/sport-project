# Mulda Project

Full-stack application for managing sport results and race registrations.

## Architecture

```
sport/
├── frontend/          # Vue.js frontend application
├── backend/           # NestJS API server
├── docker-compose.yml # Service orchestration
└── README.md         # This file
```

## Quick Start

### Running the entire project

```bash
# Start all services (backend, frontend, database)
docker compose up -d

# Check status
docker compose ps

# Follow logs
docker compose logs -f
```

### Application Access

- **Frontend**: http://localhost:8080
- **Backend API**: http://localhost:3001/api
- **MongoDB**: localhost:27018 (for MongoDB Compass)

### Stopping

```bash
# Stop all services
docker compose down

# Stop and remove data
docker compose down -v
```

## Technologies

### Frontend
- **Vue 3** + **TypeScript**
- **Vite** (build tool)
- **Tailwind** (CSS framework)
- **Axios** (HTTP client)

### Backend
- **NestJS** + **TypeScript**
- **MongoDB** + **Mongoose**
- **Class Validator** (validation)
- **CORS** support

### Infrastructure
- **Docker** + **Docker Compose**
- **MongoDB 7**
- **Node.js 20**

## Service Structure

### Frontend (port 8080)
```
frontend/src/
├── components/     # Vue components
├── views/         # Application pages
├── services/      # API communication
└── router/        # Routing
```

### Backend (port 3001)
```
backend/src/
├── Modules/       # Functional modules
│   ├── user/     # User management
│   ├── result/   # Race results
│   └── contact/  # Contact forms
└── Databases/    # MongoDB schemas
```

### MongoDB (port 27018)
- Database: `mulda`
- User: `root` / `defekt2025`
- Connection: `mongodb://root:defekt2025@localhost:27018/mulda?authSource=admin`

## API Documentation

### Main Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/users` | GET | List users |
| `/api/users` | POST | Create user |
| `/api/results` | GET | Race results |
| `/api/race-application` | POST | Race registration |
| `/api/contact` | POST | Contact form |

## Development

### Local development without Docker

1. **Start only MongoDB:**
   ```bash
   docker compose up mongodb -d
   ```

2. **Backend:**
   ```bash
   cd backend
   npm install
   npm run start:dev
   ```

3. **Frontend:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

### Useful Commands

```bash
# Rebuild containers
docker compose up --build

# Follow logs for specific service
docker compose logs -f backend

# Restart service
docker compose restart backend

# Enter container
docker compose exec backend bash
```

## Troubleshooting

### Common Issues

1. **Port already in use:**
   ```bash
   # Check what's using the port
   lsof -i :3001
   
   # Stop all Docker containers
   docker compose down
   ```

2. **Database connection:**
   ```bash
   # Check MongoDB logs
   docker compose logs mongodb
   
   # Remove data and restart
   docker compose down -v
   docker compose up -d
   ```

3. **Frontend cannot connect to API:**
   - Check proxy configuration in `vite.config.ts`
   - Verify CORS settings in backend
   - Check environment variables

## Notes

- For production, update passwords and security settings
- MongoDB volume `mongo_data` preserves data between restarts
- Frontend uses proxy for API calls in development mode
- Backend has automatic validation for all inputs

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Create a Pull Request

## License

This project is licensed under the MIT License.

# Backend TODO - Deferred Tasks

This file contains tasks that will be implemented later, primarily based on code reviews and future improvements.

**Project**: Sport Project - Backend API  
**Last Updated**: March 2026  
**Status**: Active Development

---

## 🔴 P1 - High Priority

### 7. Implement Email Sending on Race Registration
- [ ] Connect `MailService` with `RaceApplicationService`
- [ ] Call `sendRaceConfirmationEmail` after successful registration
- [ ] Handle email sending errors (should not block registration)
- [ ] Add retry logic for failed emails
- [ ] Consider using queue system (Bull/BullMQ) for asynchronous sending

**Files to modify:**
- `src/modules/raceApplication/RaceApplication.service.ts`
- `src/modules/raceApplication/RaceApplication.module.ts`

**Implementation notes:**
- Email failures should be logged but not prevent registration
- Consider implementing a job queue for reliability
- Add email templates for confirmation messages

---

## 🟡 P2 - Medium Priority

### 8. Optimize Result Filtering
- [ ] Remove `$expr` and `$regexMatch` for numeric filters
- [ ] Change implementation to exact numeric queries or ranges
- [ ] Update `ListResultsQueryDto` to support range queries
- [ ] Enable database index utilization

**Example implementation:**
```typescript
if (pagingQuery.rank) {
    filterQuery.rank = parseInt(pagingQuery.rank)
}
// Or for range queries:
if (pagingQuery.rankMin || pagingQuery.rankMax) {
    filterQuery.rank = {}
    if (pagingQuery.rankMin) filterQuery.rank.$gte = parseInt(pagingQuery.rankMin)
    if (pagingQuery.rankMax) filterQuery.rank.$lte = parseInt(pagingQuery.rankMax)
}
```

**Files to modify:**
- `src/modules/result/Result.service.ts`
- `src/modules/result/dto/ListResultsQuery.dto.ts`

**Benefits:**
- Better performance with indexed queries
- More flexible filtering options
- Reduced server load

---

### 11. Implement Transactions for Critical Operations
- [ ] Add MongoDB transactions for race application + email
- [ ] Implement rollback on email failure (optional)
- [ ] Ensure atomicity of operations

**Note:** MongoDB transactions require a replica set

**Files to modify:**
- `src/modules/raceApplication/RaceApplication.service.ts`

**Implementation considerations:**
- Requires MongoDB replica set configuration
- Consider whether email failure should rollback registration
- Add proper error handling for transaction failures

---

## 🟢 P3 - Low Priority

### 18. Add Helmet for Security Headers
```bash
npm install --save @nestjs/helmet
```

**Implementation in `main.ts`:**
```typescript
import helmet from '@nestjs/helmet'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    app.use(helmet())
    // ... rest of config
}
```

**Files to modify:**
- `src/main.ts`

**Benefits:**
- Adds security HTTP headers
- Protects against common vulnerabilities
- Industry best practice

---

### 19. Add Swagger API Documentation
```bash
npm install --save @nestjs/swagger
```

**Implementation in `main.ts`:**
```typescript
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

const config = new DocumentBuilder()
    .setTitle('Sport Project API')
    .setDescription('REST API for sports race management')
    .setVersion('1.0')
    .addTag('users')
    .addTag('results')
    .addTag('race-application')
    .addTag('contact')
    .addTag('content')
    .build()

const document = SwaggerModule.createDocument(app, config)
SwaggerModule.setup('api/docs', app, document)
```

**Add to all DTOs:**
```typescript
import { ApiProperty } from '@nestjs/swagger'

@ApiProperty({ description: 'User email', example: 'user@example.com' })
@IsEmail()
email: string
```

**Files to modify:**
- `src/main.ts`
- All DTO files in `src/modules/**/dto/`

**Benefits:**
- Interactive API documentation at `/api/docs`
- Auto-generated from code
- Easy API testing interface
- Better developer experience

---

### 21. Write Comprehensive Tests
- [ ] **Unit Tests:**
  - Services (User, Contact, RaceApplication, Result)
  - TurnstileService validation
  - MailService email sending
  - Controllers

- [ ] **E2E Tests:**
  - User CRUD operations
  - Contact form submission with rate limiting
  - Race application flow with Turnstile
  - Results pagination and filtering

**Test Structure:**
```
src/
├── modules/
│   ├── user/
│   │   ├── User.service.spec.ts
│   │   └── User.controller.spec.ts
│   └── ...
test/
├── app.e2e-spec.ts
├── user.e2e-spec.ts
├── raceApplication.e2e-spec.ts
└── ...
```

**Testing Tools:**
- Jest (already configured)
- `@nestjs/testing` for module testing
- MongoDB Memory Server for isolated tests
- Supertest for E2E HTTP testing

**Example implementations:**
- Mock MongoDB with `@golevelup/ts-jest` or MongoDB Memory Server
- Test ValidationPipe with invalid data
- Test ThrottlerGuard rate limiting behavior
- Mock Turnstile validation in tests
- Test email sending with mock SMTP

---

### 23. Optimize Dockerfile for Production
Create multi-stage build for smaller image size:

```dockerfile
# Build stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
RUN npm ci --only=production
COPY --from=builder /app/dist ./dist
EXPOSE 3001
CMD ["node", "dist/main"]
```

**Files to modify:**
- `Dockerfile`

**Additional optimizations:**
- Add `.dockerignore` file
- Use `npm ci` instead of `npm install`
- Remove dev dependencies from production image
- Minimize image size with alpine base
- Add healthcheck instruction
- Use non-root user for security

---

## 📋 Additional Recommendations

### Monitoring & Logging
- [ ] Implement structured logging (Winston/Pino)
  - Better log formatting
  - Log levels (error, warn, info, debug)
  - JSON output for production
- [ ] Enhance health check endpoint
  - Database connectivity check
  - External services status
  - Memory and CPU metrics
- [ ] Implement metrics collection (Prometheus)
  - Request duration
  - Error rates
  - Custom business metrics

### CI/CD Pipeline
- [ ] Set up GitHub Actions or GitLab CI
  - Automated testing on PR
  - Linting checks
  - Build verification
  - Docker image building
- [ ] Automated deployment
  - Staging environment
  - Production deployment with approval
  - Rollback capability

### Database Management
- [ ] Implement database migrations
  - TypeORM migrations or Mongoose migrations
  - Version control for schema changes
  - Rollback capability
- [ ] Enhance seeding scripts (✅ already implemented)
- [ ] Set up backup strategy
  - Automated daily backups
  - Point-in-time recovery
  - Backup testing

### Authentication & Authorization
- [ ] Implement JWT authentication
  - Login endpoint
  - Token generation and validation
  - Refresh token mechanism
- [ ] Role-based access control (RBAC)
  - Admin routes protection
  - Permission system
  - User role management
- [ ] API key authentication for external services

### Rate Limiting Enhancements
- [ ] Per-user rate limiting (requires auth)
- [ ] Different limits for authenticated vs anonymous
- [ ] Rate limit response headers
- [ ] Redis-based rate limiting for distributed systems

### Documentation
- [ ] API documentation (Swagger - see task #19)
- [ ] Architecture documentation
- [ ] Deployment guide
- [ ] Development setup guide (✅ in README.md)
- [ ] Contributing guidelines

---

**Created**: January 2026  
**Last Updated**: March 2026  
**Priority**: Work through P1 tasks first, then P2, then P3

For questions or suggestions, see [README.md](./README.md) or the main project [README](../README.md).

# Backend TODO - Odložené úkoly z Code Review

Tento soubor obsahuje úkoly, které budou implementovány později.

## P1 - Vysoká priorita

### 7. Implementovat odeslání emailu při registraci
- [ ] Propojit `MailService` s `RaceApplicationService`
- [ ] Volat `sendRaceConfirmationEmail` po úspěšném vytvoření přihlášky
- [ ] Ošetřit chyby při odeslání emailu (nemělo by blokovat registraci)
- [ ] Přidat retry logiku pro failed emails
- [ ] Zvážit použití queue (Bull/BullMQ) pro asynchronní odesílání

**Soubory k úpravě:**
- `src/modules/raceApplication/RaceApplication.service.ts`
- `src/modules/raceApplication/RaceApplication.module.ts`

---

## P2 - Střední priorita

### 8. Optimalizovat Result filtering
- [ ] Odstranit `$expr` a `$regexMatch` pro číselné filtry
- [ ] Změnit implementaci na přesné číselné dotazy nebo rozsahy
- [ ] Aktualizovat `ListResultsQueryDto` pro podporu range queries
- [ ] Umožnit využití database indexů

**Příklad implementace:**
```typescript
if (pagingQuery.rank) {
    filterQuery.rank = parseInt(pagingQuery.rank)
}
// Nebo pro range:
if (pagingQuery.rankMin || pagingQuery.rankMax) {
    filterQuery.rank = {}
    if (pagingQuery.rankMin) filterQuery.rank.$gte = parseInt(pagingQuery.rankMin)
    if (pagingQuery.rankMax) filterQuery.rank.$lte = parseInt(pagingQuery.rankMax)
}
```

**Soubory k úpravě:**
- `src/modules/result/Result.service.ts`
- `src/modules/result/dto/ListResultsQuery.dto.ts`

---

### 11. Implementovat transakce pro kritické operace
- [ ] Přidat MongoDB transakce pro race application + email
- [ ] Implementovat rollback při selhání emailu (volitelné)
- [ ] Zajistit atomicitu operací

**Poznámka:** MongoDB transakce vyžadují replica set

**Soubory k úpravě:**
- `src/modules/raceApplication/RaceApplication.service.ts`

---

## P3 - Nízká priorita

### 18. Přidat Helmet pro security headers
```bash
npm install --save helmet
```

**Implementace v `main.ts`:**
```typescript
import helmet from 'helmet'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    app.use(helmet())
    // ... rest of config
}
```

**Soubory k úpravě:**
- `src/main.ts`

---

### 19. Přidat Swagger dokumentaci
```bash
npm install --save @nestjs/swagger
```

**Implementace v `main.ts`:**
```typescript
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

const config = new DocumentBuilder()
    .setTitle('Sport Project API')
    .setDescription('REST API for sports application')
    .setVersion('1.0')
    .addTag('users')
    .addTag('results')
    .addTag('race-application')
    .addTag('contact')
    .build()

const document = SwaggerModule.createDocument(app, config)
SwaggerModule.setup('api/docs', app, document)
```

**Přidat do všech DTOs:**
```typescript
import { ApiProperty } from '@nestjs/swagger'

@ApiProperty({ description: 'User email', example: 'user@example.com' })
@IsEmail()
email: string
```

**Soubory k úpravě:**
- `src/main.ts`
- Všechny DTO soubory v `src/modules/**/dto/`

---

### 21. Napsat testy
- [ ] **Unit testy:**
  - Services (User, Contact, RaceApplication, Result)
  - TurnstileService
  - Controllers

- [ ] **E2E testy:**
  - User CRUD operace
  - Contact form submission
  - Race application flow
  - Results pagination

**Struktura testů:**
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
└── ...
```

**Příklady k implementaci:**
- Mockování MongoDB pomocí `@golevelup/ts-jest`
- Testování ValidationPipe s neplatnými daty
- Testování ThrottlerGuard rate limiting
- Testování Turnstile validace

---

### 23. Optimalizovat Dockerfile
Vytvořit multi-stage build pro produkci:

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

**Soubory k úpravě:**
- `Dockerfile`

**Další optimalizace:**
- Přidat `.dockerignore`
- Použít `npm ci` místo `npm install`
- Odstranit dev dependencies z produkčního image
- Minimalizovat velikost image

---

## Další doporučení (mimo review)

### Monitoring a Logging
- [ ] Implementovat strukturované logování (Winston/Pino)
- [ ] Přidat health check endpoint
- [ ] Implementovat metriky (Prometheus)

### CI/CD
- [ ] Nastavit GitHub Actions
- [ ] Automatické testy na PR
- [ ] Automatický deployment

### Database
- [ ] Implementovat database migrations
- [ ] Přidat seeding skripty
- [ ] Nastavit backup strategie

---

**Vytvořeno:** 2026-01-12
**Poslední aktualizace:** 2026-01-12

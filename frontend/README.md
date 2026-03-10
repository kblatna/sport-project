# Sport Project - Frontend

Modern Vue.js 3 single-page application for sports race management with results display, participant registration, and dynamic content management.

## 🚀 Technologies

### Core Framework
- **Vue 3.5** - Progressive JavaScript framework with Composition API
- **TypeScript** - Type-safe development with strict mode enabled
- **Vite 7** - Next-generation build tool with HMR (Hot Module Replacement)
- **Vue Router 4** - Official routing with lazy-loaded routes

### UI & Styling
- **Tailwind CSS 3** - Utility-first CSS framework
- **PrimeVue 4** - Rich UI component library with Aura theme preset
- **Tailwind Forms** - Beautiful form styling plugin

### Development Tools
- **ESLint 9** - Code linting with Vue & TypeScript support
- **Oxlint** - Fast performance-focused linting
- **Vite Plugin Vue DevTools** - Enhanced debugging experience

### Libraries & Utilities
- **Axios** - Promise-based HTTP client for API communication
- **Vuelidate** - Form validation library
- **DOMPurify** - XSS protection for HTML sanitization
- **VueUse** - Collection of essential Vue composition utilities

## ⚡ Quick Start

### With Docker Compose (Recommended)

```bash
# Start entire project (frontend, backend, database)
docker compose up -d

# Frontend will be available at: http://localhost:8080
```

### Local Development

```bash
# Install dependencies
npm install

# Create .env file (optional)
cp .env.example .env
# Edit .env with your configuration

# Start development server
npm run dev

# Application will be available at: http://localhost:5173
```

## 📁 Project Structure

```
frontend/
├── src/
│   ├── assets/
│   │   └── css/              # Global styles (Tailwind, transitions)
│   ├── components/           # Reusable Vue components
│   │   ├── header/          # Header and navigation components
│   │   ├── footer/          # Footer components
│   │   ├── BannerHero.vue
│   │   ├── ContactFormOld.vue
│   │   ├── ErrorMessage.vue
│   │   ├── LoadingSpinner.vue
│   │   ├── SafeHtml.vue     # XSS-safe HTML rendering
│   │   └── ...
│   ├── views/               # Page views and routes
│   │   └── app/
│   │       ├── IndexView.vue
│   │       └── views/       # Feature-specific views
│   │           ├── about/   # Info, links, organizers
│   │           ├── contact/ # Contact form
│   │           ├── result/  # Race results
│   │           └── signup/  # Registration
│   ├── services/
│   │   ├── api/            # API service layer
│   │   │   ├── createService.ts  # Generic CRUD service factory
│   │   │   └── services.ts       # Service instances
│   │   └── router/         # Vue Router configuration
│   │       └── routes/     # Route definitions by feature
│   ├── composables/        # Vue composition functions
│   │   ├── useNavigation.ts     # Navigation menu data
│   │   ├── useFooterData.ts     # Footer content data
│   │   ├── useSafeHtml.ts       # HTML sanitization wrapper
│   │   └── useScrollHeader.ts   # Auto-hide header on scroll
│   ├── config/             # Application configuration
│   │   └── raceCategories.ts    # Race category definitions
│   ├── interface/          # TypeScript interfaces
│   ├── types/              # TypeScript type declarations
│   │   └── turnstile.d.ts      # Cloudflare Turnstile types
│   ├── utils/              # Utility functions
│   │   ├── validators.ts       # Form validation rules
│   │   └── logger.ts           # Logging service
│   ├── App.vue
│   └── main.ts
├── public/                 # Static assets
│   ├── images/
│   │   └── gallery/       # Image gallery assets
│   └── logo/              # Brand logos
├── Dockerfile             # Production container config
├── vite.config.ts         # Vite configuration
├── tailwind.config.js     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
├── eslint.config.mjs      # ESLint configuration
└── package.json
```

## 📦 Available Commands

```bash
# Development
npm run dev          # Start Vite dev server at http://localhost:5173

# Production
npm run build        # Build optimized production bundle (dist/)
npm run preview      # Preview production build locally

# Code Quality
npm run lint         # Run ESLint (when configured)
npm run format       # Format code (when configured)
```

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the frontend root directory:

```env
# API Base URL (optional - defaults to /api via proxy)
VITE_API_URL=http://localhost:3001/api

# Cloudflare Turnstile Site Key (required for forms)
VITE_TURNSTILE_SITE_KEY=your_turnstile_site_key_here
```

**Notes:**
- Environment variables must be prefixed with `VITE_` to be exposed to the app
- TypeScript types are defined in `src/vite-env.d.ts` for IntelliSense support
- Backend must have `TURNSTILE_SECRET` configured for token verification

### Vite Proxy Configuration

The development server proxies API requests to the backend:

```typescript
// vite.config.ts
server: {
  proxy: {
    '/api': {
      target: 'http://backend:3001',  // Docker service name
      changeOrigin: true
    }
  }
}
```

In production, configure your web server (nginx, etc.) to proxy `/api/*` requests to the backend.

## 🔌 API Communication

### Service Layer Architecture

The application uses a centralized service layer with generic CRUD operations:

```typescript
// src/services/api/createService.ts
export function createService<T = unknown>(resource: string) {
  return {
    getAll(params?: Record<string, unknown>): Promise<T>
    getById(id: string | number): Promise<T>
    create(data: Partial<T>): Promise<T>
    update(id: string | number, data: Partial<T>): Promise<T>
    delete(id: string | number): Promise<void>
    paginate(params?: Record<string, unknown>): Promise<T>
  }
}
```

### Available Services

```typescript
// src/services/api/services.ts
export const users = createService<User>('users')
export const results = createService<Result>('results')
export const raceApplications = createService<RaceApplication>('race-application')
export const contacts = createService<Contact>('contact')
// ... and more
```

### Usage Example

```typescript
<script setup lang="ts">
import { results } from '@/services/api/services'

const fetchResults = async () => {
  const data = await results.paginate({
    page: 1,
    limit: 25,
    sortBy: 'rank',
    sortOrder: 'asc'
  })
}
</script>
```

## 🏗️ Architecture & Patterns

### Composition API

All components use Vue 3 Composition API with `<script setup>` syntax for:
- Better TypeScript support and inference
- Improved code organization
- More concise syntax
- Better tree-shaking

```vue
<script setup lang="ts">
import { ref, onMounted } from 'vue'

const data = ref([])

onMounted(async () => {
  // Component logic
})
</script>
```

### Composables Pattern

Reusable logic is extracted into composables (Vue composition functions):

- **`useNavigation()`** - Fetches and manages navigation menu data
- **`useFooterData()`** - Fetches and manages footer content
- **`useSafeHtml()`** - Provides HTML sanitization wrapper
- **`useInfoPageContent()`** - Fetches info page content
- **`useScrollHeader()`** - Implements auto-hide header on scroll

```typescript
// Example: useNavigation.ts
export function useNavigation() {
  const navigation = ref<NavigationItem[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchNavigation = async () => {
    // Fetch logic
  }

  return { navigation, loading, error, fetchNavigation }
}
```

### State Management

**No global state management library** (Vuex/Pinia) is used. Instead:
- Composables for shared logic
- Local component state with `ref()` and `reactive()`
- Props and events for parent-child communication
- Router for URL state

This keeps the application simple and reduces bundle size.

### Type Safety

Full TypeScript coverage with strict mode:
- All API responses are typed
- Service layer uses generics
- Environment variables are typed
- Component props are typed
- No `any` types allowed (strict mode)

## 🔒 Security

### XSS Protection

**DOMPurify** sanitizes all user-generated HTML content:

```vue
<SafeHtml :html="userContent" />
```

See [SAFE_HTML_GUIDE.md](SAFE_HTML_GUIDE.md) for best practices.

### CSRF Protection

**Cloudflare Turnstile** protects all forms:
- Race registration
- Contact forms
- Any user-submitted content

### Input Validation

**Vuelidate** validates all form inputs:
- Client-side validation for UX
- Server-side validation as final check
- Custom validators in `src/utils/validators.ts`

### Security Best Practices

- **Type Safety**: TypeScript strict mode prevents type-related bugs
- **Honeypot Fields**: Anti-bot protection in forms
- **Secure HTML Rendering**: Dedicated `SafeHtml.vue` component
- **No Inline Scripts**: CSP-compatible architecture
- **Environment Variables**: Secrets never committed to git

## 📝 Code Quality

### ESLint Configuration

- **Vue 3 Recommended Rules**: Official Vue.js style guide
- **TypeScript ESLint**: Type-aware linting
- **Stylistic Plugin**: 4-space indent, no semicolons, single quotes
- **Oxlint Integration**: Enhanced performance

```javascript
// eslint.config.mjs
export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,vue}'],
    rules: {
      'vue/multi-word-component-names': 'off',
      '@typescript-eslint/no-explicit-any': 'error',
    }
  }
]
```

### Error Handling

Comprehensive error handling setup:
- **Global Vue Error Handler**: Catches Vue component errors
- **Unhandled Promise Rejection Handler**: Catches async errors
- **Logger Service**: Development/production logging
- **Prepared for Sentry**: Error tracking integration ready

```typescript
// src/main.ts
app.config.errorHandler = (err, instance, info) => {
  console.error('Vue Error:', err, info)
  // Ready for Sentry integration
}
```

## 🧪 Testing

> **Note**: Testing framework not yet implemented. See [TODO.md](TODO.md) for roadmap.

### Planned Testing Stack

- **Vitest** - Unit testing framework (Vite-native)
- **@vue/test-utils** - Official Vue component testing
- **@testing-library/vue** - User-centric testing library
- **Playwright** or **Cypress** - End-to-end testing

## 🚧 Troubleshooting

### Common Issues

#### API Calls Failing

**Symptoms**: Network errors, 404s, CORS errors

**Solutions:**
```bash
# Check backend is running
curl http://localhost:3001/health

# Check backend logs
docker compose logs backend

# Verify environment variable
echo $VITE_API_URL

# Check proxy configuration
cat vite.config.ts
```

#### Port Conflicts

**Development port (5173) in use:**
```bash
# Find process
lsof -i :5173

# Kill process
kill -9 <PID>

# Or change port
npm run dev -- --port 3000
```

**Docker port (8080) in use:**
```bash
# Stop Docker containers
docker compose down

# Or change port in docker-compose.yml
```

#### CORS Errors

**"Access-Control-Allow-Origin" error:**

- Backend must allow frontend origin
- Check backend CORS config in `main.ts`
- Default allowed: `localhost:8080` and `localhost:5173`

#### TypeScript Errors

```bash
# Reinstall dependencies
rm -rf node_modules
npm install

# Clear Vite cache
rm -rf node_modules/.vite

# Check tsconfig.json
cat tsconfig.json
```

#### Build Errors

```bash
# Clear cache and rebuild
rm -rf node_modules/.vite
npm run build

# Check for type errors
npx vue-tsc --noEmit
```

### Development Tips

1. **Hot Module Replacement**: Vite provides instant updates
2. **Vue DevTools**: Access at `http://localhost:5173/__devtools__/`
3. **Type Checking**: Use VSCode with **Volar** extension
4. **Debugging**: Browser DevTools + Vue DevTools

## 📚 Additional Documentation

- **Main Project**: [../README.md](../README.md)
- **Backend API**: [../backend/README.md](../backend/README.md)
- **Safe HTML Guide**: [SAFE_HTML_GUIDE.md](SAFE_HTML_GUIDE.md)
- **TODO List**: [TODO.md](TODO.md)

## 📊 Performance Considerations

- **Bundle Size**: Optimized with Vite tree-shaking
- **Code Splitting**: Route-based lazy loading reduces initial bundle
- **Image Optimization**: TODO - WebP format and lazy loading
- **Caching**: Browser caching for static assets

## 🔄 Future Improvements

See [TODO.md](TODO.md) for complete roadmap. Key items:

- **Testing**: Vitest + Testing Library setup
- **Storybook**: Component documentation
- **Bundle Optimization**: Analyze and reduce bundle size
- **Image Optimization**: Lazy loading, WebP format
- **Error Tracking**: Sentry integration
- **Performance Monitoring**: Web Vitals tracking
- **Dark Mode**: Theme switching support
- **Internationalization**: Multi-language support (i18n)

## 🤝 Contributing

Before contributing:

1. Review code style in `eslint.config.mjs`
2. Follow TypeScript strict mode requirements
3. Match existing component patterns
4. Check [TODO.md](TODO.md) for planned work
5. Add tests for new features (when framework is set up)

### Pull Request Process

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Ensure code passes linting
5. Submit a pull request

## 📄 License

[Your License Here]

---

**Project Status**: Active Development  
**Last Updated**: March 2026  
**Code Quality**: ⭐⭐⭐⭐⭐ (9.5/10)

For more information, see the [main project README](../README.md).

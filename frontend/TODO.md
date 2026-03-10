# Frontend TODO List

**Project**: Sport Project - Frontend Application  
**Last Updated**: March 2026  
**Status**: Active Development  
**Code Quality**: ⭐⭐⭐⭐⭐ (9.5/10)

---

## 🔴 High Priority

All critical tasks are completed! ✅

---

## 🟡 Medium Priority

### Testing
- [ ] Set up Vitest testing framework
  - [ ] Install: `npm i -D vitest @vue/test-utils @testing-library/vue happy-dom`
  - [ ] Create `vitest.config.ts`
  - [ ] Add test scripts to `package.json`
- [ ] Unit tests for composables
  - [ ] `useNavigation.ts`
  - [ ] `useFooterData.ts`
  - [ ] `useSafeHtml.ts`
  - [ ] `useInfoPageContent.ts`
  - [ ] `useScrollHeader.ts`
- [ ] Unit tests for utilities
  - [ ] `validators.ts`
  - [ ] `logger.ts`
- [ ] Integration tests for forms
  - [ ] `SignupForm.vue`
  - [ ] `ContactForm.vue`
- [ ] E2E tests for critical user flows
  - [ ] Install Playwright or Cypress
  - [ ] Test: Race registration flow
  - [ ] Test: Contact form submission
  - [ ] Test: Results display and filtering

### Performance & Bundle Optimization
- [ ] Install bundle analyzer
  - [ ] `npm i -D rollup-plugin-visualizer`
  - [ ] Add to `vite.config.ts`
- [ ] Analyze bundle size
- [ ] Tree-shake unused PrimeVue components
- [ ] Consider code splitting for large dependencies
- [ ] Lazy loading for routes (✅ already implemented)
- [ ] Dynamic imports for heavy components

### Axios Configuration
- [ ] Create centralized axios instance
- [ ] Implement interceptors:
  - [ ] Request interceptor for automatic tokens
  - [ ] Response interceptor for error handling
  - [ ] Response interceptor for token refresh
  - [ ] Request/response logging (dev mode only)
- [ ] Global error handling for API calls
- [ ] Request cancellation on route change

---

## 🟢 Low Priority

### Image Optimization
- [ ] Implement lazy loading for all images
  - [ ] Add `loading="lazy"` attribute
- [ ] WebP format with fallback to JPG/PNG
  - [ ] Create `<picture>` components
  - [ ] Implement `srcset` for responsive images
- [ ] Consider using CDN for images
  - [ ] Cloudinary
  - [ ] ImageKit
  - [ ] Or build-time optimization

### Error Tracking & Monitoring
- [ ] Sentry integration
  - [ ] `npm i @sentry/vue`
  - [ ] Create Sentry project
  - [ ] Configure in `main.ts`
  - [ ] Connect to `logger.ts`
  - [ ] Source maps for production
- [ ] Performance monitoring
  - [ ] Web Vitals tracking (CLS, FID, FCP, LCP, TTFB)
  - [ ] Custom performance marks
- [ ] Analytics
  - [ ] Google Analytics 4 or Matomo
  - [ ] Event tracking for forms
  - [ ] Conversion tracking

### Caching Strategy
- [ ] In-memory cache for API responses in composables
- [ ] LocalStorage cache with TTL
- [ ] Service Worker for offline support
- [ ] Implement SWR (stale-while-revalidate) pattern
- [ ] Cache invalidation strategy

### Documentation
- [ ] Storybook setup
  - [ ] `npx storybook@latest init`
  - [ ] Stories for all components
  - [ ] Props documentation
  - [ ] Events documentation
  - [ ] Deploy to CDN or Netlify
- [ ] JSDoc comments for all props
  - [ ] Components in `components/`
  - [ ] View components
  - [ ] Form components
- [ ] API documentation (TypeDoc)
- [ ] Contributing guidelines (`CONTRIBUTING.md`)
- [ ] Changelog (`CHANGELOG.md`) following Keep a Changelog format

### Code Quality Tools
- [ ] Prettier setup
  - [ ] `npm i -D prettier eslint-config-prettier`
  - [ ] Create `.prettierrc`
  - [ ] Integrate with ESLint
- [ ] Pre-commit hooks (Husky)
  - [ ] Lint staged files
  - [ ] Run tests
  - [ ] Format code
- [ ] Commitlint for consistent commit messages
  - [ ] Conventional commits format

### Accessibility (A11y)
- [ ] Audit all forms
  - [ ] ARIA labels
  - [ ] Keyboard navigation
  - [ ] Focus management
- [ ] Color contrast check
- [ ] Screen reader testing
- [ ] Lighthouse accessibility audit
- [ ] Focus indicators for keyboard navigation

### Security Enhancements
- [ ] Content Security Policy (requires backend changes)
- [ ] Client-side rate limiting for forms
- [ ] Input sanitization review
- [ ] XSS protection audit (✅ DOMPurify already implemented)
- [ ] CSRF token handling (if needed)

### UX Improvements
- [ ] Loading skeletons instead of "Loading..." text
  - [ ] PrimeVue Skeleton component
  - [ ] Custom skeleton for tables
  - [ ] Skeleton for cards
- [ ] Toast notifications for user feedback
- [ ] Optimistic UI updates
- [ ] Better error messages (user-friendly)
- [ ] Form field auto-focus
- [ ] Form auto-save (draft mode)
- [ ] Smooth scroll animations

### Migration & Refactoring
- [ ] Migration from HTML to Tiptap JSON (long-term goal)
  - [ ] Install Tiptap editor
  - [ ] Backend support for JSON content
  - [ ] Renderer component for JSON
  - [ ] Migrate old HTML data
  - [ ] Dual storage during transition
- [ ] Race categories from API instead of config file
  - [ ] Backend API endpoint
  - [ ] Frontend fetching logic
  - [ ] Cache for categories

---

## 📋 Backlog (Future Ideas)

### Features
- [ ] Dark mode support
  - [ ] Theme switching
  - [ ] User preference in localStorage
  - [ ] System preference detection
- [ ] Internationalization (i18n)
  - [ ] Multi-language support (Czech/English)
  - [ ] Vue i18n setup
  - [ ] Language switcher component
- [ ] Print stylesheet for results
- [ ] Export results (CSV, PDF)
- [ ] Social media sharing buttons
- [ ] Progressive Web App (PWA)
  - [ ] Service Worker
  - [ ] Manifest.json
  - [ ] Offline support
  - [ ] Install prompt

### Developer Experience
- [ ] Component playground
- [ ] Design system documentation
- [ ] Visual regression testing
- [ ] Automated dependency updates (Renovate/Dependabot)
- [ ] Component library extraction

---

## ✅ Completed

### Critical Issues (High Priority)
- [x] Fix TypeScript `any` types in `createService.ts`
- [x] Create logger service instead of `console.error`
- [x] Fix `key={index}` in v-for loops
- [x] Remove all ESLint errors

### Medium Priority
- [x] Implement global error handler
- [x] Environment variables typing
- [x] Race categories configuration
- [x] HeaderNav.vue styles refactoring
- [x] All TypeScript errors fixed
- [x] Cloudflare Turnstile types

### Infrastructure
- [x] ESLint configuration
- [x] TypeScript strict mode
- [x] Vite setup
- [x] Tailwind CSS setup
- [x] PrimeVue integration
- [x] Vue Router setup
- [x] Docker containerization

---

## 📝 Notes

- Consult with team before implementing major changes
- Time estimates are approximate
- Priorities can change based on business needs
- Keep this file updated after completing tasks
- See [README.md](./README.md) for current project status

**Current Code Quality**: 9.5/10 ⭐⭐⭐⭐⭐

---

**Created**: January 2026  
**Last Updated**: March 2026

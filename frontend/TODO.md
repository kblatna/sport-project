# Frontend TODO List

**Projekt**: Sport Project - Frontend  
**Poslední aktualizace**: 2026-01-12  
**Status**: Aktivní vývoj

---

## 🔴 Vysoká priorita

Všechny kritické úkoly jsou dokončeny! ✅

---

## 🟡 Střední priorita

### Testing
- [ ] Nastavit Vitest testing framework
  - [ ] Instalace: `npm i -D vitest @vue/test-utils @testing-library/vue happy-dom`
  - [ ] Vytvořit `vitest.config.ts`
  - [ ] Nastavit test scripts v `package.json`
- [ ] Unit testy pro composables
  - [ ] `useNavigation.ts`
  - [ ] `useFooterData.ts`
  - [ ] `useSafeHtml.ts`
  - [ ] `useInfoPageContent.ts`
  - [ ] `useScrollHeader.ts`
- [ ] Unit testy pro utilities
  - [ ] `validators.ts`
  - [ ] `logger.ts`
- [ ] Integration testy pro formuláře
  - [ ] `SignupForm.vue`
  - [ ] `ContactForm.vue`
- [ ] E2E testy pro kritické user flows
  - [ ] Instalace Playwright nebo Cypress
  - [ ] Test: Registrace závodníka
  - [ ] Test: Odeslání kontaktního formuláře
  - [ ] Test: Zobrazení výsledků

### Performance & Bundle Optimization
- [ ] Nainstalovat bundle analyzer
  - [ ] `npm i -D rollup-plugin-visualizer`
  - [ ] Přidat do `vite.config.ts`
- [ ] Analyzovat velikost bundle
- [ ] Tree-shaking nepoužívaných PrimeVue komponent
- [ ] Zvážit code splitting pro velké dependencies
- [ ] Lazy loading pro routes (✅ již implementováno)

### Axios Configuration
- [ ] Vytvořit centralizovanou axios instanci
- [ ] Implementovat interceptors:
  - [ ] Request interceptor pro automatické tokeny
  - [ ] Response interceptor pro error handling
  - [ ] Response interceptor pro token refresh
  - [ ] Request/response logging (pouze dev mode)
- [ ] Globální error handling pro API calls

---

## 🟢 Nízká priorita

### Image Optimization
- [ ] Implementovat lazy loading pro všechny obrázky
  - [ ] Přidat `loading="lazy"` attribute
- [ ] WebP formát s fallback na JPG/PNG
  - [ ] Vytvořit `<picture>` komponenty
  - [ ] Implementovat `srcset` pro responsive images
- [ ] Zvážit použití CDN pro obrázky
  - [ ] Cloudinary
  - [ ] ImageKit
  - [ ] Nebo vlastní optimalizace na build time

### Error Tracking & Monitoring
- [ ] Sentry integrace
  - [ ] `npm i @sentry/vue`
  - [ ] Vytvoření Sentry projektu
  - [ ] Konfigurace v `main.ts`
  - [ ] Napojení na `logger.ts`
  - [ ] Source maps pro production
- [ ] Performance monitoring
  - [ ] Web Vitals tracking (CLS, FID, FCP, LCP, TTFB)
  - [ ] Custom performance marks
- [ ] Analytics
  - [ ] Google Analytics 4 nebo Matomo
  - [ ] Event tracking pro formuláře
  - [ ] Conversion tracking

### Caching Strategy
- [ ] In-memory cache pro API responses v composables
- [ ] LocalStorage cache s TTL
- [ ] Service Worker pro offline support
- [ ] Implementovat SWR (stale-while-revalidate) pattern
- [ ] Cache invalidation strategie

### Documentation
- [ ] Storybook setup
  - [ ] `npx storybook@latest init`
  - [ ] Stories pro všechny komponenty
  - [ ] Props documentation
  - [ ] Events documentation
  - [ ] Deploy na CDN nebo Netlify
- [ ] JSDoc komentáře pro všechny props
  - [ ] Komponenty v `components/`
  - [ ] View komponenty
  - [ ] Form komponenty
- [ ] API dokumentace (TypeDoc)
- [ ] Contributing guidelines (`CONTRIBUTING.md`)
- [ ] Changelog (`CHANGELOG.md`) podle Keep a Changelog formátu

### Code Quality Tools
- [ ] Prettier setup
  - [ ] `npm i -D prettier eslint-config-prettier`
  - [ ] Vytvoření `.prettierrc`
  - [ ] Integrace s ESLint
- [ ] Pre-commit hooks (Husky)
  - [ ] Lint staged files
  - [ ] Run tests
  - [ ] Format code
- [ ] Commitlint pro konzistentní commit messages
  - [ ] Conventional commits format

### Accessibility (A11y)
- [ ] Audit všech formulářů
  - [ ] ARIA labels
  - [ ] Keyboard navigation
  - [ ] Focus management
- [ ] Color contrast check
- [ ] Screen reader testing
- [ ] Lighthouse accessibility audit

### Security Enhancements
- [ ] Content Security Policy (vyžaduje backend změny)
- [ ] Client-side rate limiting pro formuláře
- [ ] Input sanitization review
- [ ] XSS protection audit (✅ DOMPurify již implementován)
- [ ] CSRF token handling (pokud potřeba)

### UX Improvements
- [ ] Loading skeletons místo "Načítání..." textu
  - [ ] PrimeVue Skeleton komponenta
  - [ ] Custom skeleton pro tabulky
  - [ ] Skeleton pro karty
- [ ] Toast notifications pro user feedback
- [ ] Optimistic UI updates
- [ ] Better error messages (user-friendly)
- [ ] Form field auto-focus
- [ ] Form auto-save (draft mode)

### Migration & Refactoring
- [ ] Migrace z HTML na Tiptap JSON (dlouhodobý cíl)
  - [ ] Instalace Tiptap editoru
  - [ ] Backend podpora pro JSON content
  - [ ] Renderer komponenta pro JSON
  - [ ] Migrace starých HTML dat
  - [ ] Dual storage během přechodu
- [ ] Race categories z API místo config file
  - [ ] Backend API endpoint
  - [ ] Frontend fetching logic
  - [ ] Cache pro categories

---

## 📋 Backlog (Future Ideas)

### Features
- [ ] Dark mode podpora
  - [ ] Theme switching
  - [ ] User preference v localStorage
  - [ ] System preference detection
- [ ] Internationalization (i18n)
  - [ ] Multi-language support
  - [ ] Vue i18n setup
- [ ] Print stylesheet pro výsledky
- [ ] Export výsledků (CSV, PDF)
- [ ] Social media sharing
- [ ] Progressive Web App (PWA)
  - [ ] Service Worker
  - [ ] Manifest.json
  - [ ] Offline support
  - [ ] Install prompt

### Developer Experience
- [ ] Component playground
- [ ] Design system dokumentace
- [ ] Visual regression testing
- [ ] Automated dependency updates (Renovate/Dependabot)

---

## ✅ Dokončeno

### Kritické problémy (High Priority)
- [x] Opravit TypeScript `any` typy v `createService.ts`
- [x] Vytvořit logger service místo `console.error`
- [x] Opravit `key={index}` v v-for loops
- [x] Odstranit všechny ESLint errors

### Střední priorita
- [x] Implementovat global error handler
- [x] Environment variables typing
- [x] Race categories konfigurace
- [x] HeaderNav.vue styles refactoring
- [x] Všechny TypeScript errors opraveny
- [x] Cloudflare Turnstile types

### Infrastructure
- [x] ESLint konfigurace
- [x] TypeScript strict mode
- [x] Vite setup
- [x] Tailwind CSS setup
- [x] PrimeVue integration
- [x] Vue Router setup
- [x] Docker containerization

---

## 📝 Poznámky

- Před implementací velkých změn konzultovat s týmem
- Odhady času jsou orientační
- Priority lze měnit podle business potřeb
- Udržovat tento soubor aktuální po dokončení úkolů

**Aktuální kvalita kódu**: 9.5/10 ⭐⭐⭐⭐⭐

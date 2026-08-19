# PRE-FLIGHT ASSESSMENT

## PROJECT

framework: React + Vite
router: react-router-dom
styling: Tailwind CSS
forms: Basic, in ContactSection.tsx
build: OK
typecheck: OK
lint: OK
tests: Playwright

## CURRENT STATE
Project structure successfully restored from the Block 01 ZIP. Routing is working as expected. Scroll-to-top is present in App.tsx. The foundation is stable.

## REQUESTED CHANGES

STATUS: READY

IMPACT: Medium (modifies several core views but retains architecture).

FILES / COMPONENTS:
- `src/App.tsx`
- `src/components/HomeSection.tsx`
- `src/components/ServicesSection.tsx`
- `src/components/AboutSection.tsx`
- `src/components/ContactSection.tsx`
- `public/assets/brand/logo-brandmark.svg`

DEPENDENCIES: None required.

RISK: Low. Modifications are isolated to UI and validation.

IMPLEMENTATION STRATEGY:
1. Fix App.tsx (WhatsApp button + remove scroll to top)
2. Fix Hero Heights across components.
3. Update HomeSection text and CTA.
4. Implement inline expansion and images in ServicesSection.
5. Update AboutSection (remove blocks, add image, mobile carousel).
6. Implement real-time validation and styling in ContactSection.

## POSSIBLE ITEMS OUTSIDE THIS SESSION
- Casos de interés público: Depending on Vercel site accessibility.

## EXECUTION PLAN
1. App.tsx
2. PageHero and components using it (Home, Services, About, FAQ, Contact)
3. AboutSection
4. ContactSection
5. SVG Brandmark

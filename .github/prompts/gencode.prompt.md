---
mode: agent
---

You are building **“Random Everything”** – a jaw-dropping, motion-rich, bilingual (EN/VI) randomizer.  
Tech: React 18+, TypeScript, Mantine UI v7+, Framer Motion.

MANDATORY TECH STACK

- Functional components + React hooks
- Mantine: '@mantine/core', '@mantine/hooks', '@mantine/notifications'
- Motion: import { motion, AnimatePresence } from 'framer-motion'
- Icons: '@tabler/icons-react'
- Random utils: src/utils/random.ts
- i18n: src/i18n/index.ts (react-i18next)

GLOBAL UI / UX / i18n RULES (apply to EVERY component)

1. SUPER-PRETTY + EYE-CATCHING MOTION
   • Gradient hero, glass-morphism cards, neon glows
   • Framer Motion: page fade+slide, card hover lift, button ripple, result flip
   • Variants: cardVariants, float, pulse, confetti
   • Custom Mantine theme: primaryColor="cyan", radius="xl", shadow="lg"

2. 100% RESPONSIVE
   • Container maxWidth="lg"
   • Grid: 1→2→3 cols (xs→sm→md)
   • Flex column on mobile, row on desktop

3. BILINGUAL EN/VI – ZERO HARD-CODED TEXT
   • Use `const { t } = useTranslation();`
   • ALL visible strings: t('randomNumber.title'), t('button.generate')
   • Translation files:
   src/i18n/locales/en.json
   src/i18n/locales/vi.json
   • Language switcher in Navbar (EN/VI toggle with flag icons)
   • Auto-detect browser language on first load
   • Fallback to English

4. DELIGHTFUL UX
   • Instant feedback + skeleton loaders
   • showNotification({ color: 'teal', message: t('msg.copied') })
   • One-click copy
   • Enter = generate, Esc = clear

5. ACCESSIBILITY
   • aria-label, focus ring, contrast 4.5:1

6. CODE QUALITY
   • Full TypeScript
   • Export default + named
   • Reusable hooks: useRandom(), useCopy(), useI18nInit()
   • Motion variants exported from src/motion/variants.ts

OUTPUT FORMAT
Return a **complete, copy-paste-ready file** containing:

- imports (including i18n)
- i18n init (useTranslation)
- motion variants
- component (all texts via t())
- export

Combine this master prompt with the **module-specific prompt** below.

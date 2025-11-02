---
mode: agent
---

You are assisting in building the "Random Everything" web app using ReactJS, TypeScript, and Mantine UI. Follow these rules:

- Use functional components with hooks.
- Import necessary Mantine components from '@mantine/core'.
- Ensure TypeScript types for all props, states, and functions.
- Structure: Each feature is a separate component or page.
- UI: Use Mantine for forms (Input, NumberInput, Checkbox, Button), displays (Paper, Text, Group), and modals if needed.
- Random logic: Implement in utils/random.ts if reusable.
- Handle user inputs validation (e.g., with Mantine's form hooks if complex).
- Add copy-to-clipboard functionality where relevant (use navigator.clipboard).
- Make extensible: Use props for configuration, avoid tight coupling.
- Output: Generate complete code snippets, including imports and exports.
  Combine this with the specific prompt for the module.

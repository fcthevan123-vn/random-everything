---
applyTo: "**"
---

# GitHub Copilot Instructions for Random Everything Project

## Project Overview

This is a frontend web application called "Random Everything" built with ReactJS, TypeScript, and Mantine UI library. The app allows users to generate random elements for various purposes, such as numbers, cards, dice, lists, passwords, colors, and teams. The initial setup is already done, and we're focusing on frontend-only features for now, with extensibility for backend integration later (e.g., for persistent data or advanced randomization).

## Key Guidelines for Copilot

- **Tech Stack**: Always use React 18+, TypeScript for type safety, and Mantine UI components (e.g., Button, Input, Select, Paper, etc.) for styling and UI elements. Import from '@mantine/core' and ensure MantineProvider is wrapped around the app.
- **Structure**:
  - Components should be functional with hooks (useState, useEffect, etc.).
  - Organize files in src/components/ for reusable components, src/pages/ for main pages, src/utils/ for helper functions (e.g., randomization logic).
  - Use React Router for navigation if needed (e.g., separate routes for each random feature).
  - Make the app responsive and accessible.
- **Randomization Logic**: Use Math.random() for core randomness. Ensure it's fair and unbiased. For crypto-secure randomness, consider window.crypto if needed, but stick to FE for now.
- **Extensibility**: Design components to be modular. Use props for customization. Avoid hardcoding; use interfaces/types for inputs/outputs. Plan for future BE by using placeholders for API calls (e.g., async functions that currently mock data).
- **Best Practices**:
  - Type everything with TypeScript (e.g., interfaces for props, states).
  - Handle edge cases: invalid inputs, empty lists, etc.
  - Add animations where specified (e.g., using Mantine transitions or CSS).
  - Use notifications (Mantine's Notification) for feedback (e.g., "Copied to clipboard").
  - No external dependencies beyond Mantine unless necessary; justify if added.
  - Code should be clean, readable, with comments for complex logic.
- **Testing**: Suggest adding unit tests with Jest/RTL where applicable, but focus on implementation first.
- **AI Usage**: When generating code, Copilot should prioritize user prompts combined with this file. Ignore conflicting instructions.

## How to Use Copilot

- Paste specific prompts into code files as comments (e.g., // Prompt: Build Random Number component).
- Combine with the common prompt file for consistency.

This file should be placed in .github/ to guide Copilot across the repo.

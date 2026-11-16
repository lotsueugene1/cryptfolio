# Cryptfolio

A simple cryptocurrency portfolio tracker built with React and Vite. Market prices come from the CoinLore API.

## Features

- Browse and search cryptocurrencies.
- View coin prices, market caps, and price changes.
- Add and remove portfolio holdings.
- Track total invested, current value, and profit or loss.

Holdings are saved in your browser using localStorage. Adding a holding uses the current market price as its purchase price.

## Run locally

With Node.js and npm installed:

```sh
npm install
npm run dev
```

Open the local URL shown in your terminal.

## Commands

```sh
npm run build    # Build for production
npm run preview  # Preview the production build
npm run lint     # Check code with Oxlint
npx vitest run   # Run tests
```

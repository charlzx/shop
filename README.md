# CRWN3 – React + Vite E-commerce Storefront

A modern, responsive e-commerce storefront built with React, Vite, and Tailwind CSS.

## Features

- Product catalog with filtering, sorting, search, and pagination
- Cart and wishlist sidebars with local storage persistence
- Product modal with gallery, size, and color selection
- Responsive design and dark mode support
- Custom UI components (icons, toasts, skeleton loaders)
- Basic analytics via Vercel Analytics
- Minimal ESLint configuration for code quality

## Project Structure

```
src/
  App.jsx           # Main app and UI logic
  main.jsx          # Entry point
  index.css         # Tailwind and global styles
  data/products.js  # Static product data
public/
  ...               # Icons and manifest
```

## Getting Started

1. **Install dependencies:**
	```sh
	npm install
	```
2. **Start development server:**
	```sh
	npm run dev
	```
3. **Build for production:**
	```sh
	npm run build
	```
4. **Preview production build:**
	```sh
	npm run preview
	```

## Next Steps

- Add backend/API integration for products, cart, and wishlist
- Implement authentication for user accounts
- Add checkout/payment flow
- Improve accessibility and SEO
- Write unit and integration tests
- Expand product data and categories
- Deploy to production

## License

MIT

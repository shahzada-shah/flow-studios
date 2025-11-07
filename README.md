# Flow Studios - E-Commerce Platform

> Premium Pilates & studio wear e-commerce platform built with React, TypeScript, and Tailwind CSS. Features elegant UI/UX, smooth animations, dynamic cart/wishlist, image optimization, CI/CD deployment, and fully responsive design.

**Live Demo:** [https://shahzada-shah.github.io/flow-studios/](https://shahzada-shah.github.io/flow-studios/)

## 🎯 Project Overview

A production-ready e-commerce Single Page Application (SPA) showcasing modern frontend development practices and user-centric design. Built for a fictional Pilates studio brand, this project demonstrates full-stack capabilities including state management, responsive design, dynamic routing, and automated deployment.

## ✨ Key Features

### Core Functionality
- **Product Catalog** - Browse 12+ products with advanced filtering (size, color, activity, price, sustainability)
- **Shopping Cart** - Add/remove items, adjust quantities, persistent storage via Context API
- **Wishlist System** - Save favorites with one-click "Add All to Bag" functionality
- **User Account** - Order history with dynamic reorder functionality
- **Checkout Flow** - Multi-step checkout process with validation
- **Image Optimization** - Smart loader shows content after 50% of images load
- **Responsive Design** - Mobile-first approach, works seamlessly on all devices

### Technical Highlights
- **Dynamic Routing** - React Router v7 with URL-based filtering
- **State Management** - React Context API for cart, wishlist, and notifications
- **Smooth Animations** - Custom CSS animations and transitions
- **Auto-close Drawers** - Smart UX that closes on scroll with positioned modals
- **CI/CD Pipeline** - Automated deployment to GitHub Pages via GitHub Actions
- **Type Safety** - Full TypeScript implementation throughout

## 🛠 Tech Stack

| Category | Technologies |
|----------|-------------|
| **Frontend** | React 18, TypeScript, Vite |
| **Styling** | Tailwind CSS, Custom Animations |
| **Routing** | React Router v7 |
| **State** | Context API, Custom Hooks |
| **Icons** | Lucide React |
| **Deployment** | GitHub Pages, GitHub Actions |

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/shahzada-shah/flow-studios.git
cd flow-studios

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 📁 Project Structure

```
src/
├── components/
│   ├── account/        # Order history, user profile
│   ├── layout/         # Header, Footer, Hero
│   ├── products/       # ProductCard, FilterPanel, QuickBuyModal
│   ├── sections/       # Homepage sections (Bestsellers, Blog, etc.)
│   └── ui/             # Reusable UI (Modals, Drawers, Toast, Loader)
├── context/            # Global state (Cart, Wishlist, Toast)
├── hooks/              # Custom hooks (useImagePreloader)
├── pages/              # Route pages (Home, Shop, Checkout, Account)
├── data/               # Hard-coded product data
├── types/              # TypeScript definitions
└── utils/              # Helper functions (getImagePath)
```

## 🎨 Design Philosophy

- **Minimalist & Elegant** - Clean design with premium feel
- **User-Centric** - Intuitive navigation and smooth interactions
- **Performance First** - Optimized loading with smart image preloading
- **Responsive** - Mobile-first approach with seamless desktop experience

## 💡 Development Highlights

### Smart Image Loading
Implemented custom `useImagePreloader` hook that displays content after 50% of images load, significantly improving perceived performance while remaining images load in the background.

### Dynamic Positioning
Drawers and modals position themselves based on user's scroll location, providing context-aware UX that feels natural and responsive.

### Auto-close on Scroll
Innovative UX pattern where drawers automatically close when user begins scrolling the main page, preventing obstruction while maintaining easy re-access.

### Reusable Components
Built a library of 30+ reusable components with clear separation of concerns, making the codebase maintainable and scalable.

## 📈 Performance Optimizations

- **Code Splitting** - Route-based lazy loading
- **Image Optimization** - Progressive loading strategy
- **Efficient Rendering** - Memoization and proper React patterns
- **Production Build** - Minified and optimized assets

## 🔧 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production  
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## 🌐 Deployment

Automated CI/CD pipeline deploys to GitHub Pages on every push to main branch. The deployment workflow:
1. Installs dependencies
2. Builds production assets with Vite
3. Configures GitHub Pages settings
4. Deploys to `gh-pages` branch

## 📝 Key Learnings

- Advanced React patterns and Context API for state management
- Building production-ready SPAs with proper routing and deployment
- Creating smooth, performant animations and transitions
- Implementing complex filtering and sorting logic
- Responsive design with Tailwind CSS
- TypeScript for type safety and better developer experience

## 👤 Author

**Kazi Digital Studio**  
Built as a portfolio project demonstrating modern frontend development capabilities.

## 📄 License

MIT License - Free to use for learning and reference.

---

⭐ **For Recruiters:** This project demonstrates proficiency in React, TypeScript, modern CSS, state management, responsive design, and deployment workflows. All code is production-quality with proper error handling, type safety, and user experience considerations.

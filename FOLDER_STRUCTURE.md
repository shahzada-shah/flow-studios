# FLOW Studio - Folder Structure Guide

This document provides a visual overview of the project's folder structure to help you navigate the codebase efficiently.

## 📂 Complete Project Structure

```
flow-studio/
│
├── 📄 Configuration Files
│   ├── .env                        # Environment variables (Supabase credentials)
│   ├── .gitignore                  # Git ignore patterns
│   ├── package.json                # Dependencies and scripts
│   ├── package-lock.json           # Locked dependency versions
│   ├── tsconfig.json               # TypeScript configuration
│   ├── tsconfig.app.json           # App-specific TypeScript config
│   ├── tsconfig.node.json          # Node-specific TypeScript config
│   ├── vite.config.ts              # Vite build configuration
│   ├── tailwind.config.js          # Tailwind CSS configuration
│   ├── postcss.config.js           # PostCSS configuration
│   └── eslint.config.js            # ESLint configuration
│
├── 📚 Documentation
│   ├── README.md                   # Main project documentation
│   ├── DEVELOPER_GUIDE.md          # Comprehensive developer guide
│   └── FOLDER_STRUCTURE.md         # This file - folder structure overview
│
├── 🗄️ supabase/
│   ├── DATABASE_SCHEMA.md          # Database documentation
│   └── migrations/                 # Database migration files
│       ├── 20251026090607_create_products_schema.sql
│       └── 20251026121718_add_bestseller_and_diverse_products.sql
│
├── 🌐 public/                      # Static assets (served directly)
│
└── 💻 src/                         # Source code (main application)
    │
    ├── 📄 Entry Points
    │   ├── main.tsx                # Application entry point
    │   ├── App.tsx                 # Root component with routing
    │   ├── index.css               # Global styles and animations
    │   └── vite-env.d.ts          # Vite type definitions
    │
    ├── 🎨 components/              # React components
    │   │
    │   ├── account/                # Account management components
    │   │   ├── AccountSidebar.tsx  # Account navigation sidebar
    │   │   ├── AddressesTab.tsx    # Saved addresses management
    │   │   ├── DetailsForm.tsx     # Profile editing form
    │   │   ├── OrderCard.tsx       # Individual order display
    │   │   ├── OrdersList.tsx      # Order history list
    │   │   └── WishlistTab.tsx     # Wishlist items in account
    │   │
    │   ├── auth/                   # Authentication components
    │   │   ├── AuthForm.tsx        # Login/signup form
    │   │   └── AuthTabs.tsx        # Auth mode switcher
    │   │
    │   ├── layout/                 # Main layout components
    │   │   ├── Header.tsx          # Navigation bar (sticky)
    │   │   ├── Footer.tsx          # Site footer with links
    │   │   └── Hero.tsx            # Homepage hero section
    │   │
    │   ├── products/               # Product-related components
    │   │   ├── FilterPanel.tsx     # Product filtering sidebar
    │   │   └── ProductCard.tsx     # Product grid item card
    │   │
    │   ├── sections/               # Homepage content sections
    │   │   ├── Bestsellers.tsx     # Featured products carousel
    │   │   ├── BlogSection.tsx     # Blog preview section
    │   │   ├── BrandBanner.tsx     # Brand message banner
    │   │   ├── MantraSection.tsx   # Brand philosophy section
    │   │   ├── ShopByActivity.tsx  # Activity-based navigation
    │   │   └── ValueProps.tsx      # Value propositions grid
    │   │
    │   └── ui/                     # Generic reusable UI components
    │       ├── 📚 Documentation
    │       │   ├── README.md                        # UI components overview
    │       │   ├── ARCHITECTURE.md                  # Architecture patterns
    │       │   └── DRAWER_SYSTEM_DOCUMENTATION.md   # Drawer system details
    │       │
    │       ├── CartPanel.tsx       # Shopping cart slide-out
    │       ├── Loader.tsx          # Full-screen loading animation
    │       ├── MobileMenu.tsx      # Mobile navigation drawer
    │       ├── NavigationDropdown.tsx  # Desktop menu dropdown
    │       ├── NewsletterModal.tsx # Newsletter subscription modal
    │       ├── SearchModal.tsx     # Product search overlay
    │       ├── SlideOutPanel.tsx   # Base panel component (reusable)
    │       ├── Toast.tsx           # Toast notification component
    │       └── WishlistPanel.tsx   # Wishlist slide-out
    │
    ├── 🔄 context/                 # React Context providers (global state)
    │   ├── AuthContext.tsx         # User authentication state
    │   ├── CartContext.tsx         # Shopping cart state
    │   ├── ToastContext.tsx        # Toast notification state
    │   └── WishlistContext.tsx     # Wishlist state
    │
    ├── 🪝 hooks/                   # Custom React hooks
    │   ├── useToggle.ts            # Boolean state toggle hook
    │   └── useClickOutside.ts      # Outside click detection hook
    │
    ├── 📚 lib/                     # Third-party integrations
    │   └── supabase.ts             # Supabase client configuration
    │
    ├── 📄 pages/                   # Route components (full pages)
    │   ├── Account.tsx             # User account dashboard
    │   ├── Auth.tsx                # Login/signup page
    │   ├── Checkout.tsx            # Multi-step checkout flow
    │   ├── Home.tsx                # Homepage (sections composition)
    │   ├── ProductCatalog.tsx      # Product listing with filters
    │   └── ProductDetail.tsx       # Individual product page
    │
    ├── 🏷️ types/                   # TypeScript type definitions
    │   ├── index.ts                # Global types and interfaces
    │   └── product.ts              # Product-specific types
    │
    ├── 🛠️ utils/                   # Helper/utility functions
    │   ├── format.ts               # Formatting helpers (currency, dates)
    │   ├── validation.ts           # Form validation functions
    │   └── product.ts              # Product-related utilities
    │
    └── 📦 constants/               # Application constants
        └── index.ts                # Global constants and config
```

## 🎯 Quick Reference by Task

### Working on Authentication?
```
src/
├── context/AuthContext.tsx      # Auth state management
├── pages/Auth.tsx               # Auth page
├── components/auth/             # Auth UI components
└── lib/supabase.ts              # Supabase client
```

### Working on Shopping Cart?
```
src/
├── context/CartContext.tsx      # Cart state management
├── components/ui/CartPanel.tsx  # Cart UI
└── pages/Checkout.tsx           # Checkout flow
```

### Working on Products?
```
src/
├── pages/
│   ├── ProductCatalog.tsx       # Product listing
│   └── ProductDetail.tsx        # Product details
├── components/products/
│   ├── ProductCard.tsx          # Product card
│   └── FilterPanel.tsx          # Filters
└── types/product.ts             # Product types
```

### Adding a New Page?
```
1. Create component in src/pages/YourPage.tsx
2. Add route in src/App.tsx
3. Add navigation link in src/components/layout/Header.tsx
```

### Adding a New Component?
```
1. Choose appropriate folder:
   - Generic UI → src/components/ui/
   - Feature-specific → src/components/[feature]/
   - Full page → src/pages/
2. Create TypeScript file with proper types
3. Follow existing patterns and conventions
```

### Working with Database?
```
supabase/
├── DATABASE_SCHEMA.md           # Schema documentation
├── migrations/                  # Migration files
└── src/lib/supabase.ts         # Client setup
```

## 📋 File Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| **Components** | PascalCase.tsx | `ProductCard.tsx` |
| **Pages** | PascalCase.tsx | `ProductCatalog.tsx` |
| **Hooks** | camelCase.ts (use prefix) | `useToggle.ts` |
| **Utils** | camelCase.ts | `format.ts` |
| **Types** | camelCase.ts | `product.ts` |
| **Context** | PascalCase.tsx (Context suffix) | `AuthContext.tsx` |
| **Constants** | camelCase.ts | `index.ts` |

## 🗂️ Component Organization Principles

### 1. Single Responsibility
Each component/file has ONE clear purpose:
- ✅ `ProductCard.tsx` - Display a product card
- ✅ `FilterPanel.tsx` - Product filtering UI
- ❌ `ProductStuff.tsx` - Too vague

### 2. Feature-Based Grouping
Related components are grouped by feature:
```
components/
├── account/     # All account-related UI
├── auth/        # All auth-related UI
├── products/    # All product-related UI
└── ui/          # Generic, reusable UI
```

### 3. Depth Limit
Maximum 2-3 levels of nesting:
- ✅ `components/account/OrderCard.tsx`
- ❌ `components/user/account/orders/card/OrderCard.tsx` - Too deep

## 🔍 Finding Things Quickly

### "Where is the navigation bar?"
```
src/components/layout/Header.tsx
```

### "Where is cart state managed?"
```
src/context/CartContext.tsx
```

### "Where are product types defined?"
```
src/types/product.ts
```

### "Where is the database schema?"
```
supabase/DATABASE_SCHEMA.md
```

### "Where are custom animations?"
```
src/index.css (lines 22-127)
```

### "Where is the Supabase client configured?"
```
src/lib/supabase.ts
```

### "Where are utility functions?"
```
src/utils/
├── format.ts       # Currency, dates
├── validation.ts   # Form validation
└── product.ts      # Product helpers
```

## 📦 Module Boundaries

### Context Providers (Global State)
- Only 4 context providers (Auth, Cart, Wishlist, Toast)
- Initialized in `App.tsx`
- Accessed via custom hooks (`useAuth`, `useCart`, etc.)

### Components
- **NO** component should access another component's internal state
- Use props for parent-child communication
- Use context for global state
- Use callbacks for child-parent communication

### Utils
- Pure functions only (no side effects)
- No component imports
- No context usage
- Testable in isolation

### Hooks
- Reusable logic extraction
- Can use other hooks
- Should be generic and reusable
- Follow `use` prefix convention

## 🚀 For New Developers

### Day 1: Essential Files
```
1. README.md                     # Project overview
2. DEVELOPER_GUIDE.md           # Development guidelines
3. src/App.tsx                  # Understand routing
4. src/components/layout/       # See app structure
```

### Week 1: Core Patterns
```
1. src/context/                 # Learn state management
2. src/hooks/                   # Learn custom hooks
3. src/components/ui/           # Learn UI patterns
4. src/utils/                   # Learn helper functions
```

### Month 1: Full Stack
```
1. supabase/DATABASE_SCHEMA.md  # Learn database
2. src/lib/supabase.ts         # Learn API integration
3. All page components          # Learn routing
4. All context providers        # Learn state patterns
```

## 🧪 Testing Your Changes

### Before Committing
```bash
# 1. Type checking
npm run typecheck

# 2. Linting
npm run lint

# 3. Build verification
npm run build

# 4. Manual testing
npm run dev
```

### Files to Check
```
If you modified:
├── components/         → Test UI in browser
├── context/           → Test state updates
├── pages/             → Test routing
├── utils/             → Test functions in isolation
├── types/             → Run typecheck
└── supabase/          → Test database queries
```

## 💡 Pro Tips

### Quick Navigation in VS Code
```
Ctrl/Cmd + P → Type filename
Ctrl/Cmd + Shift + F → Search in all files
Ctrl/Cmd + Click → Go to definition
```

### Finding Examples
```
Need to create a new component?
→ Look at existing components in the same folder

Need to use context?
→ Look at how other components use useAuth or useCart

Need to add a database query?
→ Check supabase/DATABASE_SCHEMA.md for examples
```

### Common Locations
```
Styles: src/index.css
Routing: src/App.tsx
Global state: src/context/
Types: src/types/
API config: src/lib/supabase.ts
```

---

**Need help?** Check the comprehensive guides:
- [README.md](./README.md) - Project overview and setup
- [DEVELOPER_GUIDE.md](./DEVELOPER_GUIDE.md) - Detailed development guide
- [DATABASE_SCHEMA.md](./supabase/DATABASE_SCHEMA.md) - Database documentation
- [UI Architecture](./src/components/ui/ARCHITECTURE.md) - UI patterns

**Last Updated:** 2025-10-27

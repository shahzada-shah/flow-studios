# FLOW Studio - Developer Guide

Welcome to FLOW Studio! This comprehensive guide will help you understand the project structure, architecture patterns, and best practices for contributing to this codebase.

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Architecture](#architecture)
- [State Management](#state-management)
- [Database](#database)
- [Component Guidelines](#component-guidelines)
- [Styling Conventions](#styling-conventions)
- [Common Patterns](#common-patterns)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)
- [Code Review Checklist](#code-review-checklist)

## 🎯 Project Overview

FLOW Studio is a production-ready e-commerce platform for mindful activewear (pilates/yoga). Built with modern web technologies, it demonstrates professional development practices and clean architecture.

### Key Features

- User authentication with Supabase Auth
- Product catalog with advanced filtering
- Shopping cart with persistent state
- Wishlist functionality
- User account management
- Responsive design with mobile-first approach
- Newsletter subscription modal
- Toast notifications

## 🛠 Tech Stack

| Technology | Purpose | Version |
|------------|---------|---------|
| **React** | UI library | 18.3.1 |
| **TypeScript** | Type safety | 5.5.3 |
| **Vite** | Build tool | 5.4.2 |
| **Tailwind CSS** | Styling | 3.4.1 |
| **Supabase** | Backend & Auth | 2.57.4 |
| **React Router** | Routing | 7.9.4 |
| **Lucide React** | Icons | 0.344.0 |

## 🚀 Getting Started

### Prerequisites

- Node.js 18 or higher
- npm (comes with Node.js)
- Supabase account (credentials already configured)
- Basic understanding of React and TypeScript

### Initial Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run type checking
npm run typecheck

# Build for production
npm run build

# Preview production build
npm run preview
```

### Development Workflow

1. **Start the dev server**: `npm run dev`
2. **Make your changes** in the appropriate files
3. **Test locally** in the browser
4. **Run type checking**: `npm run typecheck`
5. **Run linting**: `npm run lint`
6. **Build to verify**: `npm run build`

## 📁 Project Structure

```
flow-studio/
├── src/
│   ├── components/          # All React components
│   │   ├── account/        # Account management UI
│   │   ├── auth/           # Authentication forms
│   │   ├── layout/         # App layout (Header, Footer, Hero)
│   │   ├── products/       # Product display components
│   │   ├── sections/       # Homepage sections
│   │   └── ui/             # Reusable UI components
│   ├── context/            # Global state providers
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Third-party integrations
│   ├── pages/              # Route components
│   ├── types/              # TypeScript definitions
│   ├── utils/              # Helper functions
│   ├── constants/          # App constants
│   ├── App.tsx             # Root component with routes
│   └── main.tsx            # Application entry point
├── supabase/
│   └── migrations/         # Database migrations
├── public/                 # Static assets
└── dist/                   # Production build output
```

### Component Organization

Components are organized by feature and responsibility:

#### `/components/account`
Account-related components for user profile management:
- `AccountSidebar.tsx` - Navigation between account sections
- `AddressesTab.tsx` - Address management
- `DetailsForm.tsx` - Profile editing form
- `OrderCard.tsx` - Individual order display
- `OrdersList.tsx` - Order history list
- `WishlistTab.tsx` - Saved items display

#### `/components/auth`
Authentication UI components:
- `AuthForm.tsx` - Login/signup form
- `AuthTabs.tsx` - Tab switcher for auth modes

#### `/components/layout`
Main layout components:
- `Header.tsx` - Navigation bar with dropdowns
- `Footer.tsx` - Site footer with links
- `Hero.tsx` - Homepage hero section

#### `/components/products`
Product-specific components:
- `FilterPanel.tsx` - Product filtering sidebar
- `ProductCard.tsx` - Product grid item

#### `/components/sections`
Homepage content sections:
- `Bestsellers.tsx` - Featured products carousel
- `BlogSection.tsx` - Blog preview section
- `BrandBanner.tsx` - Brand message banner
- `MantraSection.tsx` - Brand philosophy section
- `ShopByActivity.tsx` - Activity-based navigation
- `ValueProps.tsx` - Value propositions grid

#### `/components/ui`
Generic, reusable UI components:
- `CartPanel.tsx` - Shopping cart slide-out
- `Loader.tsx` - Full-screen loading animation
- `MobileMenu.tsx` - Mobile navigation drawer
- `NavigationDropdown.tsx` - Desktop menu dropdown
- `NewsletterModal.tsx` - Newsletter signup modal
- `SearchModal.tsx` - Product search overlay
- `SlideOutPanel.tsx` - Reusable slide-out panel
- `Toast.tsx` - Toast notification component
- `WishlistPanel.tsx` - Wishlist slide-out

## 🏗 Architecture

### State Management Pattern

The application uses **React Context API** for global state management. This approach:
- Avoids prop drilling
- Provides clean separation of concerns
- Easy to test and maintain
- No external dependencies required

#### Context Providers

All contexts are initialized in `App.tsx` and wrap the entire application:

```tsx
<ToastProvider>
  <AuthProvider>
    <CartProvider>
      <WishlistProvider>
        {/* App content */}
      </WishlistProvider>
    </CartProvider>
  </AuthProvider>
</ToastProvider>
```

### Component Architecture

Components follow these principles:

1. **Single Responsibility** - Each component has one clear purpose
2. **Composition** - Complex UIs built from smaller components
3. **Props Over State** - Pass data down, callbacks up
4. **TypeScript First** - All props and state are typed
5. **JSDoc Comments** - Document component purpose and usage

### File Naming Conventions

- **Components**: PascalCase (e.g., `ProductCard.tsx`)
- **Hooks**: camelCase with `use` prefix (e.g., `useToggle.ts`)
- **Utils**: camelCase (e.g., `format.ts`)
- **Types**: camelCase (e.g., `product.ts`)
- **Pages**: PascalCase (e.g., `ProductCatalog.tsx`)

## 🔄 State Management

### AuthContext

Manages user authentication state and session.

**Location**: `src/context/AuthContext.tsx`

**Usage**:
```tsx
import { useAuth } from '../context/AuthContext'

function MyComponent() {
  const { user, loading, signIn, signUp, signOut } = useAuth()

  // Check if user is authenticated
  if (!user) {
    return <Navigate to="/auth" />
  }

  // Use user data
  return <div>Welcome, {user.email}</div>
}
```

**Available Methods**:
- `signIn(email, password)` - Sign in with credentials
- `signUp(email, password)` - Create new account
- `signOut()` - Sign out current user

**State**:
- `user` - Current user object or null
- `loading` - Boolean indicating auth check in progress

### CartContext

Manages shopping cart items and operations.

**Location**: `src/context/CartContext.tsx`

**Usage**:
```tsx
import { useCart } from '../context/CartContext'

function ProductPage() {
  const { addToCart, cartCount, total } = useCart()

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      size: selectedSize,
      color: product.color,
      image: product.image_url,
      quantity: 1
    })
  }

  return (
    <button onClick={handleAddToCart}>
      Add to Cart ({cartCount} items)
    </button>
  )
}
```

**Available Methods**:
- `addToCart(item)` - Add item to cart
- `removeFromCart(id, size)` - Remove specific item
- `updateQuantity(id, size, quantity)` - Update item quantity
- `clearCart()` - Empty the cart

**State**:
- `items` - Array of cart items
- `cartCount` - Total number of items
- `total` - Total price

### WishlistContext

Manages user's saved products.

**Location**: `src/context/WishlistContext.tsx`

**Important**: Wishlist uses numeric IDs. Always convert string IDs:

```tsx
import { useWishlist } from '../context/WishlistContext'

function ProductCard({ product }) {
  const { wishlist, toggleWishlist } = useWishlist()

  // Convert ID to number
  const productId = parseInt(product.id)
  const isInWishlist = wishlist.has(productId)

  const handleWishlistClick = () => {
    toggleWishlist({
      id: productId,  // Must be number!
      name: product.name,
      price: product.price,
      color: product.color,
      image: product.image_url || ''
    })
  }

  return (
    <button onClick={handleWishlistClick}>
      {isInWishlist ? 'Remove from' : 'Add to'} Wishlist
    </button>
  )
}
```

**Available Methods**:
- `toggleWishlist(product)` - Add/remove from wishlist

**State**:
- `wishlist` - Set of product IDs (numbers)

### ToastContext

Displays temporary notification messages.

**Location**: `src/context/ToastContext.tsx`

**Usage**:
```tsx
import { useToast } from '../context/ToastContext'

function MyComponent() {
  const { showToast } = useToast()

  const handleSuccess = () => {
    showToast('Operation successful!', 'success')
  }

  const handleError = () => {
    showToast('Something went wrong', 'error')
  }

  const handleWishlist = () => {
    showToast('Added to wishlist', 'wishlist')
  }
}
```

**Toast Types**:
- `success` - Green background
- `error` - Red background
- `wishlist` - Special wishlist styling

## 🗄 Database

### Supabase Setup

The application uses Supabase for:
- **PostgreSQL database** - Product catalog, categories
- **Authentication** - User management
- **Row Level Security** - Data access control

### Database Schema

#### Products Table

```sql
CREATE TABLE products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  price decimal NOT NULL,
  color text NOT NULL,
  sizes text[] NOT NULL,
  activities text[] NOT NULL,
  image_url text,
  additional_images text[],
  category_id uuid REFERENCES categories(id),
  in_stock boolean DEFAULT true,
  is_new boolean DEFAULT false,
  is_bestseller boolean DEFAULT false,
  is_sustainable boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);
```

#### Categories Table

```sql
CREATE TABLE categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  created_at timestamptz DEFAULT now()
);
```

### Query Patterns

#### Fetching Single Row (May Not Exist)

```tsx
const { data, error } = await supabase
  .from('products')
  .select('*')
  .eq('id', productId)
  .maybeSingle()  // Returns null if not found, no error

if (error) {
  console.error('Database error:', error)
  return
}

if (!data) {
  console.log('Product not found')
  return
}
```

#### Fetching Multiple Rows

```tsx
const { data, error } = await supabase
  .from('products')
  .select(`
    *,
    categories!inner(name, slug)
  `)
  .eq('in_stock', true)
  .order('created_at', { ascending: false })
  .limit(12)

if (error) {
  console.error('Error:', error)
  return
}

setProducts(data || [])
```

#### Filtering with Multiple Conditions

```tsx
let query = supabase
  .from('products')
  .select('*')

if (category) {
  query = query.eq('category_id', category)
}

if (minPrice) {
  query = query.gte('price', minPrice)
}

if (maxPrice) {
  query = query.lte('price', maxPrice)
}

const { data, error } = await query
```

### Row Level Security (RLS)

All tables have RLS enabled. Example policy for products:

```sql
-- Everyone can read products
CREATE POLICY "Products are viewable by everyone"
  ON products FOR SELECT
  USING (true);

-- Only authenticated users can read their own data
CREATE POLICY "Users can view own data"
  ON user_profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);
```

## 🎨 Component Guidelines

### Component Template

```tsx
/**
 * ComponentName
 *
 * Brief description of what this component does.
 *
 * @example
 * ```tsx
 * <ComponentName
 *   prop1="value"
 *   prop2={someValue}
 * />
 * ```
 */

import { useState } from 'react'

interface ComponentNameProps {
  prop1: string
  prop2: number
  onAction?: () => void
}

export const ComponentName = ({ prop1, prop2, onAction }: ComponentNameProps) => {
  const [localState, setLocalState] = useState('')

  const handleClick = () => {
    if (onAction) {
      onAction()
    }
  }

  return (
    <div className="container">
      {/* Component content */}
    </div>
  )
}
```

### Props Interface Guidelines

Always define props with TypeScript interfaces:

```tsx
interface ButtonProps {
  // Required props
  label: string
  onClick: () => void

  // Optional props
  variant?: 'primary' | 'secondary'
  disabled?: boolean
  className?: string

  // Children
  children?: React.ReactNode
}
```

### Component Size Guidelines

- **Small components**: < 100 lines
- **Medium components**: 100-200 lines
- **Large components**: 200-300 lines
- **Consider refactoring**: > 300 lines

When components exceed 300 lines, consider:
1. Extracting sub-components
2. Moving logic to custom hooks
3. Breaking into smaller, focused components

## 🎨 Styling Conventions

### Tailwind CSS Guidelines

We use Tailwind CSS utility classes for all styling.

#### Class Organization

Order classes consistently:
1. Layout (display, position)
2. Sizing (width, height)
3. Spacing (margin, padding)
4. Typography (font, text)
5. Visuals (background, border)
6. Effects (shadow, opacity)
7. Transitions
8. Hover/Focus states

```tsx
<button
  className="
    flex items-center justify-center
    w-full px-8 py-4
    text-sm font-semibold tracking-widest
    bg-gray-900 text-white border border-gray-900
    shadow-lg
    transition-all duration-300
    hover:bg-gray-800 hover:shadow-xl
    focus:outline-none focus:ring-2 focus:ring-gray-900
  "
>
  Button Text
</button>
```

#### Spacing System

Use consistent spacing values:
- `p-1` = 4px
- `p-2` = 8px
- `p-4` = 16px
- `p-6` = 24px
- `p-8` = 32px
- `p-12` = 48px
- `p-16` = 64px

#### Responsive Design

Mobile-first approach:

```tsx
<div className="
  p-4        /* Mobile: 16px padding */
  md:p-6     /* Tablet: 24px padding */
  lg:p-8     /* Desktop: 32px padding */
  xl:p-12    /* Large desktop: 48px padding */
">
```

#### Custom Animations

Available custom animations (defined in `src/index.css`):

```tsx
<div className="animate-fadeIn">Fades in</div>
<div className="animate-fadeOut">Fades out</div>
<div className="animate-slideDown">Slides down</div>
<div className="animate-slideUp">Slides up</div>
<div className="animate-slideInRight">Slides in from right</div>
<div className="animate-scaleIn">Scales in</div>
```

### Color Palette

Primary colors:
- `gray-900` (#111827) - Primary text, buttons
- `gray-600` (#4b5563) - Secondary text
- `gray-100` (#f3f4f6) - Light backgrounds
- `white` (#ffffff) - Primary background

## 🔧 Common Patterns

### Data Fetching Pattern

```tsx
const [data, setData] = useState<Product[]>([])
const [loading, setLoading] = useState(true)
const [error, setError] = useState<string | null>(null)

useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)

      const { data, error } = await supabase
        .from('products')
        .select('*')

      if (error) throw error

      setData(data || [])
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error'
      setError(errorMessage)
      console.error('Fetch error:', err)
    } finally {
      setLoading(false)
    }
  }

  fetchData()
}, [])

if (loading) return <Loader />
if (error) return <div>Error: {error}</div>
if (!data.length) return <div>No data found</div>

return <div>{/* Render data */}</div>
```

### Form Handling Pattern

```tsx
interface FormData {
  email: string
  password: string
}

const [formData, setFormData] = useState<FormData>({
  email: '',
  password: ''
})
const [loading, setLoading] = useState(false)
const { showToast } = useToast()

const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  setFormData(prev => ({
    ...prev,
    [e.target.name]: e.target.value
  }))
}

const handleSubmit = async (e: FormEvent) => {
  e.preventDefault()
  setLoading(true)

  try {
    // Validation
    if (!isValidEmail(formData.email)) {
      showToast('Invalid email address', 'error')
      return
    }

    // Submit
    const { error } = await submitForm(formData)

    if (error) {
      showToast(error.message, 'error')
    } else {
      showToast('Form submitted successfully!', 'success')
      // Reset or redirect
    }
  } catch (err) {
    showToast('An unexpected error occurred', 'error')
    console.error(err)
  } finally {
    setLoading(false)
  }
}
```

### Custom Hook Pattern

```tsx
// useToggle.ts
export const useToggle = (initialValue = false) => {
  const [value, setValue] = useState(initialValue)

  const toggle = useCallback(() => {
    setValue(v => !v)
  }, [])

  const setTrue = useCallback(() => {
    setValue(true)
  }, [])

  const setFalse = useCallback(() => {
    setValue(false)
  }, [])

  return [value, toggle, setTrue, setFalse] as const
}

// Usage
const [isOpen, toggle, open, close] = useToggle(false)
```

## ✅ Best Practices

### Code Style

1. **Use functional components** with hooks
2. **Prefer const over let** for immutability
3. **Destructure props** in function parameters
4. **Use explicit types** instead of `any`
5. **Extract magic numbers** into named constants
6. **Keep functions pure** when possible
7. **Use early returns** to reduce nesting
8. **Add JSDoc comments** for complex logic

### TypeScript Best Practices

```tsx
// ✅ Good
interface User {
  id: string
  email: string
  name: string
}

const getUser = async (id: string): Promise<User | null> => {
  const { data } = await supabase.from('users').select('*').eq('id', id).maybeSingle()
  return data
}

// ❌ Avoid
const getUser = async (id: any): Promise<any> => {
  const { data } = await supabase.from('users').select('*').eq('id', id).maybeSingle()
  return data
}
```

### Error Handling

Always handle errors explicitly:

```tsx
// ✅ Good - Explicit error handling
try {
  const { data, error } = await supabase.from('products').select('*')

  if (error) {
    console.error('Database error:', error)
    showToast('Failed to load products', 'error')
    return
  }

  setProducts(data)
} catch (err) {
  console.error('Unexpected error:', err)
  showToast('An unexpected error occurred', 'error')
}

// ❌ Avoid - Silent failures
const { data } = await supabase.from('products').select('*')
setProducts(data)
```

### Performance Optimization

1. **Use React.memo** for expensive components
2. **Use useCallback** for callbacks passed to children
3. **Use useMemo** for expensive calculations
4. **Lazy load routes** with React.lazy
5. **Optimize images** (proper sizing, formats)
6. **Debounce search inputs**

```tsx
// Memoize expensive component
export const ProductCard = React.memo(({ product }: ProductCardProps) => {
  // Component logic
})

// Memoize callback
const handleClick = useCallback(() => {
  // Handle click
}, [dependency])

// Memoize calculation
const total = useMemo(() => {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0)
}, [items])
```

### Accessibility

1. **Use semantic HTML** (button, nav, main, etc.)
2. **Add ARIA labels** for icon-only buttons
3. **Ensure keyboard navigation** works
4. **Maintain focus management** in modals
5. **Provide alt text** for images
6. **Use proper heading hierarchy**

```tsx
<button
  onClick={handleClick}
  aria-label="Close modal"
  className="..."
>
  <X className="w-5 h-5" />
</button>
```

## 🐛 Troubleshooting

### Common Issues

#### TypeScript Errors

```bash
# Run type checking
npm run typecheck

# Common fixes:
# 1. Check for missing imports
# 2. Verify prop types match usage
# 3. Ensure functions return correct types
```

#### Build Failures

```bash
# Clear dist and rebuild
rm -rf dist
npm run build

# Check for:
# 1. Unused imports
# 2. Missing dependencies
# 3. Environment variables
```

#### State Not Updating

- Ensure state updates are immutable
- Check that context providers wrap components
- Verify hooks are called unconditionally

#### Database Queries Failing

- Check RLS policies in Supabase dashboard
- Verify API keys in .env file
- Check network tab for error responses
- Test queries in Supabase SQL editor

### Debugging Tips

1. **Console Logging**
   ```tsx
   console.log('User data:', user)
   console.log('Cart items:', items)
   ```

2. **React DevTools**
   - Inspect component props and state
   - View context values
   - Check component hierarchy

3. **Network Tab**
   - Review API requests
   - Check response status codes
   - Inspect request/response payloads

4. **Supabase Dashboard**
   - View table data
   - Test queries in SQL editor
   - Check RLS policies

## ✅ Code Review Checklist

Before submitting a pull request:

### Functionality
- [ ] Code works as expected
- [ ] Edge cases handled
- [ ] Error states handled
- [ ] Loading states shown

### Code Quality
- [ ] TypeScript has no errors (`npm run typecheck`)
- [ ] No console errors in browser
- [ ] No unused imports or variables
- [ ] Code follows existing patterns
- [ ] Functions are small and focused

### Documentation
- [ ] JSDoc comments added for components
- [ ] Complex logic has explanatory comments
- [ ] README updated if needed

### Testing
- [ ] Tested on different screen sizes
- [ ] Tested error scenarios
- [ ] Tested with different user states (logged in/out)

### Performance
- [ ] No unnecessary re-renders
- [ ] Images optimized
- [ ] Large lists paginated or virtualized

### Accessibility
- [ ] Keyboard navigation works
- [ ] ARIA labels on icon buttons
- [ ] Focus states visible
- [ ] Semantic HTML used

## 🎓 Learning Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [React Router](https://reactrouter.com)

## 💬 Getting Help

1. **Check component JSDoc** comments for usage examples
2. **Review similar components** for patterns
3. **Search the codebase** for examples
4. **Check documentation** files in the repo
5. **Review Supabase docs** for database queries

---

**Happy coding!** 🚀

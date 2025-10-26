# Developer Guide

Welcome to the Activewear E-commerce Platform! This guide will help you understand the project structure and how to work with the codebase.

## Project Overview

This is a modern e-commerce platform built with React, TypeScript, Vite, and Supabase. It features user authentication, product catalog, shopping cart, wishlist, and checkout functionality.

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Routing**: React Router v7
- **Icons**: Lucide React

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── account/        # Account page components
│   ├── auth/           # Authentication forms
│   ├── layout/         # Layout components (Header, Footer, Hero)
│   ├── products/       # Product-related components
│   ├── sections/       # Home page sections
│   └── ui/             # Generic UI components (modals, panels, etc.)
├── context/            # React Context providers
│   ├── AuthContext.tsx     # User authentication
│   ├── CartContext.tsx     # Shopping cart
│   ├── WishlistContext.tsx # Wishlist
│   └── ToastContext.tsx    # Toast notifications
├── hooks/              # Custom React hooks
│   ├── useToggle.ts        # Boolean toggle state
│   └── useClickOutside.ts  # Outside click detection
├── lib/                # Third-party library configurations
│   └── supabase.ts         # Supabase client setup
├── pages/              # Page-level components
│   ├── Home.tsx
│   ├── Auth.tsx
│   ├── ProductCatalog.tsx
│   ├── ProductDetail.tsx
│   ├── Account.tsx
│   └── Checkout.tsx
├── types/              # TypeScript type definitions
│   ├── index.ts
│   └── product.ts
├── utils/              # Utility functions
│   ├── format.ts       # Formatting helpers
│   ├── validation.ts   # Form validation
│   └── product.ts      # Product-related utilities
├── constants/          # App-wide constants
│   └── index.ts
├── App.tsx             # Main app component
└── main.tsx            # App entry point
```

## Key Concepts

### Context Providers

The app uses React Context for global state management:

1. **AuthContext**: Manages user authentication state
   - Sign up, sign in, sign out
   - User session tracking

2. **CartContext**: Manages shopping cart
   - Add/remove items
   - Update quantities
   - Calculate totals

3. **WishlistContext**: Manages user wishlist
   - Toggle items in/out
   - Track saved products
   - **Important**: Uses numeric IDs, convert string IDs with `parseInt()`

4. **ToastContext**: Shows toast notifications
   - Success, error, and wishlist messages
   - Auto-dismiss functionality

### Type Conversion: Product IDs

**Important for Junior Developers**: Product IDs in the database are stored as strings, but the WishlistContext uses numbers. Always convert when working with wishlists:

```tsx
// Correct usage
const productIdNumber = parseInt(product.id)
const isInWishlist = wishlist.has(productIdNumber)

// When toggling wishlist
const productForWishlist = {
  id: parseInt(product.id),
  name: product.name,
  color: product.color,
  price: product.price,
  image: product.image_url || '',
}
toggleWishlist(productForWishlist)
```

### Database Queries

All database operations use Supabase. Key patterns:

```typescript
// Fetching a single row (might not exist)
const { data, error } = await supabase
  .from('products')
  .select('*')
  .eq('id', productId)
  .maybeSingle()  // Use maybeSingle() for 0 or 1 rows

// Fetching multiple rows
const { data, error } = await supabase
  .from('products')
  .select('*')
  .order('created_at', { ascending: false })
```

### Component Organization

Components are organized by feature/purpose:

- **components/ui**: Generic, reusable UI components (buttons, modals, panels)
- **components/layout**: App layout components (header, footer)
- **components/sections**: Home page sections
- **components/products**: Product-specific components
- **components/account**: Account page components
- **components/auth**: Authentication forms

### Styling Guidelines

We use Tailwind CSS for styling. Follow these conventions:

1. Use utility classes directly in components
2. Maintain consistent spacing (use spacing system: 1, 2, 4, 6, 8, 12, 16, etc.)
3. Keep hover states for interactive elements
4. Use transitions for smooth animations (duration-200, duration-300)

### Common Patterns

#### Toast Notifications

```tsx
import { useToast } from '../context/ToastContext'

const { showToast } = useToast()

// Success
showToast('Item added to cart', 'success')

// Error
showToast('Something went wrong', 'error')

// Wishlist
showToast('Added to wishlist', 'wishlist')
```

#### Form Validation

```tsx
import { isValidEmail, isRequired } from '../utils/validation'

if (!isRequired(email)) {
  showToast('Email is required', 'error')
  return
}

if (!isValidEmail(email)) {
  showToast('Invalid email format', 'error')
  return
}
```

#### Currency Formatting

```tsx
import { formatCurrency } from '../utils/format'

const price = formatCurrency(99.99) // "$99.99"
```

## Development Workflow

### Setup

```bash
npm install
npm run dev
```

### Type Checking

```bash
npm run typecheck
```

### Building for Production

```bash
npm run build
```

### Linting

```bash
npm run lint
```

## Database Schema

The database includes the following main tables:

- **products**: Product catalog
- **categories**: Product categories
- **users**: User profiles (managed by Supabase Auth)

All tables have Row Level Security (RLS) enabled for data protection.

## Environment Variables

Required environment variables (already configured):

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Common Tasks

### Adding a New Page

1. Create component in `src/pages/`
2. Add route in `src/App.tsx`
3. Update navigation if needed in `src/components/layout/Header.tsx`

### Adding a New Component

1. Create component file in appropriate subdirectory
2. Export component as named export
3. Add JSDoc comments for documentation
4. Use TypeScript interfaces for props

### Working with Forms

1. Use controlled components (state for form values)
2. Validate inputs using utilities from `utils/validation.ts`
3. Show errors with toast notifications
4. Handle loading states for async operations

### Adding New Database Tables

1. Create migration file in `supabase/migrations/`
2. Include comprehensive comments explaining changes
3. Always enable RLS on new tables
4. Add appropriate security policies

## Best Practices

1. **Always use TypeScript**: Define types for all props and data structures
2. **Handle errors**: Always check for errors in async operations
3. **Show feedback**: Use toasts for user feedback on actions
4. **Check auth state**: Protect routes that require authentication
5. **Clean code**: Keep functions small and focused
6. **Comment complex logic**: Add comments for non-obvious code
7. **Use utilities**: Leverage utility functions instead of duplicating code
8. **Consistent naming**: Use camelCase for variables, PascalCase for components

## Troubleshooting

### Build Errors

- Run `npm run typecheck` to identify TypeScript errors
- Check for missing imports
- Ensure all environment variables are set

### Database Issues

- Check Supabase dashboard for table structure
- Verify RLS policies are correct
- Check network tab for API errors

### State Not Updating

- Ensure you're using the context hooks correctly
- Check that providers wrap your components in the tree
- Verify state updates are immutable

## Getting Help

- Check the component's JSDoc comments for usage examples
- Review existing similar components for patterns
- Check Supabase documentation for database queries
- Review React documentation for hooks and patterns

## Code Review Checklist

Before submitting code:

- [ ] TypeScript has no errors (`npm run typecheck`)
- [ ] Code follows existing patterns
- [ ] Components have proper TypeScript types
- [ ] Error cases are handled
- [ ] User feedback is provided (toasts)
- [ ] No console errors in browser
- [ ] Code is properly formatted
- [ ] Comments explain complex logic
- [ ] No unused imports or variables

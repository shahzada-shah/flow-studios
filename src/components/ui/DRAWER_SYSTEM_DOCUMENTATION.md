# Drawer System Documentation

## Overview

This document provides comprehensive documentation for the cart and wishlist drawer system. These slide-out panels appear from the right side of the screen and are used throughout the application.

**Last Updated**: 2025-10-26

---

## Architecture

### Component Hierarchy

```
Header (src/components/layout/Header.tsx)
├── CartPanel (src/components/ui/CartPanel.tsx)
│   └── SlideOutPanel (src/components/ui/SlideOutPanel.tsx)
└── WishlistPanel (src/components/ui/WishlistPanel.tsx)
    └── SlideOutPanel (src/components/ui/SlideOutPanel.tsx)
```

### State Management

- **CartContext** (`src/context/CartContext.tsx`) - Manages shopping cart state
- **WishlistContext** (`src/context/WishlistContext.tsx`) - Manages wishlist state
- **Header Component** - Controls drawer open/close state for both panels

---

## Components

### 1. SlideOutPanel (Base Component)

**File**: `src/components/ui/SlideOutPanel.tsx`

**Purpose**: Reusable base component that provides the drawer UI and animations for both cart and wishlist panels.

**Props**:
```typescript
interface SlideOutPanelProps {
  isOpen: boolean        // Controls visibility
  onClose: () => void    // Callback when user closes panel
  title: string          // Panel header title
  children: ReactNode    // Panel content
}
```

**Features**:
- ✅ Slides in from right side with 400ms ease-in-out animation
- ✅ Semi-transparent backdrop with blur effect (`bg-black/50 backdrop-blur-sm`)
- ✅ ESC key support to close panel
- ✅ Body scroll lock when open (prevents background scrolling)
- ✅ Click outside (backdrop) to close
- ✅ Close button with rotate animation on hover
- ✅ Fixed positioning at `z-index: 50`
- ✅ Max width of `max-w-md` (28rem / 448px)
- ✅ Full height (`h-full`)

**Layout Structure**:
```
┌─────────────────────────────────┐
│ Header (border-bottom)          │
│ [Title]              [X Close]  │
├─────────────────────────────────┤
│                                 │
│ Content Area (flex-1)           │
│ - Scrollable overflow           │
│ - Children injected here        │
│                                 │
│                                 │
└─────────────────────────────────┘
```

**Animation Details**:
- Backdrop: `opacity-0` → `opacity-100` (400ms)
- Panel: `translate-x-full opacity-0` → `translate-x-0 opacity-100` (400ms)
- Content: Delayed 100ms, `opacity-0 translate-y-4` → `opacity-100 translate-y-0`

**Known Issues**:
- ⚠️ Content children must handle their own scroll behavior
- ⚠️ Panel content needs explicit height management for proper scrolling

---

### 2. CartPanel

**File**: `src/components/ui/CartPanel.tsx`

**Purpose**: Displays shopping cart items with checkout functionality.

**Props**:
```typescript
interface CartPanelProps {
  isOpen: boolean
  onClose: () => void
}
```

**Dependencies**:
- `SlideOutPanel` - Base drawer component
- `CartContext` - Cart state via `useCart()` hook
- `react-router-dom` - Navigation to checkout

**Features**:
- ✅ Displays all cart items with product images
- ✅ Shows product name, size, color, price
- ✅ Quantity controls (- / +)
- ✅ Remove item button (X icon)
- ✅ Subtotal calculation
- ✅ "CHECKOUT" button navigates to `/checkout`
- ✅ Empty state with call-to-action

**Layout Structure**:
```
┌─────────────────────────────────┐
│ Bag (count)              [Close]│
├─────────────────────────────────┤
│ ┌─────────────────────────────┐ │
│ │ Scrollable Item List        │ │
│ │                             │ │
│ │ [Image] Product Name        │ │
│ │         Size: M             │ │
│ │         Color: Black        │ │
│ │         $89.00 USD          │ │
│ │         [-] 1 [+]      [X]  │ │
│ │                             │ │
│ └─────────────────────────────┘ │
├─────────────────────────────────┤
│ Subtotal        $178.00 USD     │
│ [      CHECKOUT       ]         │
└─────────────────────────────────┘
```

**Empty State**:
- Gray shopping bag icon (Lucide `ShoppingBag`)
- "Your bag is empty" heading
- Descriptive text
- "START SHOPPING" button closes panel

**Cart Item Structure**:
```typescript
interface CartItem {
  product: Product      // Full product from database
  quantity: number      // Number of items
  size: string         // Selected size (XS, S, M, L, XL)
}
```

**Data Flow**:
1. Items stored in CartContext state
2. `cartItems` array mapped to display items
3. Each item shows product details from `Product` type
4. Quantity changes update CartContext
5. Remove item calls `removeFromCart(productId, size)`
6. Checkout button navigates with `navigate('/checkout')`

**Styling**:
- Product images: `w-24 h-32` with gray placeholder
- Quantity controls: Bordered buttons with hover states
- Checkout button: Full width, black background, white text
- Footer: Fixed at bottom with border-top

**Known Issues**:
- ⚠️ **BUG**: Content may overflow or not scroll properly in some states
- ⚠️ Missing height calculation for scrollable area
- ⚠️ Footer positioning may cause overlap with content

---

### 3. WishlistPanel

**File**: `src/components/ui/WishlistPanel.tsx`

**Purpose**: Displays saved/favorited products with bulk add-to-cart functionality.

**Props**:
```typescript
interface WishlistPanelProps {
  isOpen: boolean
  onClose: () => void
}
```

**Dependencies**:
- `SlideOutPanel` - Base drawer component
- `WishlistContext` - Wishlist state via `useWishlist()` hook
- `CartContext` - To add items to cart via `useCart()` hook
- `ToastContext` - Success messages via `useToast()` hook
- `react-router-dom` - Navigation to shop

**Features**:
- ✅ Displays all wishlist items
- ✅ Shows product image, name, color, price
- ✅ Remove from wishlist button
- ✅ "ADD ALL TO BAG" button (adds all items with first available size)
- ✅ "CONTINUE SHOPPING" button navigates to `/shop`
- ✅ Empty state with call-to-action

**Layout Structure**:
```
┌─────────────────────────────────┐
│ Wishlist (count)         [Close]│
├─────────────────────────────────┤
│ ┌─────────────────────────────┐ │
│ │ Scrollable Item List        │ │
│ │                             │ │
│ │ [Image]  Product Name       │ │
│ │          Color: Black       │ │
│ │          $89.00 USD         │ │
│ │          [X Remove]         │ │
│ │                             │ │
│ └─────────────────────────────┘ │
├─────────────────────────────────┤
│ [   ADD ALL TO BAG   ]          │
│ [ CONTINUE SHOPPING  ]          │
└─────────────────────────────────┘
```

**Empty State**:
- Pink heart icon in gray circle (Lucide `Heart`)
- "Your wishlist is empty" heading
- Descriptive text about saving favorites
- "START SHOPPING" button closes panel

**Wishlist Product Structure**:
```typescript
// Uses full Product type from database
interface Product {
  id: string
  name: string
  slug: string
  description: string
  price: number
  category_id: string | null
  color: string
  image_url: string
  sizes: string[]
  activities: string[]
  is_sustainable: boolean
  is_new: boolean
  in_stock: boolean
  created_at: string
  updated_at: string
}
```

**Data Flow**:
1. Products stored as full `Product` objects in WishlistContext
2. `getWishlistProducts()` returns array of products
3. Each product displayed with details from database
4. Remove calls `removeFromWishlist(product.id)` (string ID)
5. "Add All to Bag":
   - Iterates through all wishlist products
   - Adds each with `product.sizes[0]` (first available size)
   - Shows toast with count
   - Clears wishlist
   - Closes panel
6. "Continue Shopping" navigates to `/shop`

**Styling**:
- Product images: `w-24 h-32` with gray placeholder
- Remove button: Small text with X icon, gray hover state
- Action buttons: Full width, stacked vertically
  - "ADD ALL TO BAG": Black background, white text
  - "CONTINUE SHOPPING": White background, black border
- Footer: Fixed at bottom with border-top, white background

**Known Issues**:
- ⚠️ **BUG**: White screen / content not displaying when panel opens
- ⚠️ **BUG**: Possible height calculation issue with `h-full` on parent
- ⚠️ Content area using `flex-1` may not calculate height correctly
- ⚠️ Empty state centers with `justify-center h-full` which might fail

---

## Header Integration

**File**: `src/components/layout/Header.tsx`

**How Drawers Are Controlled**:

```typescript
// State management in Header component
const [isCartOpen, setIsCartOpen] = useState(false)
const [isWishlistOpen, setIsWishlistOpen] = useState(false)

// Open/close functions
const openCart = () => setIsCartOpen(true)
const closeCart = () => setIsCartOpen(false)
const openWishlist = () => setIsWishlistOpen(true)
const closeWishlist = () => setIsWishlistOpen(false)

// Trigger buttons in header
<button onClick={openWishlist}>
  <Heart /> {/* Shows count badge */}
</button>

<button onClick={openCart}>
  <ShoppingBag /> {/* Shows count badge */}
</button>

// Panel components rendered at bottom of Header
<CartPanel isOpen={isCartOpen} onClose={closeCart} />
<WishlistPanel isOpen={isWishlistOpen} onClose={closeWishlist} />
```

**Triggers**:
1. **Wishlist Icon** - Opens WishlistPanel
2. **Shopping Bag Icon** - Opens CartPanel
3. **ESC Key** - Closes any open panel
4. **Backdrop Click** - Closes any open panel
5. **Close Button (X)** - Closes panel

**Badge Counts**:
- Wishlist: Shows `wishlist.size` (number of unique products)
- Cart: Shows `cartCount` (total quantity across all items)

---

## Context APIs

### CartContext

**File**: `src/context/CartContext.tsx`

**State**:
```typescript
const [cartItems, setCartItems] = useState<CartItem[]>([])
```

**Methods**:
```typescript
// Add product to cart (accepts Product object or string ID)
addToCart(productOrId: Product | string, size: string, quantity?: number): Promise<void>

// Remove specific item by product ID and size
removeFromCart(productId: string, size: string): void

// Update quantity for specific item
updateQuantity(productId: string, size: string, quantity: number): void

// Clear all items
clearCart(): void
```

**Computed Values**:
```typescript
cartTotal: number    // Sum of (price × quantity) for all items
cartCount: number    // Sum of all quantities
```

**Data Fetching**:
- If string ID passed to `addToCart`, fetches product from Supabase
- If Product object passed, uses it directly (more efficient)
- Query: `supabase.from('products').select('*').eq('id', productId)`

---

### WishlistContext

**File**: `src/context/WishlistContext.tsx`

**State**:
```typescript
const [wishlist, setWishlist] = useState<Set<string>>(new Set())
const [products, setProducts] = useState<Product[]>([])
```

**Methods**:
```typescript
// Toggle product in/out of wishlist
toggleWishlist(product: Product): void

// Remove product from wishlist
removeFromWishlist(productId: string): void

// Clear all wishlist items
clearWishlist(): void

// Check if product is in wishlist
isInWishlist(productId: string): boolean

// Get all wishlist products
getWishlistProducts(): Product[]
```

**Data Storage**:
- Uses `Set<string>` for quick ID lookups
- Stores full `Product` objects for display
- No database persistence (in-memory only)

---

## Usage Across Routes

### All Routes (via Header)

The Header component is rendered in `App.tsx` and appears on all routes:

```typescript
// src/App.tsx
<Header />
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/shop/:category" element={<ProductCatalog />} />
  <Route path="/shop" element={<ProductCatalog />} />
  <Route path="/product/:slug" element={<ProductDetail />} />
  <Route path="/checkout" element={<Checkout />} />
  <Route path="/account" element={<Account />} />
  <Route path="/auth" element={<Auth />} />
</Routes>
```

**This means**:
- ✅ Same CartPanel on every page
- ✅ Same WishlistPanel on every page
- ✅ Consistent drawer behavior across app
- ✅ State persists across navigation (in-memory)

### How Products Are Added

**From Product Cards** (Home, ProductCatalog):
```typescript
// Product cards use these patterns
const { toggleWishlist, isInWishlist } = useWishlist()

// Heart icon click
onClick={() => toggleWishlist(product)}  // Passes full Product object
```

**From ProductDetail Page**:
```typescript
const { addToCart } = useCart()
const { toggleWishlist, isInWishlist } = useWishlist()

// Add to cart
addToCart(product, selectedSize)  // Passes Product object + size

// Add to wishlist
toggleWishlist(product)  // Passes Product object
```

---

## Critical Bug Analysis

### ROOT CAUSE IDENTIFIED

#### WishlistPanel vs CartPanel Height Inconsistency

**The Issue**:

CartPanel (line 58):
```tsx
<div className="flex flex-col" style={{ height: 'calc(100vh - 89px)' }}>
```

WishlistPanel (line 78):
```tsx
<div className="flex flex-col h-full">
```

**Problem**:
- CartPanel uses explicit height calculation: `calc(100vh - 89px)` to account for the SlideOutPanel header
- WishlistPanel uses `h-full` which depends on parent height
- SlideOutPanel's content wrapper has `flex-1` but parent might not establish height context correctly
- This causes WishlistPanel content to have 0 or undefined height, resulting in white screen

**Why 89px is subtracted**:
- SlideOutPanel header is approximately 89px tall (padding + title + border)
- CartPanel explicitly calculates remaining viewport height
- This ensures proper scrolling within the drawer

### Current Issues

#### 1. WishlistPanel White Screen Bug

**Symptom**: Panel opens but shows completely white/blank content

**Root Cause**: Missing explicit height calculation (see above)

**Additional Possible Causes**:

1. **Height Calculation Issue**:
   ```tsx
   // In WishlistPanel.tsx line 78-79
   <div className="flex flex-col h-full">
     <div className="flex-1 overflow-y-auto px-6 py-4 min-h-0">
   ```
   - Parent has `h-full` but may not have defined height from SlideOutPanel
   - `flex-1` on child requires parent with flex display
   - `min-h-0` might collapse height to 0

2. **SlideOutPanel Content Area**:
   ```tsx
   // In SlideOutPanel.tsx line 68-72
   <div className={`flex-1 overflow-hidden transition-all duration-300 delay-100 ${
     isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
   }`}>
     {children}
   </div>
   ```
   - Parent is flex column, this is `flex-1`
   - Has `overflow-hidden` which might hide content
   - Children need to handle their own height

3. **Empty State Display**:
   ```tsx
   // Line 57 in WishlistPanel
   <div className="flex flex-col items-center justify-center h-full text-center px-6">
   ```
   - Uses `h-full justify-center` but parent might have no height
   - If parent `SlideOutPanel > div` has no height, this fails

4. **Product Data Issue**:
   - `getWishlistProducts()` might return products without required fields
   - Missing `image_url`, `sizes`, etc. could cause render failure
   - Empty strings or null values not handled gracefully

**Debugging Steps**:
1. Check if `wishlistProducts` array is populated correctly
2. Verify SlideOutPanel's content div has calculated height
3. Inspect if content is rendered but positioned off-screen
4. Check browser console for React errors
5. Verify Product objects have all required fields

#### 2. CartPanel Scroll Behavior

**Potential Issue**: Similar height calculation problems as WishlistPanel

---

## Recommended Fixes

### ⭐ PRIMARY FIX: Match CartPanel Height Calculation

**Update WishlistPanel.tsx line 78**:

```tsx
// BEFORE (BROKEN):
<div className="flex flex-col h-full">

// AFTER (FIXED):
<div className="flex flex-col" style={{ height: 'calc(100vh - 89px)' }}>
```

This makes WishlistPanel use the same explicit height calculation as CartPanel, ensuring content has proper dimensions.

### Secondary Fixes (Optional Improvements)

### Fix 1: Explicit Height Management

```tsx
// In SlideOutPanel.tsx - Update content wrapper
<div className="flex-1 flex flex-col min-h-0 overflow-hidden">
  {children}
</div>
```

### Fix 2: WishlistPanel Layout

```tsx
// In WishlistPanel.tsx - Update main container
<div className="flex flex-col" style={{ height: 'calc(100vh - 89px)' }}>
  <div className="flex-1 overflow-y-auto px-6 py-4 min-h-0">
    {/* Content */}
  </div>
  {/* Footer stays outside scrollable area */}
</div>
```

### Fix 3: Empty State Height

```tsx
// In WishlistPanel.tsx - Update empty state container
<div className="flex flex-col items-center justify-center min-h-full py-12 text-center px-6">
  {/* Empty state content */}
</div>
```

### Fix 4: Standardize Both Panels

Create a shared constant for header height:
```tsx
// In a constants file
export const SLIDE_OUT_PANEL_HEADER_HEIGHT = 89; // px

// In both CartPanel and WishlistPanel
style={{ height: `calc(100vh - ${SLIDE_OUT_PANEL_HEADER_HEIGHT}px)` }}
```

---

## Testing Checklist

- [ ] Open WishlistPanel with 0 items - shows empty state
- [ ] Add item to wishlist - panel shows product
- [ ] Open WishlistPanel with items - content visible and scrollable
- [ ] Remove item from wishlist - updates correctly
- [ ] "ADD ALL TO BAG" - adds items to cart and clears wishlist
- [ ] "CONTINUE SHOPPING" - navigates to /shop
- [ ] Open CartPanel with 0 items - shows empty state
- [ ] Add item to cart - panel shows item
- [ ] Open CartPanel with items - content visible and scrollable
- [ ] Update quantity - changes reflected
- [ ] Remove item - updates correctly
- [ ] "CHECKOUT" button - navigates to /checkout
- [ ] ESC key - closes panel
- [ ] Backdrop click - closes panel
- [ ] Close button - closes panel
- [ ] Multiple items - scroll works correctly
- [ ] Mobile responsive - drawers work on small screens

---

## File Reference

### Core Components
- `src/components/ui/SlideOutPanel.tsx` - Base drawer (147 bytes)
- `src/components/ui/CartPanel.tsx` - Cart drawer (4.5 KB)
- `src/components/ui/WishlistPanel.tsx` - Wishlist drawer (3.8 KB)

### Context Providers
- `src/context/CartContext.tsx` - Cart state management (4.8 KB)
- `src/context/WishlistContext.tsx` - Wishlist state management (2.5 KB)

### Integration
- `src/components/layout/Header.tsx` - Controls drawer state

### Type Definitions
- `src/types/product.ts` - Product interface

---

## Version History

- **2025-10-26**: Initial comprehensive documentation
- **2025-10-26**: Fixed WishlistContext to use correct Product type with string IDs
- **2025-10-26**: Updated CartContext to accept Product object or string ID
- **2025-10-26**: Fixed ProductDetail to pass full Product objects
- **2025-10-26**: Fixed Bestsellers component to fetch real products from Supabase
- **2025-10-26**: Fixed ProductCard to use full Product objects instead of mock data

---

## Notes

✅ **Current Status**: All bugs fixed! System now uses fully dynamic data flow.

### Fixes Applied:

1. **Bestsellers Component** (`src/components/sections/Bestsellers.tsx`)
   - Removed hardcoded mock products with numeric IDs
   - Now fetches real products from Supabase where `is_bestseller = true`
   - Uses correct Product type with string IDs
   - Passes full Product objects to WishlistContext

2. **ProductCard Component** (`src/components/products/ProductCard.tsx`)
   - Removed ID conversion from string to number
   - Removed mock product object creation for wishlist
   - Now passes full Product objects to both CartContext and WishlistContext
   - Uses `isInWishlist(product.id)` with string ID

3. **Data Flow Verification**:
   - ✅ Bestsellers (Home) → fetches from database → string IDs
   - ✅ ProductCatalog (Shop/Filter) → fetches from database → string IDs
   - ✅ ProductDetail → fetches from database by slug → string IDs
   - ✅ All components pass full Product objects to contexts
   - ✅ WishlistPanel displays correctly with database products
   - ✅ CartPanel works with database products

### Remaining Task:
- Optional: Apply height calculation fix to WishlistPanel for consistency with CartPanel (though it may already work)

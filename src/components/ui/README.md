# UI Components Documentation

## Drawer/Panel Architecture

This application uses a well-organized drawer system built on a reusable base component with specialized implementations for different use cases.

### Architecture Overview

```
SlideOutPanel (Base Component)
├── CartPanel
├── WishlistPanel
└── (Future panels can extend this base)

Separate Implementations:
├── MobileMenu (slides from left)
└── SearchModal (full-screen modal)
```

### Component Hierarchy

#### 1. SlideOutPanel (Base Component)
**File:** `SlideOutPanel.tsx`
**Purpose:** Reusable foundation for right-sliding drawer panels
**Direction:** Slides from RIGHT
**Z-Index:** 50

**Features:**
- Smooth 400ms ease-in-out transitions
- Backdrop with blur effect
- ESC key to close
- Body scroll lock when open
- Consistent header with close button
- Flexible content area

**Usage Pattern:**
```tsx
<SlideOutPanel isOpen={isOpen} onClose={onClose} title="Panel Title">
  {/* Your content here */}
</SlideOutPanel>
```

**Props:**
- `isOpen: boolean` - Controls visibility
- `onClose: () => void` - Close handler
- `title: string` - Panel header title
- `children: React.ReactNode` - Content to display

---

#### 2. CartPanel
**File:** `CartPanel.tsx`
**Purpose:** Shopping bag with cart items and checkout
**Extends:** SlideOutPanel
**Direction:** Slides from RIGHT

**Features:**
- Displays cart items with images
- Quantity adjustment controls
- Remove item functionality
- Subtotal calculation
- Checkout navigation
- Empty state with call-to-action

**State Management:**
- Uses `CartContext` for cart data
- Uses `useNavigate` for checkout routing
- Automatically closes on checkout

**Layout:**
- Fixed height calculation: `calc(100vh - 89px)`
- Scrollable content area
- Fixed footer with subtotal and actions

---

#### 3. WishlistPanel
**File:** `WishlistPanel.tsx`
**Purpose:** Saved/favorited items display
**Extends:** SlideOutPanel
**Direction:** Slides from RIGHT

**Features:**
- Grid of wishlist items
- Remove from wishlist
- Empty state with call-to-action
- Product details preview

**State Management:**
- Uses `WishlistContext` for wishlist data
- Real-time updates when items added/removed

**Layout:**
- Fixed height calculation: `calc(100vh - 89px)`
- Scrollable content area
- Fixed footer with actions

---

#### 4. MobileMenu
**File:** `MobileMenu.tsx`
**Purpose:** Mobile navigation menu
**Direction:** Slides from LEFT (opposite of SlideOutPanel)
**Z-Index:** 50
**Visibility:** Hidden on `lg` breakpoint and above

**Features:**
- Navigation items with expandable submenus
- Smooth 400ms transitions
- Backdrop with blur
- Body scroll lock
- Sign-in call-to-action

**State Management:**
- Receives navigation data as props
- Independent from SlideOutPanel base

**Why Separate from SlideOutPanel:**
- Different slide direction (left vs right)
- Different responsive behavior (mobile only)
- Unique navigation-specific structure

---

#### 5. SearchModal
**File:** `SearchModal.tsx`
**Purpose:** Full-screen search interface
**Type:** Modal (not a slide-out panel)
**Z-Index:** 50

**Features:**
- Full-screen overlay
- Centered search box with slide-down animation
- Auto-focus on input
- ESC key handling
- Popular search suggestions
- Smooth exit animations

**State Management:**
- Internal state for closing animation
- Controlled render timing
- Body scroll lock

**Why Separate from SlideOutPanel:**
- Full-screen modal, not a side panel
- Different animation pattern (slide-down vs slide-in)
- Centered content vs edge-aligned

---

### State Management Pattern

All panels use the **useToggle** custom hook for consistent state management:

```tsx
// In Header.tsx
const [isCartOpen, , openCart, closeCart] = useToggle(false)
const [isWishlistOpen, , openWishlist, closeWishlist] = useToggle(false)
const [isMobileMenuOpen, , openMobileMenu, closeMobileMenu] = useToggle(false)
const [isSearchOpen, , openSearch, closeSearch] = useToggle(false)
```

**useToggle Hook Returns:**
1. `value: boolean` - Current state
2. `toggle: () => void` - Toggle function (unused in this app)
3. `setTrue: () => void` - Open function
4. `setFalse: () => void` - Close function

**Benefits:**
- Consistent API across all panels
- No prop drilling required
- Clear intent (openCart vs closeCart)
- Memoized callbacks for performance

---

### Z-Index Management

All overlays use **z-50** to ensure they appear above main content:
- Header: `z-40` (sticky)
- All panels/modals: `z-50` (overlays)

**No Conflicts:** All panels can only be opened one at a time through the Header component, preventing stacking issues.

---

### Animation Consistency

All panels share consistent animation patterns:

**Timing:** 400ms ease-in-out
**Backdrop:**
- Fade in/out
- `bg-black/50 backdrop-blur-sm`

**Content:**
- SlideOutPanel: `translate-x-0` → `translate-x-full` (right)
- MobileMenu: `-translate-x-full` → `translate-x-0` (left)
- SearchModal: `translate-y-0` → `-translate-y-8` (down)

**Stagger Effect:** Content inside panels fades in 100ms after panel opens for polished UX

---

### Accessibility Features

All panels implement:
- ✅ ESC key to close
- ✅ Click backdrop to close
- ✅ ARIA labels on buttons
- ✅ Body scroll lock to prevent background scrolling
- ✅ Focus management (SearchModal auto-focuses input)
- ✅ Keyboard navigation support

---

### Body Scroll Lock Pattern

All overlays lock body scroll when open to prevent background scrolling:

```tsx
useEffect(() => {
  if (isOpen) {
    document.body.style.overflow = 'hidden'
  }

  return () => {
    document.body.style.overflow = 'unset'
  }
}, [isOpen])
```

**Important:** Cleanup function ensures scroll is restored even if component unmounts unexpectedly.

---

### Adding New Panels

To add a new right-sliding panel:

1. **Extend SlideOutPanel:**
```tsx
import { SlideOutPanel } from './SlideOutPanel'

export const NewPanel = ({ isOpen, onClose }: NewPanelProps) => {
  return (
    <SlideOutPanel isOpen={isOpen} onClose={onClose} title="New Panel">
      {/* Your content */}
    </SlideOutPanel>
  )
}
```

2. **Add state to Header:**
```tsx
const [isNewPanelOpen, , openNewPanel, closeNewPanel] = useToggle(false)
```

3. **Add trigger button:**
```tsx
<button onClick={openNewPanel}>Open New Panel</button>
```

4. **Render panel:**
```tsx
<NewPanel isOpen={isNewPanelOpen} onClose={closeNewPanel} />
```

---

### Testing Checklist

When modifying or adding panels, verify:
- [ ] Panel opens/closes smoothly
- [ ] ESC key closes panel
- [ ] Backdrop click closes panel
- [ ] Body scroll is locked when open
- [ ] Body scroll is restored when closed
- [ ] No z-index conflicts with other UI elements
- [ ] Animations are smooth (no janky transitions)
- [ ] Content is accessible (keyboard navigation works)
- [ ] Mobile responsive (works on all screen sizes)

---

### Common Issues & Solutions

**Issue:** Panel content not scrolling
**Solution:** Ensure content wrapper has `overflow-y-auto` and `min-h-0`

**Issue:** Multiple panels opening at once
**Solution:** Each panel should have independent state; only one should be opened via user action at a time

**Issue:** Body scroll not restored
**Solution:** Check useEffect cleanup function is properly resetting `overflow: unset`

**Issue:** Animation feels slow
**Solution:** Verify transition duration is 400ms or adjust if needed. Consider using `transition-transform` for better performance

---

### Performance Considerations

- All callbacks use `useCallback` to prevent unnecessary re-renders
- Backdrop uses `pointer-events-none` when closed to prevent click capture
- Panels conditionally render content only when needed
- Transform animations (translate) are GPU-accelerated
- Body scroll lock only when panel is open

---

### File Organization

```
src/components/ui/
├── SlideOutPanel.tsx      # Base reusable panel component
├── CartPanel.tsx          # Shopping cart implementation
├── WishlistPanel.tsx      # Wishlist implementation
├── MobileMenu.tsx         # Mobile navigation (separate pattern)
├── SearchModal.tsx        # Search modal (separate pattern)
└── README.md              # This documentation file
```

**Principle:** Each file has a single responsibility and clear purpose. Related functionality is grouped together.

# Drawer/Panel Architecture Diagram

## Component Structure

```
┌─────────────────────────────────────────────────────────────────────┐
│                           Header Component                          │
│                                                                     │
│  State Management (useToggle hook):                                │
│  ├── isSearchOpen     [openSearch, closeSearch]                    │
│  ├── isCartOpen       [openCart, closeCart]                        │
│  ├── isWishlistOpen   [openWishlist, closeWishlist]                │
│  └── isMobileMenuOpen [openMobileMenu, closeMobileMenu]            │
│                                                                     │
│  Trigger Buttons:                                                  │
│  [Search] [Account] [Wishlist] [Cart] [MobileMenu]                │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                    ┌───────────────┼───────────────┐
                    │               │               │               │
                    ▼               ▼               ▼               ▼
        ┌───────────────┐ ┌───────────────┐ ┌───────────────┐ ┌───────────────┐
        │ SearchModal   │ │  CartPanel    │ │WishlistPanel  │ │  MobileMenu   │
        │               │ │               │ │               │ │               │
        │ Full Screen   │ │  Right Slide  │ │  Right Slide  │ │  Left Slide   │
        │  Z-index: 50  │ │  Z-index: 50  │ │  Z-index: 50  │ │  Z-index: 50  │
        └───────────────┘ └───────┬───────┘ └───────┬───────┘ └───────────────┘
                                  │                 │
                                  └────────┬────────┘
                                           │
                                           ▼
                                  ┌────────────────┐
                                  │ SlideOutPanel  │
                                  │  Base Component│
                                  │                │
                                  │ Provides:      │
                                  │ - Backdrop     │
                                  │ - Animations   │
                                  │ - ESC handler  │
                                  │ - Scroll lock  │
                                  │ - Header UI    │
                                  └────────────────┘
```

## Panel Flow Diagram

```
User Action
    │
    ▼
┌─────────────────┐
│ Click Trigger   │  (Search, Cart, Wishlist, Menu buttons)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ useToggle Hook  │  Sets state to TRUE
│ (openXXX)       │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Panel Component │  Receives isOpen={true}
│ Renders         │
└────────┬────────┘
         │
         ├──────────────────────┬──────────────────────┐
         ▼                      ▼                      ▼
┌─────────────────┐    ┌─────────────────┐   ┌─────────────────┐
│ Body Scroll     │    │ Backdrop Fades  │   │ Panel Slides    │
│ Lock            │    │ In (400ms)      │   │ In (400ms)      │
└─────────────────┘    └─────────────────┘   └─────────────────┘
         │                      │                      │
         └──────────────────────┴──────────────────────┘
                                │
                                ▼
                    ┌─────────────────────┐
                    │ Content Stagger     │
                    │ Fade In (100ms      │
                    │ delay)              │
                    └─────────────────────┘
```

## Closing Flow

```
Close Action (ESC / Backdrop Click / Close Button)
    │
    ▼
┌─────────────────┐
│ onClose()       │
│ Callback        │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ useToggle Hook  │  Sets state to FALSE
│ (closeXXX)      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Panel Component │  Receives isOpen={false}
│ Animates Out    │
└────────┬────────┘
         │
         ├──────────────────────┬──────────────────────┐
         ▼                      ▼                      ▼
┌─────────────────┐    ┌─────────────────┐   ┌─────────────────┐
│ Body Scroll     │    │ Backdrop Fades  │   │ Panel Slides    │
│ Unlock          │    │ Out (400ms)     │   │ Out (400ms)     │
└─────────────────┘    └─────────────────┘   └─────────────────┘
         │                      │                      │
         └──────────────────────┴──────────────────────┘
                                │
                                ▼
                    ┌─────────────────────┐
                    │ Cleanup Complete    │
                    └─────────────────────┘
```

## Z-Index Hierarchy

```
Z-Index: 50  ┌──────────────────────────────────────────┐
             │  Overlays (Panels & Modals)              │
             │  - SearchModal                           │
             │  - CartPanel                             │
             │  - WishlistPanel                         │
             │  - MobileMenu                            │
             └──────────────────────────────────────────┘

Z-Index: 40  ┌──────────────────────────────────────────┐
             │  Header (Sticky)                         │
             └──────────────────────────────────────────┘

Z-Index: 0   ┌──────────────────────────────────────────┐
             │  Main Content                            │
             │  - Home, Product pages, etc.             │
             └──────────────────────────────────────────┘
```

## State Isolation

Each panel maintains independent state in the Header component:

```typescript
// No shared state between panels
const [isSearchOpen, , openSearch, closeSearch] = useToggle(false)
const [isCartOpen, , openCart, closeCart] = useToggle(false)
const [isWishlistOpen, , openWishlist, closeWishlist] = useToggle(false)
const [isMobileMenuOpen, , openMobileMenu, closeMobileMenu] = useToggle(false)

// Each panel controlled independently:
<SearchModal isOpen={isSearchOpen} onClose={closeSearch} />
<CartPanel isOpen={isCartOpen} onClose={closeCart} />
<WishlistPanel isOpen={isWishlistOpen} onClose={closeWishlist} />
<MobileMenu isOpen={isMobileMenuOpen} onClose={closeMobileMenu} />
```

**Key Points:**
- No panel state affects another panel
- User can only open one at a time through UI
- No conflicts even with same z-index (50)
- Clean separation of concerns

## Animation Timeline

```
Time (ms)  Panel Action                Backdrop Action         Content Action
─────────────────────────────────────────────────────────────────────────────
    0      Start slide animation      Start fade in           Hidden
  100      25% visible                25% opacity             Start fade in
  200      50% visible                50% opacity             50% opacity
  300      75% visible                75% opacity             75% opacity
  400      Fully visible (complete)   Fully visible           Fully visible
```

## Responsive Behavior

```
Mobile (<768px)           Tablet (768px-1024px)      Desktop (>1024px)
─────────────────────────────────────────────────────────────────────────

MobileMenu: Visible       MobileMenu: Visible        MobileMenu: Hidden
SearchModal: Full width   SearchModal: max-w-2xl     SearchModal: max-w-2xl
CartPanel: Full width     CartPanel: max-w-md        CartPanel: max-w-md
WishlistPanel: Full width WishlistPanel: max-w-md    WishlistPanel: max-w-md

Header Menu Button: ✓     Header Menu Button: ✓      Header Dropdown: ✓
```

## Event Handlers Matrix

| Event          | SearchModal | CartPanel | WishlistPanel | MobileMenu |
|----------------|-------------|-----------|---------------|------------|
| ESC Key        | ✓           | ✓         | ✓             | ✗          |
| Backdrop Click | ✓           | ✓         | ✓             | ✓          |
| Close Button   | ✓           | ✓         | ✓             | ✓          |
| Body Scroll    | Locked      | Locked    | Locked        | Locked     |

Note: MobileMenu doesn't handle ESC key in current implementation (could be added if needed)

## Data Flow

```
Context Providers (App Level)
├── AuthContext
├── CartContext
├── WishlistContext
└── ToastContext

Header Component
└── Panel Components
    ├── CartPanel → CartContext
    │   └── Displays cart data
    │   └── Updates cart via context methods
    │
    └── WishlistPanel → WishlistContext
        └── Displays wishlist data
        └── Updates wishlist via context methods
```

## File Size Reference

```
SlideOutPanel.tsx   ~2.5 KB   Base component
CartPanel.tsx       ~4.5 KB   Extends SlideOutPanel
WishlistPanel.tsx   ~3.0 KB   Extends SlideOutPanel
MobileMenu.tsx      ~3.0 KB   Independent implementation
SearchModal.tsx     ~4.0 KB   Independent implementation
```

All files maintain manageable size for readability and maintenance.

# FLOW Studio - E-Commerce Platform

A modern, production-ready e-commerce platform for mindful activewear built with React, TypeScript, and Supabase. Designed for pilates and yoga enthusiasts seeking elegant, functional apparel.

## 🌟 Features

### Customer Experience
- **Product Catalog** - Advanced filtering, sorting, and search capabilities
- **User Authentication** - Secure sign up/sign in with Supabase Auth
- **Shopping Cart** - Persistent cart with real-time updates
- **Wishlist** - Save favorite items for later
- **User Account** - Profile management, order history, and saved addresses
- **Responsive Design** - Mobile-first, fully responsive across all devices
- **Newsletter Modal** - Timed popup with localStorage tracking
- **Smooth Animations** - Premium transitions and micro-interactions

### Technical Features
- **TypeScript** - Full type safety throughout the application
- **Supabase Backend** - PostgreSQL database with Row Level Security
- **Context API** - Global state management for auth, cart, and wishlist
- **Custom Hooks** - Reusable logic for common patterns
- **Modular Architecture** - Clean separation of concerns
- **Production Ready** - Optimized builds and error handling

## 🛠 Tech Stack

| Category | Technology |
|----------|-----------|
| **Frontend** | React 18, TypeScript |
| **Build Tool** | Vite |
| **Styling** | Tailwind CSS |
| **Backend** | Supabase (PostgreSQL) |
| **Authentication** | Supabase Auth |
| **Routing** | React Router v7 |
| **Icons** | Lucide React |

## 📁 Project Structure

```
src/
├── components/              # Reusable UI components
│   ├── account/            # Account management components
│   │   ├── AccountSidebar.tsx
│   │   ├── AddressesTab.tsx
│   │   ├── DetailsForm.tsx
│   │   ├── OrderCard.tsx
│   │   ├── OrdersList.tsx
│   │   └── WishlistTab.tsx
│   ├── auth/               # Authentication components
│   │   ├── AuthForm.tsx
│   │   └── AuthTabs.tsx
│   ├── layout/             # Layout components
│   │   ├── Header.tsx      # Main navigation
│   │   ├── Footer.tsx      # Site footer
│   │   └── Hero.tsx        # Homepage hero
│   ├── products/           # Product-related components
│   │   ├── FilterPanel.tsx
│   │   └── ProductCard.tsx
│   ├── sections/           # Homepage sections
│   │   ├── Bestsellers.tsx
│   │   ├── BlogSection.tsx
│   │   ├── BrandBanner.tsx
│   │   ├── MantraSection.tsx
│   │   ├── ShopByActivity.tsx
│   │   └── ValueProps.tsx
│   └── ui/                 # Generic UI components
│       ├── CartPanel.tsx
│       ├── Loader.tsx
│       ├── MobileMenu.tsx
│       ├── NavigationDropdown.tsx
│       ├── NewsletterModal.tsx
│       ├── SearchModal.tsx
│       ├── SlideOutPanel.tsx
│       ├── Toast.tsx
│       └── WishlistPanel.tsx
├── context/                # React Context providers
│   ├── AuthContext.tsx     # Authentication state
│   ├── CartContext.tsx     # Shopping cart state
│   ├── ToastContext.tsx    # Toast notifications
│   └── WishlistContext.tsx # Wishlist state
├── hooks/                  # Custom React hooks
│   ├── useToggle.ts        # Boolean state toggle
│   └── useClickOutside.ts  # Outside click detection
├── lib/                    # Third-party configurations
│   └── supabase.ts         # Supabase client
├── pages/                  # Page components
│   ├── Account.tsx         # User account dashboard
│   ├── Auth.tsx            # Authentication page
│   ├── Checkout.tsx        # Checkout flow
│   ├── Home.tsx            # Homepage
│   ├── ProductCatalog.tsx  # Product listing
│   └── ProductDetail.tsx   # Product details
├── types/                  # TypeScript definitions
│   ├── index.ts            # Global types
│   └── product.ts          # Product-related types
├── utils/                  # Utility functions
│   ├── format.ts           # Formatting helpers
│   ├── validation.ts       # Form validation
│   └── product.ts          # Product utilities
├── constants/              # Application constants
│   └── index.ts
├── App.tsx                 # Root component
└── main.tsx                # Application entry point
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ and npm
- **Supabase Account** - [Sign up for free](https://supabase.com)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd flow-studio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   The `.env` file is already configured with Supabase credentials. If you need to update them:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5173`

5. **Build for production**
   ```bash
   npm run build
   ```

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Check TypeScript types |

## 🏗 Architecture

### State Management

The application uses React Context API for global state:

#### AuthContext
Manages user authentication state and provides methods for sign up, sign in, and sign out.

```tsx
import { useAuth } from './context/AuthContext'

const { user, signIn, signOut, loading } = useAuth()
```

#### CartContext
Handles shopping cart operations including add, remove, update quantity, and total calculations.

```tsx
import { useCart } from './context/CartContext'

const { items, addToCart, removeFromCart, updateQuantity, cartCount, total } = useCart()
```

#### WishlistContext
Manages user's saved products with toggle functionality.

```tsx
import { useWishlist } from './context/WishlistContext'

const { wishlist, toggleWishlist } = useWishlist()
```

#### ToastContext
Displays toast notifications for user feedback.

```tsx
import { useToast } from './context/ToastContext'

const { showToast } = useToast()
showToast('Item added to cart', 'success')
```

### Custom Hooks

#### useToggle
Manages boolean state with convenient toggle, open, and close methods.

```tsx
const [isOpen, toggle, open, close] = useToggle(false)
```

#### useClickOutside
Detects clicks outside a referenced element.

```tsx
const ref = useClickOutside(() => {
  console.log('Clicked outside!')
})
```

## 🎨 Design System

### Colors
- **Primary**: Gray scale for elegant, minimal aesthetic
- **Backgrounds**: White and light gray
- **Text**: Dark gray (#111827) and medium gray (#6b7280)
- **Accents**: High contrast on hover states

### Typography
- **Headings**: Cormorant Garamond (serif)
- **Body**: Inter (sans-serif)
- **Tracking**: Wide letter-spacing for premium feel

### Spacing System
8px base grid system:
- `1` = 4px
- `2` = 8px
- `4` = 16px
- `6` = 24px
- `8` = 32px
- `12` = 48px

### Custom Animations
```css
animate-fadeIn      /* Fade in effect */
animate-fadeOut     /* Fade out effect */
animate-slideDown   /* Slide down from top */
animate-slideUp     /* Slide up from bottom */
animate-slideInRight /* Slide in from right */
animate-scaleIn     /* Scale and fade in */
```

## 🗄 Database

### Schema Overview

#### Products Table
Stores product information including name, description, price, images, and inventory.

#### Categories Table
Product categories with slugs for routing.

### Row Level Security (RLS)
All tables have RLS enabled for secure data access. Policies ensure users can only access their own data.

### Migrations
Database migrations are located in `supabase/migrations/` with comprehensive documentation.

## 📚 Documentation

- **[DEVELOPER_GUIDE.md](./DEVELOPER_GUIDE.md)** - Comprehensive guide for developers
- **Component Documentation** - JSDoc comments in each component file
- **UI Architecture** - See `src/components/ui/ARCHITECTURE.md`
- **Drawer System** - See `src/components/ui/DRAWER_SYSTEM_DOCUMENTATION.md`

## 👥 For Junior Developers

### Getting Started Checklist

1. ✅ Read this README thoroughly
2. ✅ Review the [DEVELOPER_GUIDE.md](./DEVELOPER_GUIDE.md)
3. ✅ Explore the project structure
4. ✅ Run the app locally
5. ✅ Read component JSDoc comments
6. ✅ Review existing components before creating new ones
7. ✅ Understand the context providers
8. ✅ Learn the utility functions

### Best Practices

#### Code Style
- Use functional components with hooks
- Prefer `const` over `let`
- Use descriptive variable names
- Add JSDoc comments for components
- Extract magic numbers into constants
- Keep functions small and focused (< 50 lines)
- Follow existing patterns in the codebase

#### TypeScript
- Always define types for props
- Use interfaces for object shapes
- Avoid `any` type
- Leverage type inference when possible

#### Component Organization
- One component per file
- Group related components in subdirectories
- Keep components under 300 lines
- Extract complex logic into custom hooks

#### State Management
- Use context for global state
- Use local state for UI-specific data
- Avoid prop drilling
- Keep state close to where it's used

#### Error Handling
```tsx
try {
  const { data, error } = await supabase.from('products').select('*')

  if (error) {
    showToast(error.message, 'error')
    return
  }

  // Handle success
} catch (err) {
  showToast('An unexpected error occurred', 'error')
  console.error(err)
}
```

#### Async Operations
- Always handle loading states
- Show user feedback with toasts
- Handle error cases gracefully
- Clean up side effects in useEffect

### Common Patterns

#### Fetching Data
```tsx
const [data, setData] = useState([])
const [loading, setLoading] = useState(true)

useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase.from('table').select('*')

      if (error) throw error
      setData(data || [])
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  fetchData()
}, [])
```

#### Form Handling
```tsx
const [formData, setFormData] = useState({ email: '', password: '' })
const [loading, setLoading] = useState(false)

const handleSubmit = async (e: FormEvent) => {
  e.preventDefault()
  setLoading(true)

  try {
    // Validate
    if (!isValidEmail(formData.email)) {
      showToast('Invalid email', 'error')
      return
    }

    // Submit
    const { error } = await signIn(formData.email, formData.password)

    if (error) {
      showToast(error.message, 'error')
    } else {
      showToast('Success!', 'success')
    }
  } finally {
    setLoading(false)
  }
}
```

### Debugging Tips

1. **Check the browser console** - Look for errors and warnings
2. **Use React DevTools** - Inspect component state and props
3. **Check Supabase logs** - Review database queries
4. **Verify RLS policies** - Ensure proper data access
5. **Test error states** - Try invalid inputs
6. **Check network tab** - Review API requests/responses

## 🧪 Testing

Run type checking before committing:
```bash
npm run typecheck
```

## 🤝 Contributing

1. Create a feature branch from `main`
2. Follow the existing code style
3. Add JSDoc comments for new components
4. Test your changes thoroughly
5. Run type checking and linting
6. Submit a pull request with clear description

### Commit Message Format
```
type(scope): description

[optional body]
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

## 📝 License

MIT License - feel free to use this project for learning and development.

## 🙏 Acknowledgments

Built with modern web technologies and best practices for a production-ready e-commerce experience.

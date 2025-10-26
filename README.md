# MOVE - E-Commerce Application

A modern, production-ready e-commerce application for athletic wear built with React, TypeScript, and Supabase.

## Features

- Product catalog with filtering and search
- User authentication (sign up/sign in)
- Shopping cart management
- Wishlist functionality
- User account management
- Responsive design
- Smooth animations and transitions

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS
- **Backend**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth
- **Routing**: React Router v7
- **Icons**: Lucide React

## Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── account/         # Account page components
│   ├── auth/            # Authentication components
│   ├── layout/          # Layout components (Header, Footer, Hero)
│   ├── products/        # Product-related components
│   ├── sections/        # Homepage sections
│   └── ui/              # Generic UI components
├── context/             # React Context providers
│   ├── AuthContext.tsx  # Authentication state
│   ├── CartContext.tsx  # Shopping cart state
│   ├── ToastContext.tsx # Toast notifications
│   └── WishlistContext.tsx # Wishlist state
├── hooks/               # Custom React hooks
├── lib/                 # Library configurations (Supabase)
├── pages/               # Page components
│   ├── Account.tsx      # User account page
│   ├── Auth.tsx         # Authentication page
│   ├── Checkout.tsx     # Checkout page
│   ├── Home.tsx         # Homepage
│   ├── ProductCatalog.tsx # Product listing
│   └── ProductDetail.tsx  # Product details
├── types/               # TypeScript type definitions
├── utils/               # Utility functions
│   ├── format.ts        # Formatting helpers
│   ├── validation.ts    # Form validation
│   └── product.ts       # Product utilities
├── constants/           # App constants
└── App.tsx              # Root application component
```

See [DEVELOPER_GUIDE.md](./DEVELOPER_GUIDE.md) for detailed documentation.

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account and project

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file with:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Build for production:
   ```bash
   npm run build
   ```

## Key Components

### Authentication System

The app uses Supabase Auth for user management:

- **AuthContext**: Manages authentication state globally
- **AuthProvider**: Wraps the app to provide auth context
- **useAuth**: Custom hook to access auth state and methods

Example usage:
```tsx
const { user, signIn, signOut } = useAuth()
```

### Account Management

User account pages are organized into smaller components:

- **AccountSidebar**: Navigation between account sections
- **OrdersList**: Displays order history
- **OrderCard**: Individual order display
- **DetailsForm**: User profile editing
- **AddressesTab**: Address management
- **WishlistTab**: Saved items view

### Component Organization

Each component follows the Single Responsibility Principle:

- Clear separation of concerns
- Self-contained with defined props
- Comprehensive JSDoc documentation
- TypeScript for type safety

### Styling Conventions

- Tailwind CSS utility classes
- Custom animations defined in `tailwind.config.js`
- Consistent spacing (8px grid system)
- Hover effects and transitions on interactive elements
- Focus states for accessibility

## Custom Animations

Three custom animations are available:

```css
animate-slideIn   /* Horizontal slide-in effect */
animate-scaleIn   /* Scale and fade-in effect */
animate-fadeIn    /* Simple fade-in effect */
```

## Best Practices

### For Junior Developers

1. **Read the DEVELOPER_GUIDE.md**: Comprehensive guide for working with this codebase

2. **Read component documentation**: Each component has JSDoc comments explaining its purpose and usage

3. **Follow the file structure**: Keep related components together in appropriate folders

4. **Use TypeScript**: Always define types for props and state

5. **Component size**: Keep components focused and under 300 lines when possible

6. **Import organization**: Group imports by category (React, external libraries, internal components)

7. **Error handling**: Always handle errors in async operations

8. **Use utility functions**: Leverage helpers from `utils/` directory instead of duplicating code

9. **Product ID conversion**: Remember to convert string IDs to numbers for wishlist operations

10. **Accessibility**: Use semantic HTML and ARIA labels where appropriate

### Code Style

- Use functional components with hooks
- Prefer `const` over `let`
- Use descriptive variable names
- Add comments for complex logic
- Extract magic numbers into constants
- Keep functions small and focused

### State Management

- Use Context API for global state (auth, cart, wishlist)
- Use local state for component-specific data
- Avoid prop drilling by using context when appropriate

## Database Schema

The app uses Supabase with the following main tables:

- `products`: Product catalog
- `categories`: Product categories
- User data managed by Supabase Auth

See `supabase/migrations/` for detailed schema definitions.

## Contributing

1. Create a new branch for your feature
2. Follow the existing code style
3. Add documentation for new components
4. Test your changes thoroughly
5. Submit a pull request

## License

MIT

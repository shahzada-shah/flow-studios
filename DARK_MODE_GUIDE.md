# Dark Mode Implementation Guide

## Overview

FLOW Studio includes an elegant dark mode implementation with three theme options: **Light**, **Dark**, and **System**. The theme preference is persisted in localStorage and automatically syncs with system preferences when set to "System" mode.

## Features

- **Three Theme Modes**: Light, Dark, and System preference
- **Persistent Storage**: Theme preference saved to localStorage
- **System Sync**: Automatically follows system theme when in System mode
- **Smooth Transitions**: All theme changes animate smoothly
- **Accessible**: Keyboard navigation and proper ARIA labels
- **Clean Design**: Minimal, elegant theme toggle in header

## Architecture

### Theme Context

**Location**: `src/context/ThemeContext.tsx`

The `ThemeContext` manages global theme state and provides:
- Current theme mode (`light`, `dark`, or `system`)
- Effective theme (resolved `light` or `dark`)
- Theme setter with localStorage persistence

```tsx
import { useTheme } from './context/ThemeContext'

function MyComponent() {
  const { theme, setTheme, effectiveTheme } = useTheme()

  // Get current theme mode
  console.log(theme) // 'light' | 'dark' | 'system'

  // Get effective theme (resolved)
  console.log(effectiveTheme) // 'light' | 'dark'

  // Change theme
  setTheme('dark')
}
```

### Theme Toggle Component

**Location**: `src/components/ui/ThemeToggle.tsx`

A dropdown menu with three options:
- **Light**: Force light theme
- **Dark**: Force dark theme
- **System**: Follow system preference

The component displays the current theme icon and highlights the active selection.

## Implementation Details

### 1. Tailwind Configuration

**File**: `tailwind.config.js`

```javascript
export default {
  darkMode: 'class', // Enable class-based dark mode
  // ... rest of config
}
```

The `darkMode: 'class'` strategy allows us to toggle dark mode by adding/removing the `dark` class on the root HTML element.

### 2. Provider Setup

**File**: `src/main.tsx`

The `ThemeProvider` wraps the entire application at the top level:

```tsx
<ThemeProvider>
  <AuthProvider>
    <ToastProvider>
      <WishlistProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </WishlistProvider>
    </ToastProvider>
  </AuthProvider>
</ThemeProvider>
```

### 3. How It Works

#### Theme Detection

```typescript
// Get system theme preference
const getSystemTheme = (): 'light' | 'dark' => {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}
```

#### Theme Application

When theme changes:
1. Update state
2. Save to localStorage
3. Add/remove `dark` class on `document.documentElement`

```typescript
const updateEffectiveTheme = (currentTheme: Theme) => {
  const effective = currentTheme === 'system' ? getSystemTheme() : currentTheme

  if (effective === 'dark') {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}
```

#### System Preference Listener

When in System mode, the app listens for system theme changes:

```typescript
useEffect(() => {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

  const handleChange = () => {
    if (theme === 'system') {
      updateEffectiveTheme('system')
    }
  }

  mediaQuery.addEventListener('change', handleChange)
  return () => mediaQuery.removeEventListener('change', handleChange)
}, [theme])
```

## Using Dark Mode in Components

### Basic Usage

Apply dark mode styles using Tailwind's `dark:` variant:

```tsx
<div className="bg-white dark:bg-gray-950">
  <h1 className="text-gray-900 dark:text-gray-100">
    Hello World
  </h1>
  <p className="text-gray-600 dark:text-gray-400">
    This text adapts to the theme
  </p>
</div>
```

### Common Patterns

#### Backgrounds

```tsx
// White in light mode, near-black in dark mode
<div className="bg-white dark:bg-gray-950">

// Light gray in light mode, dark gray in dark mode
<div className="bg-gray-100 dark:bg-gray-900">

// For borders
<div className="border-gray-200 dark:border-gray-800">
```

#### Text Colors

```tsx
// Primary text
<h1 className="text-gray-900 dark:text-gray-100">

// Secondary text
<p className="text-gray-600 dark:text-gray-400">

// Muted text
<span className="text-gray-500 dark:text-gray-500">
```

#### Interactive Elements

```tsx
// Buttons
<button className="
  bg-gray-900 dark:bg-gray-100
  text-white dark:text-gray-900
  hover:bg-gray-800 dark:hover:bg-gray-200
">

// Hover states
<div className="
  hover:bg-gray-100 dark:hover:bg-gray-800
">
```

#### Badges and Pills

```tsx
<span className="
  bg-gray-900 dark:bg-gray-100
  text-white dark:text-gray-900
">
  Badge
</span>
```

## Color Palette

### Light Mode
- **Background**: `white` (#ffffff)
- **Secondary Background**: `gray-100` (#f3f4f6)
- **Primary Text**: `gray-900` (#111827)
- **Secondary Text**: `gray-600` (#4b5563)
- **Borders**: `gray-200` (#e5e7eb)
- **Interactive**: `gray-900` (#111827)

### Dark Mode
- **Background**: `gray-950` (#030712)
- **Secondary Background**: `gray-900` (#111827)
- **Primary Text**: `gray-100` (#f3f4f6)
- **Secondary Text**: `gray-400` (#9ca3af)
- **Borders**: `gray-800` (#1f2937)
- **Interactive**: `gray-100` (#f3f4f6)

## Updated Components

The following components have been updated with dark mode support:

### Core Layout
- **Header** (`src/components/layout/Header.tsx`)
  - Background, text, and interactive elements
  - Theme toggle button added
  - All navigation links and icons
  - Cart and wishlist badges

- **App Container** (`src/App.tsx`)
  - Root background color

- **Loader** (`src/components/ui/Loader.tsx`)
  - Loading screen background and text

### UI Components
- **ThemeToggle** (`src/components/ui/ThemeToggle.tsx`)
  - New component for theme switching
  - Dropdown with three options
  - Visual indicator for active theme

## Adding Dark Mode to New Components

When creating new components, follow these guidelines:

### 1. Always Include Dark Mode Styles

```tsx
// ❌ Bad - No dark mode
<div className="bg-white text-gray-900">

// ✅ Good - With dark mode
<div className="bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
```

### 2. Maintain Contrast

Ensure text is readable in both modes:

```tsx
// Primary text - High contrast
<h1 className="text-gray-900 dark:text-gray-100">

// Secondary text - Medium contrast
<p className="text-gray-600 dark:text-gray-400">

// Muted text - Lower contrast
<span className="text-gray-500 dark:text-gray-500">
```

### 3. Interactive States

Always style hover, focus, and active states for both themes:

```tsx
<button className="
  bg-white dark:bg-gray-950
  text-gray-900 dark:text-gray-100
  hover:bg-gray-100 dark:hover:bg-gray-900
  focus:ring-gray-900 dark:focus:ring-gray-100
">
```

### 4. Transitions

Add smooth transitions for theme changes:

```tsx
<div className="
  bg-white dark:bg-gray-950
  transition-colors duration-200
">
```

## Testing Dark Mode

### Manual Testing Checklist

- [ ] Toggle between Light, Dark, and System modes
- [ ] Verify theme persists on page reload
- [ ] Check all text is readable
- [ ] Test hover states on interactive elements
- [ ] Verify transitions are smooth
- [ ] Test with system theme changes (when in System mode)
- [ ] Check all pages and components
- [ ] Verify accessibility (keyboard navigation)

### Browser Testing

Test in:
- Chrome/Edge (Chromium)
- Firefox
- Safari

### System Preference Testing

To test System mode:

**macOS:**
1. System Settings → Appearance
2. Toggle between Light and Dark
3. App should update automatically when in System mode

**Windows:**
1. Settings → Personalization → Colors
2. Choose your color: Light/Dark
3. App should update automatically when in System mode

## Troubleshooting

### Theme Not Persisting

**Issue**: Theme resets on page reload

**Solution**: Check localStorage is working:
```javascript
console.log(localStorage.getItem('flow-studio-theme'))
```

### Dark Class Not Applied

**Issue**: Styles not updating

**Solution**: Verify `dark` class on HTML element:
```javascript
console.log(document.documentElement.classList.contains('dark'))
```

### Tailwind Dark Styles Not Working

**Issue**: Dark mode styles not compiling

**Solution**: Ensure `tailwind.config.js` has:
```javascript
darkMode: 'class'
```

### System Theme Not Updating

**Issue**: Theme doesn't change with system preference

**Solution**: Check media query listener is attached:
```typescript
// Should be in ThemeContext
window.matchMedia('(prefers-color-scheme: dark)')
```

## Best Practices

### 1. Consistency

Use the same color values throughout the application:
- Light background: `white`
- Dark background: `gray-950`
- Light text: `gray-900`
- Dark text: `gray-100`

### 2. Accessibility

- Maintain WCAG AA contrast ratios (4.5:1 for normal text)
- Test with screen readers
- Ensure focus indicators are visible in both themes
- Use semantic HTML

### 3. Performance

- Theme changes are instant (class-based)
- localStorage reads are synchronous
- Media query listener uses native browser API
- No performance impact

### 4. User Experience

- Default to System mode for first-time users
- Persist user preference
- Smooth transitions between themes
- Clear visual indication of current theme
- Easy-to-access toggle in header

## Future Enhancements

Potential improvements for dark mode:

1. **Custom Themes**: Allow users to create custom color themes
2. **Scheduled Dark Mode**: Auto-switch based on time of day
3. **Per-Page Themes**: Remember theme per page/section
4. **Theme Previews**: Preview theme before applying
5. **Accessibility Mode**: High contrast theme option

## Additional Resources

- [Tailwind CSS Dark Mode](https://tailwindcss.com/docs/dark-mode)
- [MDN: prefers-color-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme)
- [Web.dev: prefers-color-scheme](https://web.dev/prefers-color-scheme/)
- [WCAG Color Contrast](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)

---

**Last Updated:** 2025-10-27

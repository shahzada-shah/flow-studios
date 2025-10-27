# Database Schema Documentation

## Overview

FLOW Studio uses Supabase (PostgreSQL) for data persistence and Supabase Auth for user authentication. This document provides a comprehensive overview of the database schema, Row Level Security policies, and usage patterns.

## Tables

### `categories`

Product categories for organizing the inventory.

**Columns:**

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | uuid | PRIMARY KEY, DEFAULT gen_random_uuid() | Unique identifier |
| `name` | text | NOT NULL | Display name (e.g., "Leggings") |
| `slug` | text | UNIQUE, NOT NULL | URL-friendly identifier (e.g., "leggings") |
| `description` | text | DEFAULT '' | Category description |
| `created_at` | timestamptz | DEFAULT now() | Creation timestamp |

**Indexes:**
- `idx_categories_slug` on `slug` - Fast URL lookups

**RLS Policies:**
- Public read access (`anon`, `authenticated`) - Anyone can browse categories

**Sample Data:**
```sql
('Leggings', 'leggings', 'High-performance yoga leggings for every practice')
('Sports Bras', 'sports-bras', 'Supportive and comfortable sports bras')
('Tops', 'tops', 'Breathable tops and layers for studio to street')
('Accessories', 'accessories', 'Essential yoga accessories and gear')
```

---

### `products`

Main product catalog with detailed product information.

**Columns:**

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | uuid | PRIMARY KEY, DEFAULT gen_random_uuid() | Unique identifier |
| `name` | text | NOT NULL | Product name |
| `slug` | text | UNIQUE, NOT NULL | URL-friendly identifier |
| `description` | text | DEFAULT '' | Product description |
| `price` | numeric(10,2) | NOT NULL | Price in USD |
| `category_id` | uuid | FOREIGN KEY → categories(id) | Category reference |
| `color` | text | DEFAULT 'Black' | Primary color |
| `image_url` | text | DEFAULT '' | Main product image URL |
| `sizes` | text[] | DEFAULT ['XS','S','M','L','XL'] | Available sizes |
| `activities` | text[] | DEFAULT ['Yoga'] | Related activities |
| `is_sustainable` | boolean | DEFAULT false | Sustainability flag |
| `is_new` | boolean | DEFAULT false | New arrival flag |
| `is_bestseller` | boolean | DEFAULT false | Bestseller flag |
| `in_stock` | boolean | DEFAULT true | Availability status |
| `created_at` | timestamptz | DEFAULT now() | Creation timestamp |
| `updated_at` | timestamptz | DEFAULT now() | Last update timestamp |

**Indexes:**
- `idx_products_category_id` on `category_id` - Fast category filtering
- `idx_products_slug` on `slug` - Fast URL lookups

**Foreign Keys:**
- `category_id` → `categories(id)` ON DELETE SET NULL

**RLS Policies:**
- Public read access (`anon`, `authenticated`) - Anyone can browse products

**Common Queries:**

```sql
-- Get all products with category info
SELECT p.*, c.name as category_name, c.slug as category_slug
FROM products p
LEFT JOIN categories c ON p.category_id = c.id
WHERE p.in_stock = true
ORDER BY p.created_at DESC;

-- Get products by category
SELECT * FROM products
WHERE category_id = (SELECT id FROM categories WHERE slug = 'leggings')
AND in_stock = true;

-- Get new arrivals
SELECT * FROM products
WHERE is_new = true AND in_stock = true
ORDER BY created_at DESC
LIMIT 12;

-- Get bestsellers
SELECT * FROM products
WHERE is_bestseller = true AND in_stock = true
ORDER BY created_at DESC;
```

---

## Row Level Security (RLS)

All tables have RLS enabled to ensure secure data access.

### Security Principles

1. **Public Read Access** - Products and categories are publicly viewable for browsing
2. **Authenticated Write** - Only authenticated admins can modify data (to be implemented)
3. **Default Deny** - RLS is restrictive by default; explicit policies grant access

### Policy Examples

```sql
-- Public read for categories
CREATE POLICY "Categories are publicly readable"
  ON categories FOR SELECT
  TO anon, authenticated
  USING (true);

-- Public read for products
CREATE POLICY "Products are publicly readable"
  ON products FOR SELECT
  TO anon, authenticated
  USING (true);
```

### Future Policies (Admin/Staff)

When admin functionality is added:

```sql
-- Admin can insert products
CREATE POLICY "Admins can insert products"
  ON products FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- Admin can update products
CREATE POLICY "Admins can update products"
  ON products FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );
```

---

## Authentication

User authentication is handled by **Supabase Auth**.

### User Data

- Users are stored in Supabase's built-in `auth.users` table
- No custom user table required for basic auth
- User metadata can be stored in `auth.users.raw_user_meta_data`

### Auth Methods

Currently implemented:
- Email/Password authentication

### Example Auth Usage

```typescript
// Sign up
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'secure-password'
})

// Sign in
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'secure-password'
})

// Sign out
const { error } = await supabase.auth.signOut()

// Get current user
const { data: { user } } = await supabase.auth.getUser()
```

---

## Data Types

### Arrays

The schema uses PostgreSQL arrays for flexible multi-value columns:

**Sizes Array:**
```typescript
sizes: ['XS', 'S', 'M', 'L', 'XL']
```

**Activities Array:**
```typescript
activities: ['Yoga', 'Pilates', 'Barre', 'Running', 'Training']
```

### Query Array Columns

```sql
-- Products with specific size
SELECT * FROM products WHERE 'M' = ANY(sizes);

-- Products for specific activity
SELECT * FROM products WHERE 'Yoga' = ANY(activities);

-- Products with multiple activities
SELECT * FROM products
WHERE activities @> ARRAY['Yoga', 'Pilates'];
```

---

## Migrations

### Migration Files

Located in `supabase/migrations/`:

1. `20251026090607_create_products_schema.sql` - Initial schema
2. `20251026121718_add_bestseller_and_diverse_products.sql` - Additional products

### Migration Best Practices

1. **Use IF NOT EXISTS** for all CREATE statements
2. **Use ON CONFLICT** for INSERT statements
3. **Include comprehensive comments** explaining changes
4. **Enable RLS** on all new tables
5. **Add policies** for appropriate access control
6. **Create indexes** for frequently queried columns

### Example Migration Template

```sql
/*
  # Migration Title

  1. Changes
    - What tables are being created/modified
    - What columns are being added/changed
    - What indexes are being added

  2. Security
    - RLS policies being added
    - Access control changes

  3. Notes
    - Important considerations
    - Data migration notes
*/

-- Your SQL here
CREATE TABLE IF NOT EXISTS table_name (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  -- columns
);

ALTER TABLE table_name ENABLE ROW LEVEL SECURITY;

CREATE POLICY "policy_name"
  ON table_name FOR SELECT
  TO authenticated
  USING (true);
```

---

## Query Patterns

### Using Supabase Client (TypeScript)

#### Fetching Single Product

```typescript
const { data, error } = await supabase
  .from('products')
  .select(`
    *,
    categories (
      name,
      slug
    )
  `)
  .eq('slug', productSlug)
  .maybeSingle()

if (error) {
  console.error('Error:', error)
  return null
}

return data
```

#### Fetching Multiple Products with Filters

```typescript
let query = supabase
  .from('products')
  .select(`
    *,
    categories!inner (
      name,
      slug
    )
  `)
  .eq('in_stock', true)

// Filter by category
if (categorySlug) {
  query = query.eq('categories.slug', categorySlug)
}

// Filter by price range
if (maxPrice) {
  query = query.lte('price', maxPrice)
}

// Filter by activity
if (activity) {
  query = query.contains('activities', [activity])
}

// Sort
query = query.order('created_at', { ascending: false })

const { data, error } = await query
```

#### Filtering Array Columns

```typescript
// Products available in size 'M'
const { data } = await supabase
  .from('products')
  .select('*')
  .contains('sizes', ['M'])

// Products for 'Yoga' activity
const { data } = await supabase
  .from('products')
  .select('*')
  .contains('activities', ['Yoga'])
```

---

## Database Relationships

```
categories (1) ←──── (∞) products
    │
    ├── id
    └── Used by: products.category_id
```

### Relationship Queries

```typescript
// Get category with all its products
const { data } = await supabase
  .from('categories')
  .select(`
    *,
    products (*)
  `)
  .eq('slug', 'leggings')
  .single()

// Get product with category info
const { data } = await supabase
  .from('products')
  .select(`
    *,
    categories (
      name,
      slug,
      description
    )
  `)
  .eq('id', productId)
  .single()
```

---

## Performance Considerations

### Indexes

Current indexes optimize common queries:
- `idx_products_category_id` - Fast category filtering
- `idx_products_slug` - Fast URL-based lookups
- `idx_categories_slug` - Fast category URL lookups

### Query Optimization Tips

1. **Use indexes** - Query indexed columns (slug, category_id)
2. **Limit results** - Use `.limit()` for large datasets
3. **Select specific columns** - Don't use `SELECT *` if not needed
4. **Use inner joins** - Use `!inner` for required relationships
5. **Paginate** - Implement pagination for large product lists

```typescript
// Good - Optimized query
const { data } = await supabase
  .from('products')
  .select('id, name, price, image_url')
  .eq('in_stock', true)
  .order('created_at', { ascending: false })
  .range(0, 11) // First 12 products
  .limit(12)
```

---

## Future Schema Enhancements

Consider adding these tables as the application grows:

### User Profiles

```sql
CREATE TABLE user_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  full_name text,
  phone text,
  created_at timestamptz DEFAULT now()
);
```

### Orders

```sql
CREATE TABLE orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  total numeric(10,2),
  status text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid REFERENCES orders(id),
  product_id uuid REFERENCES products(id),
  quantity integer,
  price numeric(10,2),
  size text
);
```

### Reviews

```sql
CREATE TABLE reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid REFERENCES products(id),
  user_id uuid REFERENCES auth.users(id),
  rating integer CHECK (rating >= 1 AND rating <= 5),
  title text,
  content text,
  created_at timestamptz DEFAULT now()
);
```

### Product Images

```sql
CREATE TABLE product_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid REFERENCES products(id) ON DELETE CASCADE,
  image_url text NOT NULL,
  alt_text text,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);
```

---

## Maintenance

### Regular Tasks

1. **Monitor RLS policies** - Ensure they're working as expected
2. **Review slow queries** - Check Supabase dashboard for performance
3. **Update indexes** - Add indexes for new query patterns
4. **Clean old data** - Archive or remove old records if needed
5. **Backup database** - Regular backups via Supabase

### Troubleshooting

**Query returns no data:**
- Check RLS policies
- Verify user authentication state
- Test query in Supabase SQL editor

**Slow queries:**
- Check if indexes exist
- Review query complexity
- Consider pagination

**RLS errors:**
- Verify policies are enabled
- Check policy USING and WITH CHECK clauses
- Test with different user roles

---

## Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [Supabase Client Reference](https://supabase.com/docs/reference/javascript/introduction)

---

**Last Updated:** 2025-10-27

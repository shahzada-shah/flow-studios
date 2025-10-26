/*
  # Create Products Schema for Women's Yoga Clothing Store

  1. New Tables
    - `categories`
      - `id` (uuid, primary key)
      - `name` (text) - Category name (e.g., 'Leggings', 'Sports Bras')
      - `slug` (text, unique) - URL-friendly identifier
      - `description` (text) - Category description
      - `created_at` (timestamptz)
    
    - `products`
      - `id` (uuid, primary key)
      - `name` (text) - Product name
      - `slug` (text, unique) - URL-friendly identifier
      - `description` (text) - Product description
      - `price` (numeric) - Product price in USD
      - `category_id` (uuid) - Foreign key to categories
      - `color` (text) - Product color
      - `image_url` (text) - Product image URL
      - `sizes` (text[]) - Available sizes array
      - `activities` (text[]) - Related activities (Yoga, Pilates, etc.)
      - `is_sustainable` (boolean) - Sustainability flag
      - `is_new` (boolean) - New arrival flag
      - `in_stock` (boolean) - Stock availability
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on both tables
    - Add policies for public read access (shopping catalog)
    - Products are publicly readable for browsing

  3. Indexes
    - Index on category_id for fast filtering
    - Index on slug for URL lookups
*/

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text DEFAULT '',
  price numeric(10,2) NOT NULL,
  category_id uuid REFERENCES categories(id) ON DELETE SET NULL,
  color text DEFAULT 'Black',
  image_url text DEFAULT '',
  sizes text[] DEFAULT ARRAY['XS', 'S', 'M', 'L', 'XL'],
  activities text[] DEFAULT ARRAY['Yoga'],
  is_sustainable boolean DEFAULT false,
  is_new boolean DEFAULT false,
  in_stock boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_products_category_id ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);

-- Enable Row Level Security
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Public read access for categories (anyone can browse)
CREATE POLICY "Categories are publicly readable"
  ON categories FOR SELECT
  TO anon, authenticated
  USING (true);

-- Public read access for products (anyone can browse)
CREATE POLICY "Products are publicly readable"
  ON products FOR SELECT
  TO anon, authenticated
  USING (true);

-- Insert sample categories
INSERT INTO categories (name, slug, description) VALUES
  ('Leggings', 'leggings', 'High-performance yoga leggings for every practice'),
  ('Sports Bras', 'sports-bras', 'Supportive and comfortable sports bras'),
  ('Tops', 'tops', 'Breathable tops and layers for studio to street'),
  ('Accessories', 'accessories', 'Essential yoga accessories and gear')
ON CONFLICT (slug) DO NOTHING;

-- Insert sample products for demonstration
INSERT INTO products (name, slug, description, price, category_id, color, activities, is_sustainable, is_new) 
SELECT 
  'Serenity High-Rise Legging',
  'serenity-high-rise-legging',
  'Buttery-soft, high-waisted leggings with four-way stretch',
  88.00,
  id,
  'Black',
  ARRAY['Yoga', 'Pilates', 'Barre'],
  true,
  true
FROM categories WHERE slug = 'leggings'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO products (name, slug, description, price, category_id, color, activities, is_new)
SELECT 
  'Flow Support Sport Bra',
  'flow-support-sport-bra',
  'Medium support bra with moisture-wicking fabric',
  68.00,
  id,
  'Black',
  ARRAY['Yoga', 'Running', 'Training'],
  true
FROM categories WHERE slug = 'sports-bras'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO products (name, slug, description, price, category_id, color, activities)
SELECT 
  'Essential Scoop Tank',
  'essential-scoop-tank',
  'Lightweight, breathable tank with a flattering scoop neck',
  48.00,
  id,
  'Black',
  ARRAY['Yoga', 'Pilates']
FROM categories WHERE slug = 'tops'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO products (name, slug, description, price, category_id, color, activities, is_sustainable)
SELECT 
  'Align Yoga Mat',
  'align-yoga-mat',
  'Premium non-slip yoga mat with alignment guides',
  78.00,
  id,
  'Slate',
  ARRAY['Yoga', 'Meditation'],
  true
FROM categories WHERE slug = 'accessories'
ON CONFLICT (slug) DO NOTHING;
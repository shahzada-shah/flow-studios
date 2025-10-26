/*
  # Add Bestseller Field and Diverse Sample Products

  1. Schema Changes
    - Add `is_bestseller` boolean column to products table with default false
  
  2. Sample Data
    - Add diverse sample products with unique names, colors, and prices
    - Mark 4 products as bestsellers
    - Include products across different categories (tops, leggings, sports bras)
    - Each product has unique color and name combinations
    
  3. Important Notes
    - All products have unique combinations of name and color
    - Prices range from $42 to $128 to show variety
    - Mix of new and established products
    - Uses existing category UUIDs from categories table
*/

-- Add is_bestseller column if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'products' AND column_name = 'is_bestseller'
  ) THEN
    ALTER TABLE products ADD COLUMN is_bestseller boolean DEFAULT false;
  END IF;
END $$;

-- Clear existing sample data (only if table has very few rows to avoid deleting user data)
DO $$
BEGIN
  IF (SELECT COUNT(*) FROM products) < 10 THEN
    DELETE FROM products;
  END IF;
END $$;

-- Get category IDs for reference
DO $$
DECLARE
  leggings_id uuid;
  tops_id uuid;
  sports_bras_id uuid;
  accessories_id uuid;
BEGIN
  SELECT id INTO leggings_id FROM categories WHERE slug = 'leggings';
  SELECT id INTO tops_id FROM categories WHERE slug = 'tops';
  SELECT id INTO sports_bras_id FROM categories WHERE slug = 'sports-bras';
  SELECT id INTO accessories_id FROM categories WHERE slug = 'accessories';

  -- Insert diverse sample products with bestsellers marked
  INSERT INTO products (name, slug, description, price, category_id, color, sizes, activities, is_new, is_bestseller, in_stock, is_sustainable, image_url)
  VALUES
    -- Bestsellers (4 products)
    ('CloudFlex Legging', 'cloudflex-legging', 'Ultra-soft high-waisted leggings with four-way stretch and moisture-wicking technology', 88.00, leggings_id, 'Midnight Navy', ARRAY['XS', 'S', 'M', 'L', 'XL'], ARRAY['Training', 'Yoga'], false, true, true, false, null),
    ('Flow Sculpt Tank', 'flow-sculpt-tank', 'Lightweight sculpting tank with built-in shelf bra and breathable mesh panels', 52.00, tops_id, 'Sage Green', ARRAY['XS', 'S', 'M', 'L', 'XL'], ARRAY['Yoga', 'Pilates'], false, true, true, true, null),
    ('PowerMove Sports Bra', 'powermove-sports-bra', 'Maximum support sports bra with adjustable straps and ventilated back panel', 68.00, sports_bras_id, 'Terracotta', ARRAY['XS', 'S', 'M', 'L', 'XL'], ARRAY['Training', 'Running'], false, true, true, false, null),
    ('Zenith Cropped Hoodie', 'zenith-cropped-hoodie', 'Cozy cropped hoodie with thumbholes and kangaroo pocket', 98.00, tops_id, 'Heather Grey', ARRAY['XS', 'S', 'M', 'L', 'XL'], ARRAY['Casual', 'Training'], true, true, true, false, null),
    
    -- Regular products (diverse colors and styles)
    ('Align Seamless Legging', 'align-seamless-legging', 'Buttery-soft seamless leggings perfect for yoga and low-impact workouts', 98.00, leggings_id, 'Black', ARRAY['XS', 'S', 'M', 'L', 'XL'], ARRAY['Yoga'], true, false, true, true, null),
    ('Breeze Short Sleeve Tee', 'breeze-short-sleeve-tee', 'Lightweight performance tee with anti-odor technology', 48.00, tops_id, 'Pearl White', ARRAY['XS', 'S', 'M', 'L', 'XL'], ARRAY['Running', 'Training'], true, false, true, false, null),
    ('Eclipse Racerback Tank', 'eclipse-racerback-tank', 'Sweat-wicking racerback tank with flattering curved hem', 44.00, tops_id, 'Dusty Rose', ARRAY['XS', 'S', 'M', 'L', 'XL'], ARRAY['Training', 'Yoga'], false, false, true, true, null),
    ('Velocity Training Tight', 'velocity-training-tight', 'Compression tights with reflective details for nighttime visibility', 92.00, leggings_id, 'Deep Ocean', ARRAY['XS', 'S', 'M', 'L', 'XL'], ARRAY['Running', 'Training'], true, false, true, false, null),
    ('Sunrise Yoga Bra', 'sunrise-yoga-bra', 'Light support bra ideal for yoga, pilates, and barre', 48.00, sports_bras_id, 'Lavender Mist', ARRAY['XS', 'S', 'M', 'L', 'XL'], ARRAY['Yoga', 'Pilates'], false, false, true, true, null),
    ('Rhythm Bike Short', 'rhythm-bike-short', '8-inch high-waisted bike shorts with no-dig waistband', 52.00, leggings_id, 'Bronze', ARRAY['XS', 'S', 'M', 'L', 'XL'], ARRAY['Training', 'Cycling'], false, false, true, false, null),
    ('Luxe Ribbed Tank', 'luxe-ribbed-tank', 'Soft ribbed fabric tank with feminine v-neckline', 42.00, tops_id, 'Cream', ARRAY['XS', 'S', 'M', 'L', 'XL'], ARRAY['Casual', 'Yoga'], false, false, true, true, null),
    ('Sprint Capri Legging', 'sprint-capri-legging', 'Cropped leggings with mesh inserts and hidden waistband pocket', 78.00, leggings_id, 'Steel Blue', ARRAY['XS', 'S', 'M', 'L', 'XL'], ARRAY['Running', 'Training'], false, false, true, false, null),
    ('Elevate Pullover', 'elevate-pullover', 'Half-zip pullover with cozy fleece lining', 88.00, tops_id, 'Mauve', ARRAY['XS', 'S', 'M', 'L', 'XL'], ARRAY['Casual'], true, false, true, false, null),
    ('Impact Max Sports Bra', 'impact-max-sports-bra', 'High-impact sports bra with encapsulation support', 72.00, sports_bras_id, 'Slate Grey', ARRAY['XS', 'S', 'M', 'L', 'XL'], ARRAY['Training', 'Running'], false, false, true, false, null),
    ('Serenity Flare Legging', 'serenity-flare-legging', 'Flattering flare-leg leggings perfect for dance and yoga', 86.00, leggings_id, 'Burgundy', ARRAY['XS', 'S', 'M', 'L', 'XL'], ARRAY['Yoga', 'Dance'], false, false, true, true, null),
    ('Swift Long Sleeve', 'swift-long-sleeve', 'Lightweight long sleeve with thumbholes and side vents', 58.00, tops_id, 'Soft Pink', ARRAY['XS', 'S', 'M', 'L', 'XL'], ARRAY['Running', 'Training'], true, false, true, false, null)
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    price = EXCLUDED.price,
    category_id = EXCLUDED.category_id,
    color = EXCLUDED.color,
    sizes = EXCLUDED.sizes,
    activities = EXCLUDED.activities,
    is_new = EXCLUDED.is_new,
    is_bestseller = EXCLUDED.is_bestseller,
    in_stock = EXCLUDED.in_stock,
    is_sustainable = EXCLUDED.is_sustainable;
END $$;

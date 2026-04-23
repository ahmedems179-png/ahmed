-- إضافة المنتجات الأولية
INSERT INTO products (name, name_ar, description, description_ar, price, original_price, category, image_url, badge, badge_ar, in_stock)
VALUES
  ('iPhone 16 Pro Max Clear Case', 'كفر آيفون 16 برو ماكس شفاف', 'Premium transparent case with shock absorption', 'كفر شفاف فاخر مع امتصاص الصدمات', 15.00, 25.00, 'cases', '/images/case-clear.jpg', 'Best Seller', 'الأكثر مبيعاً', true),
  
  ('iPhone 16 Pro Leather Case', 'كفر آيفون 16 برو جلد', 'Genuine leather case with premium finish', 'كفر جلد أصلي بتشطيب فاخر', 35.00, 50.00, 'cases', '/images/case-leather.jpg', 'Premium', 'فاخر', true),
  
  ('iPhone 16 Silicone Case', 'كفر آيفون 16 سيليكون', 'Soft silicone case with microfiber lining', 'كفر سيليكون ناعم مع بطانة مايكروفايبر', 12.00, 18.00, 'cases', '/images/case-silicone.jpg', NULL, NULL, true),
  
  ('iPhone 16 MagSafe Case', 'كفر آيفون 16 ماجسيف', 'MagSafe compatible case with strong magnets', 'كفر متوافق مع ماجسيف مع مغناطيس قوي', 25.00, 35.00, 'cases', '/images/case-magsafe.jpg', 'New', 'جديد', true),
  
  ('Marble Texture Sticker', 'ستيكر رخامي', 'Premium marble texture skin for iPhone', 'ستيكر بنمط رخامي فاخر للآيفون', 8.00, 12.00, 'stickers', '/images/sticker-marble.jpg', NULL, NULL, true),
  
  ('Carbon Fiber Sticker', 'ستيكر كربون فايبر', 'Carbon fiber texture wrap for iPhone', 'ستيكر بنمط ألياف الكربون للآيفون', 10.00, 15.00, 'stickers', '/images/sticker-carbon.jpg', 'Popular', 'رائج', true),
  
  ('Matte Black Sticker', 'ستيكر أسود مطفي', 'Sleek matte black skin for iPhone', 'ستيكر أسود مطفي أنيق للآيفون', 7.00, 10.00, 'stickers', '/images/sticker-matte.jpg', NULL, NULL, true),
  
  ('Gradient Color Sticker', 'ستيكر متدرج الألوان', 'Beautiful gradient color skin for iPhone', 'ستيكر بألوان متدرجة جميلة للآيفون', 9.00, 14.00, 'stickers', '/images/sticker-gradient.jpg', 'Trending', 'رائج', true),
  
  ('iPhone 15 Pro Clear Case', 'كفر آيفون 15 برو شفاف', 'Crystal clear case for iPhone 15 Pro', 'كفر كريستال شفاف لآيفون 15 برو', 12.00, 20.00, 'cases', '/images/case-15-clear.jpg', NULL, NULL, true),
  
  ('iPhone 15 Rugged Case', 'كفر آيفون 15 متين', 'Heavy duty protection case', 'كفر حماية قوية', 28.00, 40.00, 'cases', '/images/case-rugged.jpg', 'Tough', 'قوي', true),
  
  ('Holographic Sticker', 'ستيكر هولوجرافيك', 'Eye-catching holographic skin', 'ستيكر هولوجرافيك جذاب', 11.00, 16.00, 'stickers', '/images/sticker-holo.jpg', 'Limited', 'محدود', true),
  
  ('Wood Texture Sticker', 'ستيكر خشبي', 'Natural wood texture skin', 'ستيكر بملمس الخشب الطبيعي', 9.00, 13.00, 'stickers', '/images/sticker-wood.jpg', NULL, NULL, true)
ON CONFLICT DO NOTHING;

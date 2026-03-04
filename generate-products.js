const fs = require('fs');

const categories = [
  { name: 'Electronics', subcategories: ['Audio', 'Peripherals', 'Wearables', 'Accessories', 'Power', 'Cameras'] },
  { name: 'Sports', subcategories: ['Footwear', 'Fitness', 'Yoga', 'Cycling', 'Weights', 'Cardio', 'Recovery'] },
  { name: 'Home', subcategories: ['Bedding', 'Lighting', 'Garden', 'Wellness', 'Textiles', 'Decor'] },
  { name: 'Kitchen', subcategories: ['Cookware', 'Appliances', 'Cutlery', 'Storage', 'Tools', 'Coffee', 'Serveware'] },
  { name: 'Fashion', subcategories: ['Bags', 'Accessories', 'Watches', 'Jewelry', 'Shoes'] },
  { name: 'Health', subcategories: ['Supplements', 'Sleep', 'Personal Care', 'Vitamins'] },
  { name: 'Furniture', subcategories: ['Office', 'Living Room', 'Bedroom', 'Outdoor'] },
  { name: 'Beauty', subcategories: ['Tools', 'Skincare', 'Haircare', 'Makeup'] },
  { name: 'Office', subcategories: ['Organization', 'Supplies', 'Tech', 'Furniture'] },
  { name: 'Food & Beverages', subcategories: ['Tea', 'Coffee', 'Snacks', 'Organic'] }
];

const brands = [
  'SoundMax', 'ComfortPro', 'ZenLeaf', 'SpeedRun', 'HydroLife', 'GameForce', 'FlexFit',
  'TechTime', 'SleepLux', 'IronChef', 'UrbanStyle', 'VitaPlant', 'BrightLife', 'BrewMaster',
  'IronPump', 'GreenSpace', 'SharpEdge', 'EcoKitchen', 'PowerUp', 'PrecisionCook', 'TechRise',
  'PrepRight', 'CozyHome', 'GlamPro', 'TypeWell', 'AutoTech', 'WoodCraft', 'BikeGear',
  'WorkSpace', 'TravelSafe', 'AromaZen', 'TechConnect', 'TechVision', 'NaturePure', 'FitGear'
];

const adjectives = [
  'Premium', 'Professional', 'Deluxe', 'Ultra', 'Advanced', 'Classic', 'Modern', 'Compact',
  'Portable', 'Wireless', 'Smart', 'Ergonomic', 'Organic', 'Natural', 'Elite', 'Pro',
  'Essential', 'Luxury', 'Heavy-Duty', 'Lightweight', 'Multi-Purpose', 'High-Performance'
];

const productTemplates = {
  'Electronics': [
    { base: 'Headphones', tags: ['audio', 'wireless', 'bluetooth'] },
    { base: 'Earbuds', tags: ['audio', 'wireless', 'portable'] },
    { base: 'Speaker', tags: ['audio', 'bluetooth', 'portable'] },
    { base: 'Keyboard', tags: ['typing', 'wireless', 'ergonomic'] },
    { base: 'Mouse', tags: ['precision', 'wireless', 'ergonomic'] },
    { base: 'Monitor Stand', tags: ['ergonomic', 'adjustable', 'desk'] },
    { base: 'Webcam', tags: ['streaming', 'video', 'hd'] },
    { base: 'USB Hub', tags: ['connectivity', 'portable', 'charging'] },
    { base: 'Power Bank', tags: ['charging', 'portable', 'travel'] },
    { base: 'Smartwatch', tags: ['fitness', 'health', 'wearable'] },
    { base: 'Tablet Stand', tags: ['adjustable', 'portable', 'ergonomic'] },
    { base: 'Cable Organizer', tags: ['organization', 'desk', 'tidy'] },
    { base: 'Phone Charger', tags: ['fast-charging', 'wireless', 'portable'] },
    { base: 'Laptop Sleeve', tags: ['protection', 'portable', 'travel'] },
    { base: 'Ring Light', tags: ['lighting', 'streaming', 'photography'] }
  ],
  'Sports': [
    { base: 'Running Shoes', tags: ['running', 'athletic', 'cushioned'] },
    { base: 'Yoga Mat', tags: ['yoga', 'fitness', 'non-slip'] },
    { base: 'Dumbbells', tags: ['weights', 'strength', 'home-gym'] },
    { base: 'Resistance Bands', tags: ['workout', 'portable', 'stretching'] },
    { base: 'Jump Rope', tags: ['cardio', 'portable', 'fitness'] },
    { base: 'Foam Roller', tags: ['recovery', 'massage', 'stretching'] },
    { base: 'Water Bottle', tags: ['hydration', 'insulated', 'portable'] },
    { base: 'Gym Bag', tags: ['storage', 'travel', 'durable'] },
    { base: 'Fitness Tracker', tags: ['health', 'wearable', 'tracking'] },
    { base: 'Workout Gloves', tags: ['grip', 'protection', 'lifting'] },
    { base: 'Exercise Ball', tags: ['core', 'balance', 'stretching'] },
    { base: 'Pull-Up Bar', tags: ['strength', 'home-gym', 'bodyweight'] },
    { base: 'Kettlebell', tags: ['weights', 'strength', 'functional'] },
    { base: 'Bike Helmet', tags: ['safety', 'cycling', 'protection'] },
    { base: 'Sports Socks', tags: ['athletic', 'moisture-wicking', 'comfort'] }
  ],
  'Home': [
    { base: 'Bed Sheets', tags: ['bedding', 'cotton', 'comfort'] },
    { base: 'Pillow', tags: ['sleep', 'support', 'comfort'] },
    { base: 'Blanket', tags: ['cozy', 'warmth', 'soft'] },
    { base: 'Desk Lamp', tags: ['lighting', 'adjustable', 'led'] },
    { base: 'Plant Pot', tags: ['garden', 'decor', 'ceramic'] },
    { base: 'Diffuser', tags: ['aromatherapy', 'relaxation', 'wellness'] },
    { base: 'Candle Set', tags: ['aromatherapy', 'decor', 'relaxation'] },
    { base: 'Wall Art', tags: ['decor', 'modern', 'aesthetic'] },
    { base: 'Throw Pillow', tags: ['decor', 'comfort', 'stylish'] },
    { base: 'Area Rug', tags: ['decor', 'comfort', 'flooring'] },
    { base: 'Storage Basket', tags: ['organization', 'decor', 'storage'] },
    { base: 'Photo Frame', tags: ['decor', 'display', 'memories'] },
    { base: 'Door Mat', tags: ['entrance', 'durable', 'decor'] },
    { base: 'Curtains', tags: ['window', 'decor', 'privacy'] },
    { base: 'Humidifier', tags: ['wellness', 'air-quality', 'comfort'] }
  ],
  'Kitchen': [
    { base: 'Knife Set', tags: ['cutlery', 'professional', 'sharp'] },
    { base: 'Cutting Board', tags: ['prep', 'durable', 'eco-friendly'] },
    { base: 'Skillet', tags: ['cookware', 'non-stick', 'durable'] },
    { base: 'Blender', tags: ['appliance', 'smoothies', 'powerful'] },
    { base: 'Coffee Maker', tags: ['coffee', 'brewing', 'automatic'] },
    { base: 'Toaster', tags: ['appliance', 'breakfast', 'compact'] },
    { base: 'Food Container Set', tags: ['storage', 'meal-prep', 'airtight'] },
    { base: 'Measuring Cups', tags: ['baking', 'precision', 'stainless'] },
    { base: 'Mixing Bowl Set', tags: ['prep', 'nesting', 'versatile'] },
    { base: 'Spatula Set', tags: ['cooking', 'heat-resistant', 'non-stick'] },
    { base: 'Tea Kettle', tags: ['tea', 'boiling', 'stainless'] },
    { base: 'Spice Rack', tags: ['organization', 'storage', 'compact'] },
    { base: 'Wine Opener', tags: ['bar', 'entertaining', 'durable'] },
    { base: 'Ice Cube Tray', tags: ['drinks', 'freezer', 'silicone'] },
    { base: 'Kitchen Timer', tags: ['cooking', 'digital', 'magnetic'] }
  ],
  'Fashion': [
    { base: 'Leather Wallet', tags: ['leather', 'rfid', 'slim'] },
    { base: 'Sunglasses', tags: ['uv-protection', 'stylish', 'polarized'] },
    { base: 'Watch', tags: ['timepiece', 'elegant', 'durable'] },
    { base: 'Belt', tags: ['leather', 'adjustable', 'classic'] },
    { base: 'Scarf', tags: ['warm', 'stylish', 'versatile'] },
    { base: 'Backpack', tags: ['travel', 'laptop', 'spacious'] },
    { base: 'Messenger Bag', tags: ['professional', 'laptop', 'leather'] },
    { base: 'Baseball Cap', tags: ['casual', 'adjustable', 'cotton'] },
    { base: 'Gloves', tags: ['warm', 'touchscreen', 'leather'] },
    { base: 'Tie', tags: ['formal', 'silk', 'elegant'] },
    { base: 'Bracelet', tags: ['jewelry', 'stylish', 'adjustable'] },
    { base: 'Earrings', tags: ['jewelry', 'elegant', 'hypoallergenic'] },
    { base: 'Necklace', tags: ['jewelry', 'pendant', 'minimalist'] },
    { base: 'Tote Bag', tags: ['spacious', 'casual', 'durable'] },
    { base: 'Beanie', tags: ['warm', 'winter', 'knit'] }
  ],
  'Health': [
    { base: 'Protein Powder', tags: ['nutrition', 'fitness', 'muscle'] },
    { base: 'Vitamins', tags: ['supplements', 'health', 'daily'] },
    { base: 'Sleep Mask', tags: ['sleep', 'comfort', 'travel'] },
    { base: 'Massage Gun', tags: ['recovery', 'muscle', 'portable'] },
    { base: 'First Aid Kit', tags: ['safety', 'emergency', 'compact'] },
    { base: 'Hand Sanitizer', tags: ['hygiene', 'portable', 'antibacterial'] },
    { base: 'Heating Pad', tags: ['pain-relief', 'therapeutic', 'electric'] },
    { base: 'Blood Pressure Monitor', tags: ['health', 'monitoring', 'digital'] },
    { base: 'Thermometer', tags: ['health', 'accurate', 'digital'] },
    { base: 'Pill Organizer', tags: ['medication', 'organization', 'weekly'] },
    { base: 'Compression Socks', tags: ['circulation', 'recovery', 'comfort'] },
    { base: 'Eye Drops', tags: ['eye-care', 'hydration', 'relief'] },
    { base: 'Melatonin Gummies', tags: ['sleep', 'natural', 'supplements'] },
    { base: 'Probiotics', tags: ['gut-health', 'supplements', 'daily'] },
    { base: 'Collagen Powder', tags: ['skin', 'supplements', 'beauty'] }
  ],
  'Furniture': [
    { base: 'Office Chair', tags: ['ergonomic', 'adjustable', 'lumbar'] },
    { base: 'Standing Desk', tags: ['adjustable', 'ergonomic', 'electric'] },
    { base: 'Bookshelf', tags: ['storage', 'display', 'wood'] },
    { base: 'Side Table', tags: ['living-room', 'compact', 'modern'] },
    { base: 'TV Stand', tags: ['entertainment', 'storage', 'modern'] },
    { base: 'Shoe Rack', tags: ['organization', 'entryway', 'compact'] },
    { base: 'Coat Rack', tags: ['entryway', 'storage', 'freestanding'] },
    { base: 'Ottoman', tags: ['seating', 'storage', 'footrest'] },
    { base: 'Bar Stool', tags: ['seating', 'counter-height', 'modern'] },
    { base: 'Nightstand', tags: ['bedroom', 'storage', 'compact'] },
    { base: 'Desk', tags: ['office', 'workspace', 'storage'] },
    { base: 'Filing Cabinet', tags: ['office', 'storage', 'organization'] },
    { base: 'Room Divider', tags: ['privacy', 'decor', 'foldable'] },
    { base: 'Bean Bag', tags: ['seating', 'casual', 'comfortable'] },
    { base: 'Floating Shelf', tags: ['wall-mounted', 'display', 'modern'] }
  ],
  'Beauty': [
    { base: 'Makeup Brush Set', tags: ['makeup', 'professional', 'soft'] },
    { base: 'Face Moisturizer', tags: ['skincare', 'hydrating', 'daily'] },
    { base: 'Hair Dryer', tags: ['haircare', 'styling', 'ionic'] },
    { base: 'Curling Iron', tags: ['haircare', 'styling', 'ceramic'] },
    { base: 'Face Serum', tags: ['skincare', 'anti-aging', 'vitamin-c'] },
    { base: 'Makeup Mirror', tags: ['vanity', 'led', 'magnifying'] },
    { base: 'Nail Polish Set', tags: ['nails', 'colorful', 'long-lasting'] },
    { base: 'Facial Cleanser', tags: ['skincare', 'gentle', 'daily'] },
    { base: 'Hair Straightener', tags: ['haircare', 'styling', 'ceramic'] },
    { base: 'Body Lotion', tags: ['skincare', 'moisturizing', 'fragrant'] },
    { base: 'Lip Balm Set', tags: ['lips', 'hydrating', 'natural'] },
    { base: 'Eye Cream', tags: ['skincare', 'anti-aging', 'hydrating'] },
    { base: 'Shampoo & Conditioner', tags: ['haircare', 'sulfate-free', 'nourishing'] },
    { base: 'Face Mask Set', tags: ['skincare', 'spa', 'hydrating'] },
    { base: 'Perfume', tags: ['fragrance', 'elegant', 'long-lasting'] }
  ],
  'Office': [
    { base: 'Desk Organizer', tags: ['organization', 'storage', 'mesh'] },
    { base: 'Notebook Set', tags: ['writing', 'planning', 'lined'] },
    { base: 'Pen Set', tags: ['writing', 'professional', 'smooth'] },
    { base: 'Stapler', tags: ['supplies', 'heavy-duty', 'durable'] },
    { base: 'Paper Shredder', tags: ['security', 'office', 'cross-cut'] },
    { base: 'Whiteboard', tags: ['planning', 'magnetic', 'erasable'] },
    { base: 'Desk Calendar', tags: ['planning', 'organization', 'daily'] },
    { base: 'File Folders', tags: ['organization', 'storage', 'colored'] },
    { base: 'Sticky Notes', tags: ['reminders', 'colorful', 'adhesive'] },
    { base: 'Tape Dispenser', tags: ['supplies', 'weighted', 'desktop'] },
    { base: 'Calculator', tags: ['math', 'scientific', 'solar'] },
    { base: 'Letter Tray', tags: ['organization', 'stacking', 'mesh'] },
    { base: 'Clipboard', tags: ['writing', 'portable', 'storage'] },
    { base: 'Binder Clips', tags: ['supplies', 'assorted', 'durable'] },
    { base: 'Highlighters', tags: ['writing', 'colorful', 'chisel-tip'] }
  ],
  'Food & Beverages': [
    { base: 'Green Tea', tags: ['tea', 'organic', 'antioxidant'] },
    { base: 'Coffee Beans', tags: ['coffee', 'whole-bean', 'arabica'] },
    { base: 'Dark Chocolate', tags: ['snack', 'organic', 'fair-trade'] },
    { base: 'Mixed Nuts', tags: ['snack', 'protein', 'healthy'] },
    { base: 'Honey', tags: ['sweetener', 'raw', 'organic'] },
    { base: 'Olive Oil', tags: ['cooking', 'extra-virgin', 'organic'] },
    { base: 'Granola', tags: ['breakfast', 'healthy', 'organic'] },
    { base: 'Dried Fruit', tags: ['snack', 'natural', 'no-sugar'] },
    { base: 'Matcha Powder', tags: ['tea', 'energy', 'antioxidant'] },
    { base: 'Protein Bars', tags: ['snack', 'fitness', 'protein'] },
    { base: 'Herbal Tea', tags: ['tea', 'caffeine-free', 'relaxing'] },
    { base: 'Coconut Oil', tags: ['cooking', 'organic', 'cold-pressed'] },
    { base: 'Quinoa', tags: ['grain', 'protein', 'organic'] },
    { base: 'Almond Butter', tags: ['spread', 'protein', 'natural'] },
    { base: 'Sparkling Water', tags: ['beverage', 'zero-calorie', 'refreshing'] }
  ]
};

const descriptions = {
  'Headphones': 'High-quality audio with deep bass and crystal-clear highs',
  'Earbuds': 'Compact true wireless design with secure fit',
  'Speaker': 'Immersive 360-degree sound with powerful bass',
  'Keyboard': 'Responsive keys with comfortable typing experience',
  'Mouse': 'Precision tracking with ergonomic design',
  'Monitor Stand': 'Elevate your display for better posture',
  'Webcam': 'Crystal clear video for calls and streaming',
  'USB Hub': 'Expand connectivity with multiple ports',
  'Power Bank': 'Keep your devices charged on the go',
  'Smartwatch': 'Track fitness and stay connected',
  'Running Shoes': 'Responsive cushioning for maximum comfort',
  'Yoga Mat': 'Non-slip surface for stable practice',
  'Dumbbells': 'Build strength with adjustable weights',
  'Resistance Bands': 'Versatile workout tool for any fitness level',
  'Jump Rope': 'Fast cardio workout anywhere',
  'Foam Roller': 'Release muscle tension and improve recovery',
  'Water Bottle': 'Stay hydrated with insulated design',
  'Gym Bag': 'Spacious compartments for all your gear',
  'Bed Sheets': 'Soft and breathable for restful sleep',
  'Pillow': 'Supportive comfort for better sleep',
  'Blanket': 'Cozy warmth for relaxation',
  'Desk Lamp': 'Adjustable lighting for any task',
  'Knife Set': 'Sharp precision for every cut',
  'Cutting Board': 'Durable surface for food preparation',
  'Skillet': 'Even heat distribution for perfect cooking',
  'Blender': 'Powerful motor for smooth blending',
  'Coffee Maker': 'Brew perfect coffee every morning',
  'Leather Wallet': 'Slim design with RFID protection',
  'Sunglasses': 'UV protection with stylish frames',
  'Watch': 'Timeless elegance for any occasion',
  'Protein Powder': 'Quality nutrition for muscle recovery',
  'Vitamins': 'Daily essentials for optimal health',
  'Sleep Mask': 'Block light for deeper sleep',
  'Office Chair': 'All-day comfort with lumbar support',
  'Standing Desk': 'Adjustable height for active working',
  'Makeup Brush Set': 'Professional tools for flawless application',
  'Face Moisturizer': 'Hydrating formula for healthy skin',
  'Desk Organizer': 'Keep your workspace tidy and efficient',
  'Notebook Set': 'Quality paper for smooth writing',
  'Green Tea': 'Refreshing and full of antioxidants',
  'Coffee Beans': 'Rich aroma and smooth flavor'
};

function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomPrice(min, max) {
  return Math.round((Math.random() * (max - min) + min) * 100) / 100;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomDate(start, end) {
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return date.toISOString().split('T')[0];
}

function generateProduct(id) {
  const category = getRandomElement(categories);
  const subcategory = getRandomElement(category.subcategories);
  const templates = productTemplates[category.name] || productTemplates['Electronics'];
  const template = getRandomElement(templates);
  const adjective = getRandomElement(adjectives);
  const brand = getRandomElement(brands);

  const name = `${adjective} ${template.base}`;
  const description = descriptions[template.base] || `High-quality ${template.base.toLowerCase()} for everyday use`;

  const priceRanges = {
    'Electronics': [29.99, 299.99],
    'Sports': [14.99, 199.99],
    'Home': [19.99, 149.99],
    'Kitchen': [14.99, 199.99],
    'Fashion': [19.99, 249.99],
    'Health': [9.99, 89.99],
    'Furniture': [49.99, 499.99],
    'Beauty': [9.99, 79.99],
    'Office': [4.99, 99.99],
    'Food & Beverages': [9.99, 49.99]
  };

  const [minPrice, maxPrice] = priceRanges[category.name] || [19.99, 99.99];

  return {
    id,
    name,
    description: `${description}. Perfect for ${subcategory.toLowerCase()} enthusiasts.`,
    price: getRandomPrice(minPrice, maxPrice),
    category: category.name,
    subcategory,
    brand,
    stock: getRandomInt(0, 300),
    rating: Math.round((3.5 + Math.random() * 1.5) * 10) / 10,
    reviewCount: getRandomInt(10, 2000),
    image: `https://picsum.photos/seed/prod${id}/400/400`,
    tags: template.tags,
    createdAt: getRandomDate(new Date('2023-01-01'), new Date('2024-12-01'))
  };
}

// Generate 20000 products
const products = [];
for (let i = 1; i <= 20000; i++) {
  products.push(generateProduct(i));
}

const data = { products };

fs.writeFileSync('products.json', JSON.stringify(data, null, 2));
console.log(`Generated ${products.length} products`);
console.log('Categories:', [...new Set(products.map(p => p.category))].join(', '));

const products = [
  // Electronics
  {
    id: 1,
    name: "Apple AirPods Pro (2nd Generation) Wireless Earbuds",
    price: 189.99,
    originalPrice: 249.99,
    image: "https://picsum.photos/seed/airpods/400/400",
    rating: 4.7,
    numReviews: 89432,
    category: "Electronics",
    description: "Active Noise Cancellation reduces unwanted background noise. Transparency mode lets outside sounds in so you can hear the world around you. Personalized Spatial Audio with dynamic head tracking delivers an immersive listening experience.",
    brand: "Apple",
    inStock: true,
    prime: true,
    features: [
      "Active Noise Cancellation for immersive sound",
      "Transparency mode for awareness",
      "Personalized Spatial Audio",
      "Up to 6 hours of listening time",
      "Sweat and water resistant",
      "MagSafe charging case"
    ],
    specifications: {
      "Brand": "Apple",
      "Model": "AirPods Pro 2",
      "Color": "White",
      "Connectivity": "Bluetooth 5.3",
      "Weight": "5.3 grams"
    }
  },
  {
    id: 2,
    name: "Samsung 65\" Class Crystal UHD 4K Smart TV",
    price: 479.99,
    originalPrice: 599.99,
    image: "https://picsum.photos/seed/samsung-tv/400/400",
    rating: 4.5,
    numReviews: 23456,
    category: "Electronics",
    description: "Crystal Processor 4K automatically transforms content for stunning picture quality. Crystal Display delivers natural and true-to-life colors. Smart TV powered by Tizen gives you access to your favorite streaming apps.",
    brand: "Samsung",
    inStock: true,
    prime: true,
    features: [
      "Crystal Processor 4K",
      "HDR Support",
      "Smart TV with Tizen OS",
      "Voice Control with Bixby",
      "3 HDMI Ports",
      "60Hz Refresh Rate"
    ],
    specifications: {
      "Brand": "Samsung",
      "Screen Size": "65 Inches",
      "Resolution": "3840 x 2160",
      "Refresh Rate": "60 Hz",
      "Smart Platform": "Tizen"
    }
  },
  {
    id: 3,
    name: "Sony WH-1000XM5 Wireless Noise Canceling Headphones",
    price: 298.00,
    originalPrice: 399.99,
    image: "https://picsum.photos/seed/sony-xm5/400/400",
    rating: 4.8,
    numReviews: 45678,
    category: "Electronics",
    description: "Industry-leading noise cancellation with Auto NC Optimizer. Crystal clear hands-free calling with 4 beamforming microphones. Up to 30 hours of battery life with quick charging.",
    brand: "Sony",
    inStock: true,
    prime: true,
    features: [
      "Industry-leading noise cancellation",
      "30-hour battery life",
      "Multipoint connectivity",
      "Speak-to-Chat technology",
      "Adaptive Sound Control",
      "USB-C quick charging"
    ],
    specifications: {
      "Brand": "Sony",
      "Model": "WH-1000XM5",
      "Color": "Black",
      "Battery Life": "30 hours",
      "Weight": "250 grams"
    }
  },
  {
    id: 4,
    name: "Apple iPad (10.2-inch, 64GB, Wi-Fi) - Silver",
    price: 249.00,
    originalPrice: 329.00,
    image: "https://picsum.photos/seed/ipad-silver/400/400",
    rating: 4.8,
    numReviews: 67890,
    category: "Electronics",
    description: "The most popular iPad is now even more capable with the A13 Bionic chip. Features a 10.2-inch Retina display, 8MP back camera, and all-day battery life.",
    brand: "Apple",
    inStock: true,
    prime: true,
    features: [
      "A13 Bionic chip",
      "10.2-inch Retina display",
      "8MP back camera",
      "12MP front camera",
      "All-day battery life",
      "Supports Apple Pencil"
    ],
    specifications: {
      "Brand": "Apple",
      "Screen Size": "10.2 Inches",
      "Storage": "64GB",
      "Color": "Silver",
      "Processor": "A13 Bionic"
    }
  },
  {
    id: 5,
    name: "Logitech MX Master 3S Wireless Mouse",
    price: 89.99,
    originalPrice: 99.99,
    image: "https://picsum.photos/seed/mx-master/400/400",
    rating: 4.6,
    numReviews: 12345,
    category: "Electronics",
    description: "Quiet clicks and an 8K DPI track-on-glass sensor. MagSpeed electromagnetic scroll wheel for ultra-fast scrolling. Ergonomic design shaped for right-hand comfort.",
    brand: "Logitech",
    inStock: true,
    prime: true,
    features: [
      "8K DPI track-on-glass sensor",
      "MagSpeed scroll wheel",
      "USB-C quick charging",
      "Connect up to 3 devices",
      "Quiet clicks",
      "Ergonomic design"
    ],
    specifications: {
      "Brand": "Logitech",
      "DPI": "8000",
      "Connectivity": "Bluetooth / USB",
      "Battery": "70 days",
      "Weight": "141 grams"
    }
  },
  {
    id: 6,
    name: "JBL Tune 510BT Wireless On-Ear Headphones",
    price: 24.95,
    originalPrice: 49.95,
    image: "https://picsum.photos/seed/jbl-tune/400/400",
    rating: 4.4,
    numReviews: 34567,
    category: "Electronics",
    description: "JBL Pure Bass sound available everywhere. Multipoint connection lets you switch between two Bluetooth devices. Up to 40 hours of battery life with quick charge.",
    brand: "JBL",
    inStock: true,
    prime: true,
    features: [
      "JBL Pure Bass sound",
      "40-hour battery life",
      "Multipoint connection",
      "Hands-free calls",
      "Voice assistant support",
      "Foldable design"
    ],
    specifications: {
      "Brand": "JBL",
      "Battery Life": "40 hours",
      "Driver Size": "32mm",
      "Bluetooth": "5.0",
      "Weight": "160 grams"
    }
  },

  // Books
  {
    id: 7,
    name: "Atomic Habits: An Easy & Proven Way to Build Good Habits",
    price: 11.98,
    originalPrice: 18.00,
    image: "https://picsum.photos/seed/atomic-habits/400/400",
    rating: 4.8,
    numReviews: 112345,
    category: "Books",
    description: "No matter your goals, Atomic Habits offers a proven framework for improving—every day. James Clear reveals practical strategies that will teach you how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results.",
    brand: "Penguin Random House",
    inStock: true,
    prime: true,
    features: [
      "New York Times Bestseller",
      "320 pages",
      "Practical strategies for habit formation",
      "Science-based approach",
      "Includes habit stacking template",
      "Perfect for self-improvement"
    ],
    specifications: {
      "Publisher": "Avery",
      "Pages": "320",
      "Language": "English",
      "ISBN-10": "0735211299",
      "Dimensions": "5.5 x 0.8 x 8.4 inches"
    }
  },
  {
    id: 8,
    name: "The Psychology of Money: Timeless Lessons on Wealth",
    price: 12.49,
    originalPrice: 19.99,
    image: "https://picsum.photos/seed/psych-money/400/400",
    rating: 4.7,
    numReviews: 67890,
    category: "Books",
    description: "Doing well with money isn't necessarily about what you know. It's about how you behave. And behavior is hard to teach, even to really smart people. Morgan Housel shares 19 short stories exploring the strange ways people think about money.",
    brand: "Harriman House",
    inStock: true,
    prime: true,
    features: [
      "New York Times Bestseller",
      "256 pages",
      "Personal finance classics",
      "Easy to read stories",
      "Warren Buffett recommended",
      "Perfect for beginners"
    ],
    specifications: {
      "Publisher": "Harriman House",
      "Pages": "256",
      "Language": "English",
      "ISBN-10": "085719769X",
      "Dimensions": "5.3 x 0.6 x 8.0 inches"
    }
  },
  {
    id: 9,
    name: "Dune: Book One (Dune Chronicles)",
    price: 9.99,
    originalPrice: 18.99,
    image: "https://picsum.photos/seed/dune-book/400/400",
    rating: 4.6,
    numReviews: 45678,
    category: "Books",
    description: "Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides, heir to a noble family charged with ruling an inhospitable world. A stunning blend of adventure and mysticism, environmentalism and politics.",
    brand: "Ace",
    inStock: true,
    prime: true,
    features: [
      "Hugo Award Winner",
      "Nebula Award Winner",
      "784 pages",
      "Science Fiction classic",
      "Major motion picture tie-in",
      "Series: Dune Chronicles #1"
    ],
    specifications: {
      "Publisher": "Ace",
      "Pages": "784",
      "Language": "English",
      "ISBN-10": "0441013597",
      "Dimensions": "4.2 x 1.1 x 7.5 inches"
    }
  },
  {
    id: 10,
    name: "The 48 Laws of Power",
    price: 14.49,
    originalPrice: 25.00,
    image: "https://picsum.photos/seed/48-laws/400/400",
    rating: 4.7,
    numReviews: 34567,
    category: "Books",
    description: "Amoral, cunning, ruthless, and instructive, this New York Times bestseller distills 3,000 years of the history of power into 48 essential laws. Robert Greene's definitive guide to gaining and maintaining power.",
    brand: "Penguin Books",
    inStock: true,
    prime: true,
    features: [
      "New York Times Bestseller",
      "452 pages",
      "Historical examples throughout",
      "Universal principles of power",
      "Perfect for business leaders",
      "Includes 36 color illustrations"
    ],
    specifications: {
      "Publisher": "Penguin Books",
      "Pages": "452",
      "Language": "English",
      "ISBN-10": "0140280197",
      "Dimensions": "5.4 x 1.2 x 7.8 inches"
    }
  },

  // Home & Kitchen
  {
    id: 11,
    name: "Keurig K-Mini Single Serve Coffee Maker",
    price: 59.99,
    originalPrice: 89.99,
    image: "https://picsum.photos/seed/keurig-mini/400/400",
    rating: 4.5,
    numReviews: 56789,
    category: "Home & Kitchen",
    description: "Fresh-brewed deliciousness from the Keurig K-Mini coffee maker. At less than 5 inches wide, the K-Mini single serve coffee maker fits anywhere. Brew any cup size between 6-12 oz using Keurig K-Cup pods.",
    brand: "Keurig",
    inStock: true,
    prime: true,
    features: [
      "Less than 5 inches wide",
      "6-12 oz brew sizes",
      "One-cup reservoir",
      "Removable drip tray",
      "Energy efficient auto-off",
      "Compatible with K-Cup pods"
    ],
    specifications: {
      "Brand": "Keurig",
      "Capacity": "12 oz",
      "Color": "Matte Black",
      "Dimensions": "12.1 x 4.5 x 11.3 inches",
      "Weight": "4.6 pounds"
    }
  },
  {
    id: 12,
    name: "Instant Pot Duo 7-in-1 Electric Pressure Cooker, 6 Qt",
    price: 79.95,
    originalPrice: 99.99,
    image: "https://picsum.photos/seed/instant-pot/400/400",
    rating: 4.7,
    numReviews: 123456,
    category: "Home & Kitchen",
    description: "7-in-1 functionality: Pressure Cooker, Slow Cooker, Rice Cooker, Steamer, Sauté Pan, Yogurt Maker and Warmer. Cooks up to 70% faster. Over 13 customizable Smart Programs.",
    brand: "Instant Pot",
    inStock: true,
    prime: true,
    features: [
      "7-in-1 multi-cooker",
      "13 Smart Programs",
      "Stainless steel inner pot",
      "UL certified with 10+ safety features",
      "Cooks 3-6 servings",
      "Dishwasher safe parts"
    ],
    specifications: {
      "Brand": "Instant Pot",
      "Capacity": "6 Quarts",
      "Material": "Stainless Steel",
      "Dimensions": "13.38 x 12.2 x 12.48 inches",
      "Weight": "9.6 pounds"
    }
  },
  {
    id: 13,
    name: "Dyson V15 Detect Cordless Vacuum Cleaner",
    price: 649.99,
    originalPrice: 749.99,
    image: "https://picsum.photos/seed/dyson-v15/400/400",
    rating: 4.6,
    numReviews: 8765,
    category: "Home & Kitchen",
    description: "Dyson's most powerful, intelligent cordless vacuum. Laser reveals microscopic dust. Piezo sensor automatically measures and counts particles. LCD screen shows scientific proof of a deep clean.",
    brand: "Dyson",
    inStock: true,
    prime: true,
    features: [
      "Laser dust detection",
      "60 minutes runtime",
      "LCD particle count display",
      "HEPA whole-machine filtration",
      "Anti-tangle brush bar",
      "Converts to handheld"
    ],
    specifications: {
      "Brand": "Dyson",
      "Model": "V15 Detect",
      "Weight": "6.8 pounds",
      "Battery Life": "60 minutes",
      "Bin Volume": "0.2 gallons"
    }
  },
  {
    id: 14,
    name: "Lodge 10.25 Inch Cast Iron Skillet",
    price: 19.90,
    originalPrice: 29.99,
    image: "https://picsum.photos/seed/lodge-skillet/400/400",
    rating: 4.8,
    numReviews: 89012,
    category: "Home & Kitchen",
    description: "Pre-seasoned 10.25-inch cast iron skillet ready to use. Unparalleled heat retention and even heating. Use on all cooking surfaces, grills, and campfires.",
    brand: "Lodge",
    inStock: true,
    prime: true,
    features: [
      "Pre-seasoned and ready to use",
      "Superior heat retention",
      "Use on any cooktop",
      "Oven safe to 500°F",
      "Made in USA",
      "Unlimited lifetime warranty"
    ],
    specifications: {
      "Brand": "Lodge",
      "Material": "Cast Iron",
      "Diameter": "10.25 inches",
      "Weight": "5 pounds",
      "Country of Origin": "USA"
    }
  },

  // Fashion
  {
    id: 15,
    name: "Levi's Men's 511 Slim Fit Jeans",
    price: 34.99,
    originalPrice: 59.50,
    image: "https://picsum.photos/seed/levis-jeans/400/400",
    rating: 4.5,
    numReviews: 45678,
    category: "Fashion",
    description: "A modern slim jean with room through the hip and thigh that narrows at the ankle. Sits below waist. Slim through hip and thigh. Made with stretch for all-day comfort.",
    brand: "Levi's",
    inStock: true,
    prime: true,
    features: [
      "Slim fit through hip and thigh",
      "Sits below waist",
      "Stretch for comfort",
      "Classic 5-pocket styling",
      "Machine washable",
      "Multiple washes available"
    ],
    specifications: {
      "Brand": "Levi's",
      "Fit": "Slim",
      "Material": "99% Cotton, 1% Elastane",
      "Rise": "Mid Rise",
      "Care": "Machine Wash"
    }
  },
  {
    id: 16,
    name: "Nike Men's Dri-FIT Training T-Shirt",
    price: 19.97,
    originalPrice: 30.00,
    image: "https://picsum.photos/seed/nike-dri/400/400",
    rating: 4.6,
    numReviews: 23456,
    category: "Fashion",
    description: "Nike Dri-FIT technology moves sweat away from your skin for quicker evaporation, helping you stay dry and comfortable. Standard fit for a relaxed, easy feel.",
    brand: "Nike",
    inStock: true,
    prime: true,
    features: [
      "Dri-FIT moisture-wicking technology",
      "Standard fit for relaxed feel",
      "Raglan sleeves for mobility",
      "Crew neck design",
      "Machine washable",
      "100% recycled polyester fibers"
    ],
    specifications: {
      "Brand": "Nike",
      "Material": "100% Recycled Polyester",
      "Fit": "Standard",
      "Care": "Machine Wash",
      "Technology": "Dri-FIT"
    }
  },
  {
    id: 17,
    name: "adidas Women's Cloudfoam Pure 2.0 Running Shoes",
    price: 49.99,
    originalPrice: 85.00,
    image: "https://picsum.photos/seed/adidas-cloud/400/400",
    rating: 4.4,
    numReviews: 34567,
    category: "Fashion",
    description: "Step into cloud-like comfort with Cloudfoam Pure 2.0 running shoes. The mesh upper with Cloudfoam cushioning keeps feet comfortable during runs and walks.",
    brand: "adidas",
    inStock: true,
    prime: true,
    features: [
      "Cloudfoam cushioning",
      "Mesh upper for breathability",
      "OrthoLite sockliner",
      "Rubber outsole",
      "Lace closure",
      "Made with Primegreen materials"
    ],
    specifications: {
      "Brand": "adidas",
      "Type": "Running Shoes",
      "Upper": "Mesh",
      "Cushioning": "Cloudfoam",
      "Outsole": "Rubber"
    }
  },

  // Sports & Outdoors
  {
    id: 18,
    name: "Yoga Mat, 6mm Thick Non-Slip Exercise Mat",
    price: 19.99,
    originalPrice: 34.99,
    image: "https://picsum.photos/seed/yoga-mat/400/400",
    rating: 4.5,
    numReviews: 56789,
    category: "Sports & Outdoors",
    description: "6mm thick exercise mat with double-sided non-slip surface. Eco-friendly TPE material. Includes carrying strap. Perfect for yoga, pilates, floor exercises.",
    brand: "BalanceFrom",
    inStock: true,
    prime: true,
    features: [
      "6mm thick for joint protection",
      "Double-sided non-slip surface",
      "Eco-friendly TPE material",
      "Carrying strap included",
      "Moisture-resistant",
      "Available in 12 colors"
    ],
    specifications: {
      "Material": "TPE",
      "Thickness": "6mm",
      "Dimensions": "72 x 26 inches",
      "Weight": "2.2 pounds",
      "Includes": "Carrying Strap"
    }
  },
  {
    id: 19,
    name: "Hydro Flask Wide Mouth 32 oz Water Bottle",
    price: 34.95,
    originalPrice: 44.95,
    image: "https://picsum.photos/seed/hydroflask/400/400",
    rating: 4.8,
    numReviews: 67890,
    category: "Sports & Outdoors",
    description: "TempShield double-wall vacuum insulation keeps drinks cold up to 24 hours or hot up to 12 hours. Durable 18/8 pro-grade stainless steel construction.",
    brand: "Hydro Flask",
    inStock: true,
    prime: true,
    features: [
      "Cold up to 24 hours",
      "Hot up to 12 hours",
      "18/8 pro-grade stainless steel",
      "Durable powder coat finish",
      "Wide mouth for easy filling",
      "BPA-free and phthalate-free"
    ],
    specifications: {
      "Brand": "Hydro Flask",
      "Capacity": "32 oz",
      "Material": "Stainless Steel",
      "Insulation": "Double-wall vacuum",
      "Weight": "0.92 pounds"
    }
  },
  {
    id: 20,
    name: "Fitbit Charge 5 Advanced Fitness & Health Tracker",
    price: 99.95,
    originalPrice: 149.95,
    image: "https://picsum.photos/seed/fitbit-c5/400/400",
    rating: 4.4,
    numReviews: 23456,
    category: "Sports & Outdoors",
    description: "Advanced health metrics. Built-in GPS. Stress management tools. Sleep tracking. Daily Readiness Score. Color touchscreen display.",
    brand: "Fitbit",
    inStock: true,
    prime: true,
    features: [
      "Built-in GPS",
      "ECG heart rhythm assessment",
      "EDA sensor for stress management",
      "Sleep tracking with sleep score",
      "7-day battery life",
      "Water resistant to 50m"
    ],
    specifications: {
      "Brand": "Fitbit",
      "Display": "AMOLED",
      "Battery Life": "7 days",
      "Water Resistance": "50 meters",
      "Connectivity": "Bluetooth 5.0"
    }
  },

  // Toys & Games
  {
    id: 21,
    name: "LEGO Star Wars Millennium Falcon Building Set",
    price: 149.99,
    originalPrice: 169.99,
    image: "https://picsum.photos/seed/lego-falcon/400/400",
    rating: 4.9,
    numReviews: 12345,
    category: "Toys & Games",
    description: "Build the fastest ship in the galaxy! This detailed LEGO model of the Millennium Falcon includes 7 mini-figures and an extensive interior. Over 1,350 pieces for an epic build.",
    brand: "LEGO",
    inStock: true,
    prime: true,
    features: [
      "1,353 pieces",
      "7 mini-figures included",
      "Detailed interior",
      "Opening top panel",
      "Removable hull panels",
      "For ages 10+"
    ],
    specifications: {
      "Brand": "LEGO",
      "Theme": "Star Wars",
      "Pieces": "1,353",
      "Ages": "10+",
      "Dimensions": "19 x 5 x 14 inches"
    }
  },
  {
    id: 22,
    name: "Nintendo Switch OLED Model - White Bundle",
    price: 349.99,
    originalPrice: 349.99,
    image: "https://picsum.photos/seed/switch-oled/400/400",
    rating: 4.8,
    numReviews: 34567,
    category: "Toys & Games",
    description: "7-inch OLED screen for vibrant colors and crisp contrast. Wide adjustable stand for tabletop mode. Enhanced audio. 64GB internal storage. Wired LAN port in dock.",
    brand: "Nintendo",
    inStock: true,
    prime: true,
    features: [
      "7-inch OLED display",
      "Wide adjustable stand",
      "64GB internal storage",
      "Enhanced audio",
      "Wired LAN port",
      "6-9 hours battery life"
    ],
    specifications: {
      "Brand": "Nintendo",
      "Display": "7-inch OLED",
      "Storage": "64GB",
      "Battery": "4.5-9 hours",
      "Resolution": "1280 x 720"
    }
  },
  {
    id: 23,
    name: "Monopoly Classic Board Game",
    price: 14.99,
    originalPrice: 19.99,
    image: "https://picsum.photos/seed/monopoly/400/400",
    rating: 4.7,
    numReviews: 56789,
    category: "Toys & Games",
    description: "The fast-dealing property trading game. Buy, sell, dream, and scheme your way to riches. Classic Monopoly gameplay the whole family can enjoy.",
    brand: "Hasbro",
    inStock: true,
    prime: true,
    features: [
      "Classic Monopoly gameplay",
      "For 2-8 players",
      "Ages 8 and up",
      "Includes game board, tokens, and cards",
      "Average game time: 60 minutes",
      "Family favorite for generations"
    ],
    specifications: {
      "Brand": "Hasbro",
      "Players": "2-8",
      "Ages": "8+",
      "Game Time": "60 minutes",
      "Dimensions": "15.8 x 10.8 x 2.3 inches"
    }
  },

  // Beauty
  {
    id: 24,
    name: "CeraVe Moisturizing Cream 16 oz Daily Face & Body",
    price: 16.99,
    originalPrice: 21.99,
    image: "https://picsum.photos/seed/cerave/400/400",
    rating: 4.8,
    numReviews: 89012,
    category: "Beauty",
    description: "MVE Technology provides 24-hour hydration. Contains 3 essential ceramides and hyaluronic acid. Developed with dermatologists. Suitable for dry to very dry skin.",
    brand: "CeraVe",
    inStock: true,
    prime: true,
    features: [
      "24-hour hydration with MVE Technology",
      "3 essential ceramides",
      "Hyaluronic acid",
      "Developed with dermatologists",
      "Fragrance-free",
      "Accepted by National Eczema Association"
    ],
    specifications: {
      "Brand": "CeraVe",
      "Size": "16 oz",
      "Skin Type": "Dry to Very Dry",
      "Key Ingredients": "Ceramides, Hyaluronic Acid",
      "Fragrance": "Free"
    }
  },
  {
    id: 25,
    name: "Oral-B Pro 1000 CrossAction Electric Toothbrush",
    price: 39.94,
    originalPrice: 69.99,
    image: "https://picsum.photos/seed/oralb/400/400",
    rating: 4.6,
    numReviews: 45678,
    category: "Beauty",
    description: "Professional clean with Oral-B's unique CrossAction brush head. 3D cleaning action oscillates, rotates, and pulsates. In-handle timer pulses every 30 seconds.",
    brand: "Oral-B",
    inStock: true,
    prime: true,
    features: [
      "CrossAction brush head",
      "3D cleaning action",
      "2-minute professional timer",
      "Pressure sensor",
      "1 mode: Daily Clean",
      "Battery lasts 1 week"
    ],
    specifications: {
      "Brand": "Oral-B",
      "Battery Life": "1 week",
      "Modes": "1 (Daily Clean)",
      "Timer": "2 minutes",
      "Charger": "Charging station"
    }
  },

  // Pet Supplies
  {
    id: 26,
    name: "Blue Buffalo Life Protection Formula Dry Dog Food",
    price: 42.98,
    originalPrice: 54.99,
    image: "https://picsum.photos/seed/blue-buffalo/400/400",
    rating: 4.7,
    numReviews: 23456,
    category: "Pet Supplies",
    description: "Real meat is the #1 ingredient. Contains LifeSource Bits with antioxidants, vitamins, and minerals. No corn, wheat, soy, or artificial preservatives. Formulated for adult dogs.",
    brand: "Blue Buffalo",
    inStock: true,
    prime: true,
    features: [
      "Real chicken #1 ingredient",
      "LifeSource Bits with antioxidants",
      "No corn, wheat, or soy",
      "No artificial preservatives",
      "Omega-3 & 6 for skin & coat",
      "Glucosamine for joints"
    ],
    specifications: {
      "Brand": "Blue Buffalo",
      "Weight": "30 lbs",
      "Flavor": "Chicken & Brown Rice",
      "Life Stage": "Adult",
      "Diet": "No Corn, Wheat, or Soy"
    }
  },
  {
    id: 27,
    name: "Furminator Undercoat Deshedding Tool for Large Dogs",
    price: 24.49,
    originalPrice: 34.99,
    image: "https://picsum.photos/seed/furminator/400/400",
    rating: 4.7,
    numReviews: 34567,
    category: "Pet Supplies",
    description: "Removes loose undercoat hair. FURejector button releases hair with ease. Stainless steel deshedding edge reaches through topcoat. Designed for large dogs over 51 lbs.",
    brand: "FURminator",
    inStock: true,
    prime: true,
    features: [
      "Removes loose undercoat hair",
      "FURejector button",
      "Stainless steel edge",
      "For dogs over 51 lbs",
      "Reduces shedding by up to 90%",
      "Ergonomic handle"
    ],
    specifications: {
      "Brand": "FURminator",
      "For Dogs": "Over 51 lbs",
      "Edge": "Stainless Steel",
      "Edge Length": "3.65 inches",
      "Color": "Black/Red"
    }
  },

  // Automotive
  {
    id: 28,
    name: "Nextbase 322GW Dash Cam 1080p/60fps HD",
    price: 89.99,
    originalPrice: 129.99,
    image: "https://picsum.photos/seed/dashcam/400/400",
    rating: 4.3,
    numReviews: 12345,
    category: "Automotive",
    description: "1080p/60fps HD recording with 140° wide viewing angle. Built-in GPS and Alexa capability. Night vision and parking mode. Magnetic mount for easy installation.",
    brand: "Nextbase",
    inStock: true,
    prime: true,
    features: [
      "1080p/60fps HD recording",
      "140° wide viewing angle",
      "Built-in GPS",
      "Alexa built-in",
      "Night vision",
      "Emergency SOS"
    ],
    specifications: {
      "Brand": "Nextbase",
      "Resolution": "1080p/60fps",
      "Field of View": "140°",
      "GPS": "Built-in",
      "Mount": "Magnetic"
    }
  },
  {
    id: 29,
    name: "Chemical Guys Complete Car Care Kit (16 oz Bottles)",
    price: 69.99,
    originalPrice: 99.99,
    image: "https://picsum.photos/seed/chem-guys/400/400",
    rating: 4.5,
    numReviews: 8765,
    category: "Automotive",
    description: "Everything you need to clean and protect your car. Includes wash, wax, interior cleaner, glass cleaner, microfiber towels, and applicators. Professional grade car care.",
    brand: "Chemical Guys",
    inStock: true,
    prime: true,
    features: [
      "Complete car care solution",
      "Professional grade products",
      "6 different products included",
      "Microfiber towels included",
      "Safe for all exterior surfaces",
      "Easy to use for beginners"
    ],
    specifications: {
      "Brand": "Chemical Guys",
      "Items": "12 pieces",
      "Bottle Size": "16 oz each",
      "For": "All vehicle types",
      "Scent": "Signature"
    }
  },

  // Office Products
  {
    id: 30,
    name: "Amazon Basics Ergonomic Office Chair",
    price: 119.99,
    originalPrice: 159.99,
    image: "https://picsum.photos/seed/office-chair/400/400",
    rating: 4.3,
    numReviews: 23456,
    category: "Office Products",
    description: "Bonded leather office chair with padded seat, back, and armrests. Adjustable height and tilt tension. 360-degree swivel and smooth-rolling casters. Supports up to 275 pounds.",
    brand: "Amazon Basics",
    inStock: true,
    prime: true,
    features: [
      "Bonded leather upholstery",
      "Adjustable height",
      "Tilt tension control",
      "360-degree swivel",
      "Smooth-rolling casters",
      "Supports up to 275 lbs"
    ],
    specifications: {
      "Brand": "Amazon Basics",
      "Material": "Bonded Leather",
      "Max Weight": "275 lbs",
      "Seat Height": "Adjustable",
      "Color": "Black"
    }
  },
  {
    id: 31,
    name: "Fujitsu ScanSnap iX1600 Document Scanner",
    price: 359.00,
    originalPrice: 429.00,
    image: "https://picsum.photos/seed/scansnap/400/400",
    rating: 4.6,
    numReviews: 5678,
    category: "Office Products",
    description: "40 pages per minute scanning speed. 4.3 inch touchscreen. Scan to cloud, email, folder, and mobile. Intelligent scan optimization. Duplex scanning.",
    brand: "Fujitsu",
    inStock: true,
    prime: true,
    features: [
      "40 ppm scanning speed",
      "4.3 inch touchscreen",
      "Cloud connectivity",
      "Intelligent scan optimization",
      "Duplex scanning",
      "Wi-Fi connectivity"
    ],
    specifications: {
      "Brand": "Fujitsu",
      "Speed": "40 ppm",
      "Display": "4.3 inch touchscreen",
      "Connectivity": "Wi-Fi, USB",
      "Duplex": "Yes"
    }
  },
  {
    id: 32,
    name: "Bose SoundLink Flex Portable Bluetooth Speaker",
    price: 119.00,
    originalPrice: 149.00,
    image: "https://picsum.photos/seed/bose-flex/400/400",
    rating: 4.7,
    numReviews: 15678,
    category: "Electronics",
    description: "Portable Bluetooth speaker with deep, clear sound. PositionIQ technology detects orientation for optimal sound. IP67 waterproof, dustproof, and floats. 12-hour battery life.",
    brand: "Bose",
    inStock: true,
    prime: true,
    features: [
      "PositionIQ technology",
      "IP67 waterproof and dustproof",
      "Floats in water",
      "12-hour battery life",
      "USB-C charging",
      "Built-in microphone"
    ],
    specifications: {
      "Brand": "Bose",
      "Battery Life": "12 hours",
      "Water Resistance": "IP67",
      "Weight": "1.3 pounds",
      "Bluetooth": "5.1"
    }
  },
  {
    id: 33,
    name: "Under Armour Men's Tech 2.0 Short Sleeve Tee",
    price: 22.00,
    originalPrice: 30.00,
    image: "https://picsum.photos/seed/ua-tech/400/400",
    rating: 4.5,
    numReviews: 41234,
    category: "Fashion",
    description: "UA Tech fabric is ultra-soft for all-day comfort. Moisture-wicking material keeps you dry. Anti-odor technology prevents the growth of odor-causing microbes.",
    brand: "Under Armour",
    inStock: true,
    prime: true,
    features: [
      "UA Tech ultra-soft fabric",
      "Moisture-wicking",
      "Anti-odor technology",
      "4-way stretch material",
      "Smooth, chafe-free comfort",
      "Raglan sleeves"
    ],
    specifications: {
      "Brand": "Under Armour",
      "Material": "100% Polyester",
      "Fit": "Loose",
      "Care": "Machine Wash",
      "Technology": "UA Tech"
    }
  },
  {
    id: 34,
    name: "iRobot Roomba j7+ Self-Emptying Robot Vacuum",
    price: 399.99,
    originalPrice: 799.99,
    image: "https://picsum.photos/seed/roomba-j7/400/400",
    rating: 4.5,
    numReviews: 18765,
    category: "Home & Kitchen",
    description: "PrecisionVision Navigation identifies and avoids obstacles like cords and pet waste. Self-emptying for 60 days. 3-Stage Cleaning System lifts, suctions, and filters.",
    brand: "iRobot",
    inStock: true,
    prime: true,
    features: [
      "PrecisionVision Navigation",
      "Self-emptying for 60 days",
      "3-Stage Cleaning System",
      "Imprints Smart Mapping",
      "Works with Alexa & Google",
      "10x Power-Lifting Suction"
    ],
    specifications: {
      "Brand": "iRobot",
      "Model": "Roomba j7+",
      "Battery Life": "75 minutes",
      "Dustbin Capacity": "0.4 liters",
      "Navigation": "vSLAM"
    }
  },
  {
    id: 35,
    name: "Shark NV360 Navigator Lift-Away Professional Upright Vacuum",
    price: 149.99,
    originalPrice: 219.99,
    image: "https://picsum.photos/seed/shark-vac/400/400",
    rating: 4.6,
    numReviews: 56789,
    category: "Home & Kitchen",
    description: "Lift-Away functionality for cleaning under furniture and above-floor areas. Swivel steering for easy maneuverability. Never Lose Suction technology. Anti-Allergen Complete Seal.",
    brand: "Shark",
    inStock: true,
    prime: true,
    features: [
      "Lift-Away detachable pod",
      "Swivel steering",
      "Never Lose Suction technology",
      "Anti-Allergen Complete Seal",
      "Dust cup capacity: 1.2 quarts",
      "Includes multiple accessories"
    ],
    specifications: {
      "Brand": "Shark",
      "Weight": "13.7 pounds",
      "Capacity": "1.2 quarts",
      "Cord Length": "25 feet",
      "Filtration": "HEPA"
    }
  }
];

export default products;

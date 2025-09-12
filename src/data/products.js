
// --- DATA & CONTEXT ---
const getSaleEndDate = (days) => new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString();

// Deterministic 6-char base36 slug generator (alphanumeric)
const makeSlug = (input) => {
    let h = 2166136261 >>> 0;
    for (let i = 0; i < input.length; i++) {
        h ^= input.charCodeAt(i);
        h = Math.imul(h, 16777619) >>> 0;
    }
    let s = h.toString(36);
    if (s.length < 6) s = s.padStart(6, '0');
    return s.slice(0,6);
}

export const Products = [{
        id: 1,
        name: "Brown Brim",
        imageUrl: "https://i.ibb.co/ZYW3VTp/brown-brim.png",
        price: 2700,
        category: "hats",
        description: "Crafted from 100% premium felted wool, this brown brim hat adds a touch of classic style to any outfit. Perfect for sunny days or a sophisticated look.",
        gallery: ["https://i.ibb.co/ZYW3VTp/brown-brim.png", "https://i.ibb.co/RjBLWxB/grey-brim.png"],
        reviews: [{ rating: 5, user: "Tunde" }, { rating: 4, user: "Aisha" }]
    },
    {
        id: 2,
        name: "Blue Beanie",
        imageUrl: "https://i.ibb.co/ypkgK0X/blue-beanie.png",
        price: 2800,
        category: "hats",
        discountPrice: 2200,
        saleEndDate: getSaleEndDate(2),
        description: "Stay warm and stylish with this cozy blue beanie. Made from a soft acrylic blend for maximum comfort.",
        gallery: ["https://i.ibb.co/ypkgK0X/blue-beanie.png", "https://i.ibb.co/YTjW3vF/green-beanie.png"],
        reviews: [{ rating: 4, user: "David" }]
    },
    {
        id: 25,
        name: "Green Beanie",
        imageUrl: "https://i.ibb.co/YTjW3vF/green-beanie.png",
        price: 2300,
        category: "hats",
        description: "A vibrant green beanie to brighten up your winter wardrobe. Snug fit and ultra-soft material.",
        gallery: ["https://i.ibb.co/YTjW3vF/green-beanie.png"],
        reviews: [{ rating: 5, user: "Ngozi" }]
    },
    {
        id: 26,
        name: "Palm Tree Cap",
        imageUrl: "https://i.ibb.co/rKBDvJX/palm-tree-cap.png",
        price: 2900,
        category: "hats",
        description: "A cool and casual cap featuring a stylish palm tree embroidery. Adjustable strap for a perfect fit.",
        gallery: ["https://i.ibb.co/rKBDvJX/palm-tree-cap.png"],
        reviews: [{ rating: 4, user: "Femi" }]
    },
    // Existing Sneakers
    {
        id: 5,
        name: "Adidas NMD",
        imageUrl: "https://i.ibb.co/0s3pdnc/adidas-nmd.png",
        price: 15000,
        category: "sneakers",
        description: "The Adidas NMD is the epitome of modern street style. Featuring a comfortable Boost midsole and a flexible knit upper.",
        gallery: ["https://i.ibb.co/0s3pdnc/adidas-nmd.png", "https://i.ibb.co/dJbG1cT/yeezy.png"],
        reviews: [{ rating: 5, user: "David" }, { rating: 5, user: "Chioma" }]
    },
    {
        id: 23,
        name: "Nike White AirForce",
        imageUrl: "https://i.ibb.co/1RcFPk0/white-nike-high-tops.png",
        price: 18000,
        category: "sneakers",
        description: "The iconic Nike Air Force 1 in a crisp, clean white. A timeless classic that never goes out of style.",
        gallery: ["https://i.ibb.co/1RcFPk0/white-nike-high-tops.png"],
        reviews: [{ rating: 5, user: "Bayo" }, { rating: 5, user: "Zainab" }]
    },
    {
        id: 24,
        name: "Timberlands",
        imageUrl: "https://i.ibb.co/Mhh6wBg/timberlands.png",
        price: 25000,
        category: "sneakers",
        description: "Rugged and reliable, these Timberland boots are built to last. Waterproof leather and durable construction for any adventure.",
        gallery: ["https://i.ibb.co/Mhh6wBg/timberlands.png"],
        reviews: [{ rating: 5, user: "Emeka" }]
    },
    // Existing Jackets
    {
        id: 9,
        name: "Black Jean Shearling",
        imageUrl: "https://i.ibb.co/XzcwL5s/black-shearling.png",
        price: 12500,
        category: "jackets",
        discountPrice: 10500,
        saleEndDate: getSaleEndDate(5),
        description: "Stay warm without sacrificing style in this black denim jacket with a cozy shearling lining. A modern take on a classic piece.",
        gallery: ["https://i.ibb.co/XzcwL5s/black-shearling.png"],
        reviews: [{ rating: 5, user: "Fatima" }]
    },
    {
        id: 22,
        name: "Grey Jean Jacket",
        imageUrl: "https://i.ibb.co/N71k1ML/grey-jean-jacket.png",
        price: 13500,
        category: "jackets",
        description: "A versatile grey denim jacket that pairs perfectly with almost anything. A must-have for any wardrobe.",
        gallery: ["https://i.ibb.co/N71k1ML/grey-jean-jacket.png", "https://i.ibb.co/mJS6vz0/blue-jean-jacket.png"],
        reviews: [{ rating: 4, user: "Ahmed" }]
    },
    // Existing Womens
    {
        id: 14,
        name: "Floral Blouse",
        imageUrl: "https://i.ibb.co/4W2DGKm/floral-blouse.png",
        price: 4500,
        category: "womens",
        description: "A beautiful floral blouse with a light and airy feel. Features delicate button details and a flattering cut.",
        gallery: ["https://i.ibb.co/4W2DGKm/floral-blouse.png"],
        reviews: [{ rating: 5, user: "Blessing" }]
    },
    {
        id: 20,
        name: "Yellow Track Suit",
        imageUrl: "https://i.ibb.co/v1cvwNf/yellow-track-suit.png",
        price: 9500,
        category: "womens",
        description: "Comfort meets style with this bright yellow track suit. Perfect for lounging or a casual day out.",
        gallery: ["https://i.ibb.co/v1cvwNf/yellow-track-suit.png"],
        reviews: [{ rating: 4, user: "Habiba" }]
    },
    // Existing Mens
    {
        id: 18,
        name: "Floral T-shirt",
        imageUrl: "https://i.ibb.co/qMQ75QZ/floral-shirt.png",
        price: 3750,
        category: "mens",
        description: "Make a statement with this stylish floral t-shirt. Made from 100% breathable cotton.",
        gallery: ["https://i.ibb.co/qMQ75QZ/floral-shirt.png"],
        reviews: [{ rating: 4, user: "Samson" }]
    },
    {
        id: 21,
        name: "White V-Neck",
        imageUrl: "https://i.ibb.co/1f2nWMM/white-vest.png",
        price: 3200,
        category: "mens",
        description: "A classic white v-neck t-shirt. A versatile staple for any man's wardrobe. Soft, durable cotton.",
        gallery: ["https://i.ibb.co/1f2nWMM/white-vest.png"],
        reviews: [{ rating: 5, user: "Daniel" }, { rating: 5, user: "Usman" }]
    },
    {
        id: 28,
        name: "Black & White Longsleeve",
        imageUrl: "https://i.ibb.co/55z32tw/long-sleeve.png",
        price: 4200,
        category: "mens",
        discountPrice: 3800,
        saleEndDate: getSaleEndDate(10),
        description: "A modern black and white long-sleeve shirt with a unique striped pattern. Perfect for a smart-casual look.",
        gallery: ["https://i.ibb.co/55z32tw/long-sleeve.png"],
        reviews: [{ rating: 5, user: "Chinedu" }]
    },

    // --- NEW ITEMS START HERE ---

    // More Hats
    {
        id: 29,
        name: "Red Cap",
        imageUrl: "https://i.ibb.co/X2VJP2W/blue-snapback.png", // Re-used image
        price: 2500,
        category: "hats",
        description: "A classic red baseball cap, perfect for everyday wear. Made from durable cotton twill.",
        gallery: ["https://i.ibb.co/X2VJP2W/blue-snapback.png"],
        reviews: [{ rating: 5, user: "Sade" }]
    },
    {
        id: 30,
        name: "Black Fedora",
        imageUrl: "https://i.ibb.co/ZYW3VTp/brown-brim.png", // Re-used image
        price: 3800,
        category: "hats",
        description: "A sleek black fedora for a touch of timeless elegance. Structured brim and a comfortable fit.",
        gallery: ["https://i.ibb.co/ZYW3VTp/brown-brim.png"],
        reviews: [{ rating: 4, user: "Jide" }]
    },
    {
        id: 31,
        name: "Straw Hat",
        imageUrl: "https://i.ibb.co/rKBDvJX/palm-tree-cap.png", // Re-used image
        price: 3200,
        category: "hats",
        description: "Lightweight and breathable straw hat, your perfect companion for beach days and sunny afternoons.",
        gallery: ["https://i.ibb.co/rKBDvJX/palm-tree-cap.png"],
        reviews: [{ rating: 5, user: "Amina" }]
    },
    // More Sneakers
    {
        id: 32,
        name: "Adidas Yeezy",
        imageUrl: "https://i.ibb.co/dJbG1cT/yeezy.png",
        price: 45000,
        category: "sneakers",
        description: "The highly sought-after Adidas Yeezy combines cutting-edge design with ultimate comfort.",
        gallery: ["https://i.ibb.co/dJbG1cT/yeezy.png"],
        reviews: [{ rating: 5, user: "Obi" }, { rating: 5, user: "Tari" }]
    },
    {
        id: 33,
        name: "Nike Red High Tops",
        imageUrl: "https://i.ibb.co/QcvzydB/nikes-red.png",
        price: 19500,
        category: "sneakers",
        description: "Make a bold statement with these vibrant red Nike high tops. Cushioned for comfort and built for style.",
        gallery: ["https://i.ibb.co/QcvzydB/nikes-red.png"],
        reviews: [{ rating: 4, user: "Lola" }]
    },
    {
        id: 34,
        name: "Converse All-Stars",
        imageUrl: "https://i.ibb.co/bPmVXyP/black-converse.png",
        price: 12000,
        category: "sneakers",
        description: "The timeless Converse Chuck Taylor All-Stars in classic black. A versatile icon of footwear.",
        gallery: ["https://i.ibb.co/bPmVXyP/black-converse.png"],
        reviews: [{ rating: 5, user: "Musa" }]
    },
    // More Jackets
    {
        id: 35,
        name: "Brown Shearling",
        imageUrl: "https://i.ibb.co/s96FpdP/brown-shearling.png",
        price: 14000,
        category: "jackets",
        description: "A rugged brown shearling jacket that offers both warmth and a timeless aesthetic.",
        gallery: ["https://i.ibb.co/s96FpdP/brown-shearling.png"],
        reviews: [{ rating: 5, user: "Adewale" }]
    },
    {
        id: 36,
        name: "Tan Trench Coat",
        imageUrl: "https://i.ibb.co/M6hHc3F/brown-trench.png",
        price: 18500,
        category: "jackets",
        description: "A classic tan trench coat. The perfect outerwear piece for a sophisticated, layered look.",
        gallery: ["https://i.ibb.co/M6hHc3F/brown-trench.png"],
        reviews: [{ rating: 5, user: "Chiamaka" }, { rating: 4, user: "Yusuf" }]
    },
    {
        id: 37,
        name: "Blue Denim Jacket",
        imageUrl: "https://i.ibb.co/mJS6vz0/blue-jean-jacket.png",
        price: 13000,
        category: "jackets",
        description: "The essential blue denim jacket. A versatile staple that can be dressed up or down.",
        gallery: ["https://i.ibb.co/mJS6vz0/blue-jean-jacket.png"],
        reviews: [{ rating: 5, user: "Ibrahim" }]
    },
    // More Mens
    {
        id: 38,
        name: "Camo Down Vest",
        imageUrl: "https://i.ibb.co/xJS0T3Y/camo-vest.png",
        price: 8500,
        category: "mens",
        description: "A stylish camouflage down vest for an extra layer of warmth without the bulk of a full jacket.",
        gallery: ["https://i.ibb.co/xJS0T3Y/camo-vest.png"],
        reviews: [{ rating: 4, user: "Efe" }]
    },
    {
        id: 39,
        name: "Pink T-shirt",
        imageUrl: "https://i.ibb.co/RvwnBL8/pink-shirt.png",
        price: 3500,
        category: "mens",
        description: "A soft, comfortable pink t-shirt that adds a subtle pop of color to your casual wear.",
        gallery: ["https://i.ibb.co/RvwnBL8/pink-shirt.png"],
        reviews: [{ rating: 4, user: "Dele" }]
    },
    {
        id: 40,
        name: "Jean Long Sleeve",
        imageUrl: "https://i.ibb.co/VpW4x5t/roll-up-jean-shirt.png",
        price: 5500,
        category: "mens",
        description: "A versatile long-sleeve denim shirt that works as a light jacket or a standalone piece.",
        gallery: ["https://i.ibb.co/VpW4x5t/roll-up-jean-shirt.png"],
        reviews: [{ rating: 5, user: "Olamide" }]
    },
    {
        id: 41,
        name: "Burgundy T-shirt",
        imageUrl: "https://i.ibb.co/mh3VM1f/polka-dot-shirt.png", // Re-used image with new description
        price: 3600,
        category: "mens",
        description: "A rich burgundy t-shirt made from premium cotton for a comfortable fit and feel.",
        gallery: ["https://i.ibb.co/mh3VM1f/polka-dot-shirt.png"],
        reviews: [{ rating: 4, user: "Kemi" }]
    },
    // More Womens
    {
        id: 42,
        name: "Striped Sweater",
        imageUrl: "https://i.ibb.co/7CjHdFG/stripe-sweater.png",
        price: 6800,
        category: "womens",
        description: "A cozy and chic striped sweater, perfect for cooler days. Pairs well with jeans or skirts.",
        gallery: ["https://i.ibb.co/7CjHdFG/stripe-sweater.png"],
        reviews: [{ rating: 5, user: "Halima" }]
    },
    {
        id: 43,
        name: "White Blouse",
        imageUrl: "https://i.ibb.co/KV18Ysr/white-polka-dot-shirt.png",
        price: 4800,
        category: "womens",
        description: "An elegant white blouse with subtle detailing. A versatile piece for work or casual outings.",
        gallery: ["https://i.ibb.co/KV18Ysr/white-polka-dot-shirt.png"],
        reviews: [{ rating: 5, user: "Tara" }]
    },
    {
        id: 44,
        name: "Blue Tanktop",
        imageUrl: "https://i.ibb.co/7CQVJNm/blue-tank.png",
        price: 3200,
        category: "womens",
        description: "A simple and stylish blue tank top. Made with a stretchy fabric for a flattering fit.",
        gallery: ["https://i.ibb.co/7CQVJNm/blue-tank.png"],
        reviews: [{ rating: 4, user: "Simi" }]
    },
    {
        id: 45,
        name: "Striped T-shirt",
        imageUrl: "https://i.ibb.co/KmSkMbH/striped-shirt.png",
        price: 3900,
        category: "womens",
        description: "A classic striped t-shirt that never goes out of style. Comfortable and easy to wear.",
        gallery: ["https://i.ibb.co/KmSkMbH/striped-shirt.png"],
        reviews: [{ rating: 5, user: "Dami" }]
    },
    {
        id: 46,
        name: "Leather Moto Jacket",
        imageUrl: "https://i.ibb.co/XzcwL5s/black-shearling.png", // Re-used
        price: 19500,
        category: "jackets",
        description: "A timeless leather moto jacket to add an edge to any outfit. Features classic zipper details.",
        gallery: ["https://i.ibb.co/XzcwL5s/black-shearling.png"],
        reviews: [{ rating: 5, user: "Rukky" }]
    },
    {
        id: 47,
        name: "Bomber Jacket",
        imageUrl: "https://i.ibb.co/s96FpdP/brown-shearling.png", // Re-used
        price: 11000,
        category: "jackets",
        description: "A cool and casual bomber jacket, perfect for transitional weather. Lightweight and stylish.",
        gallery: ["https://i.ibb.co/s96FpdP/brown-shearling.png"],
        reviews: [{ rating: 4, user: "Lanre" }]
    },
    {
        id: 48,
        name: "Puffer Jacket",
        imageUrl: "https://i.ibb.co/xJS0T3Y/camo-vest.png", // Re-used
        price: 15500,
        category: "jackets",
        description: "Stay warm in this insulated puffer jacket. Designed for cold weather without the weight.",
        gallery: ["https://i.ibb.co/xJS0T3Y/camo-vest.png"],
        reviews: [{ rating: 5, user: "Gbenga" }]
    },
    {
        id: 49,
        name: "Wool Peacoat",
        imageUrl: "https://i.ibb.co/M6hHc3F/brown-trench.png", // Re-used
        price: 21000,
        category: "jackets",
        description: "A classic double-breasted wool peacoat for a sharp, sophisticated look during winter.",
        gallery: ["https://i.ibb.co/M6hHc3F/brown-trench.png"],
        reviews: [{ rating: 5, user: "Ada" }]
    },
    {
        id: 50,
        name: "Windbreaker",
        imageUrl: "https://i.ibb.co/N71k1ML/grey-jean-jacket.png", // Re-used
        price: 7500,
        category: "jackets",
        description: "A lightweight and water-resistant windbreaker for windy and rainy days.",
        gallery: ["https://i.ibb.co/N71k1ML/grey-jean-jacket.png"],
        reviews: [{ rating: 4, user: "Dayo" }]
    },
    {
        id: 51,
        name: "High-Waist Jeans",
        imageUrl: "https://i.ibb.co/VpW4x5t/roll-up-jean-shirt.png", // Re-used
        price: 8000,
        category: "womens",
        description: "Flattering high-waist jeans in a classic blue wash. A staple for any modern wardrobe.",
        gallery: ["https://i.ibb.co/VpW4x5t/roll-up-jean-shirt.png"],
        reviews: [{ rating: 5, user: "Ini" }]
    },
    {
        id: 52,
        name: "Maxi Dress",
        imageUrl: "https://i.ibb.co/b39pTcr/red-polka-dot-dress.png", // Re-used
        price: 9800,
        category: "womens",
        description: "An elegant and flowing maxi dress, perfect for summer events or a beach vacation.",
        gallery: ["https://i.ibb.co/b39pTcr/red-polka-dot-dress.png"],
        reviews: [{ rating: 5, user: "Folake" }]
    },
    {
        id: 53,
        name: "Jumpsuit",
        imageUrl: "https://i.ibb.co/v1cvwNf/yellow-track-suit.png", // Re-used
        price: 10500,
        category: "womens",
        description: "A chic and effortless jumpsuit that can be dressed up with heels or down with sneakers.",
        gallery: ["https://i.ibb.co/v1cvwNf/yellow-track-suit.png"],
        reviews: [{ rating: 4, user: "Yetunde" }]
    },
    {
        id: 54,
        name: "Cardigan",
        imageUrl: "https://i.ibb.co/7CjHdFG/stripe-sweater.png", // Re-used
        price: 6500,
        category: "womens",
        description: "A soft, open-front cardigan for easy layering. A cozy addition to any outfit.",
        gallery: ["https://i.ibb.co/7CjHdFG/stripe-sweater.png"],
        reviews: [{ rating: 5, user: "Eniola" }]
    },
    {
        id: 55,
        name: "Leggings",
        imageUrl: "https://i.ibb.co/7CQVJNm/blue-tank.png", // Re-used
        price: 4500,
        category: "womens",
        description: "Comfortable and stretchy leggings perfect for workouts or casual, everyday wear.",
        gallery: ["https://i.ibb.co/7CQVJNm/blue-tank.png"],
        reviews: [{ rating: 5, user: "Uche" }]
    },
    {
        id: 56,
        name: "Checkered Shirt",
        imageUrl: "https://i.ibb.co/qMQ75QZ/floral-shirt.png", // Re-used
        price: 4800,
        category: "mens",
        description: "A classic checkered flannel shirt. Soft, warm, and perfect for a layered, rugged look.",
        gallery: ["https://i.ibb.co/qMQ75QZ/floral-shirt.png"],
        reviews: [{ rating: 4, user: "Segun" }]
    },
    {
        id: 57,
        name: "Chino Pants",
        imageUrl: "https://i.ibb.co/55z32tw/long-sleeve.png", // Re-used
        price: 7000,
        category: "mens",
        description: "Smart and versatile chino pants in a neutral tan color. A great alternative to jeans.",
        gallery: ["https://i.ibb.co/55z32tw/long-sleeve.png"],
        reviews: [{ rating: 5, user: "Paul" }]
    },
    {
        id: 58,
        name: "Polo Shirt",
        imageUrl: "https://i.ibb.co/RvwnBL8/pink-shirt.png", // Re-used
        price: 4500,
        category: "mens",
        description: "A classic polo shirt for a smart-casual look. Made from breathable pique cotton.",
        gallery: ["https://i.ibb.co/RvwnBL8/pink-shirt.png"],
        reviews: [{ rating: 5, user: "Peter" }]
    },
    {
        id: 59,
        name: "Graphic Tee",
        imageUrl: "https://i.ibb.co/mh3VM1f/polka-dot-shirt.png", // Re-used
        price: 4000,
        category: "mens",
        description: "Express yourself with this cool graphic tee featuring a unique, artistic print.",
        gallery: ["https://i.ibb.co/mh3VM1f/polka-dot-shirt.png"],
        reviews: [{ rating: 4, user: "Sam" }]
    },
    {
        id: 60,
        name: "Hoodie",
        imageUrl: "https://i.ibb.co/xJS0T3Y/camo-vest.png", // Re-used
        price: 7500,
        category: "mens",
        description: "A comfortable pullover hoodie with a soft fleece interior. Essential for casual comfort.",
        gallery: ["https://i.ibb.co/xJS0T3Y/camo-vest.png"],
        reviews: [{ rating: 5, user: "Ben" }]
    },
    {
        id: 61,
        name: "Vans Old Skool",
        imageUrl: "https://i.ibb.co/bPmVXyP/black-converse.png", // Re-used
        price: 14500,
        category: "sneakers",
        description: "The iconic Vans Old Skool with the classic side stripe. A staple of skate and street culture.",
        gallery: ["https://i.ibb.co/bPmVXyP/black-converse.png"],
        reviews: [{ rating: 5, user: "Chris" }]
    },
    {
        id: 62,
        name: "Bucket Hat",
        imageUrl: "https://i.ibb.co/ZYW3VTp/brown-brim.png", // Re-used
        price: 2800,
        category: "hats",
        description: "A trendy bucket hat for a cool, laid-back vibe. Provides great sun protection.",
        gallery: ["https://i.ibb.co/ZYW3VTp/brown-brim.png"],
        reviews: [{ rating: 4, user: "Alex" }]
    },
    {
        id: 63,
        name: "Pleated Skirt",
        imageUrl: "https://i.ibb.co/4W2DGKm/floral-blouse.png", // Re-used
        price: 6000,
        category: "womens",
        description: "A fun and flowy pleated skirt that moves beautifully. Can be styled for any season.",
        gallery: ["https://i.ibb.co/4W2DGKm/floral-blouse.png"],
        reviews: [{ rating: 5, user: "Grace" }]
    },
    {
        id: 64,
        name: "Knit Sweater",
        imageUrl: "https://i.ibb.co/7CjHdFG/stripe-sweater.png", // Re-used
        price: 7200,
        category: "womens",
        description: "A chunky knit sweater for ultimate coziness during the colder months.",
        gallery: ["https://i.ibb.co/7CjHdFG/stripe-sweater.png"],
        reviews: [{ rating: 5, user: "Joy" }]
    },
    {
        id: 65,
        name: "Wide-Leg Trousers",
        imageUrl: "https://i.ibb.co/KV18Ysr/white-polka-dot-shirt.png", // Re-used
        price: 8500,
        category: "womens",
        description: "Elegant wide-leg trousers that create a sophisticated silhouette. Perfect for the office or a night out.",
        gallery: ["https://i.ibb.co/KV18Ysr/white-polka-dot-shirt.png"],
        reviews: [{ rating: 5, user: "Peace" }]
    },
    {
        id: 66,
        name: "Joggers",
        imageUrl: "https://i.ibb.co/v1cvwNf/yellow-track-suit.png", // Re-used
        price: 6500,
        category: "mens",
        description: "Tapered joggers that offer the comfort of sweatpants with a more stylish, modern fit.",
        gallery: ["https://i.ibb.co/v1cvwNf/yellow-track-suit.png"],
        reviews: [{ rating: 5, user: "Frank" }]
    },
    {
        id: 67,
        name: "Turtleneck",
        imageUrl: "https://i.ibb.co/55z32tw/long-sleeve.png", // Re-used
        price: 5200,
        category: "mens",
        description: "A sleek turtleneck sweater for a sharp, minimalist look. Great for layering.",
        gallery: ["https://i.ibb.co/55z32tw/long-sleeve.png"],
        reviews: [{ rating: 4, user: "George" }]
    },
    {
        id: 68,
        name: "Linen Shirt",
        imageUrl: "https://i.ibb.co/1f2nWMM/white-vest.png", // Re-used
        price: 6000,
        category: "mens",
        description: "A breathable linen shirt, perfect for staying cool and stylish in warm weather.",
        gallery: ["https://i.ibb.co/1f2nWMM/white-vest.png"],
        reviews: [{ rating: 5, user: "Henry" }]
    },
    {
        id: 69,
        name: "Puma Suede",
        imageUrl: "https://i.ibb.co/QcvzydB/nikes-red.png", // Re-used
        price: 16000,
        category: "sneakers",
        description: "The classic Puma Suede. A footwear icon that has been a staple for decades.",
        gallery: ["https://i.ibb.co/QcvzydB/nikes-red.png"],
        reviews: [{ rating: 5, user: "Isaac" }]
    },
    {
        id: 70,
        name: "New Balance 574",
        imageUrl: "https://i.ibb.co/0s3pdnc/adidas-nmd.png", // Re-used
        price: 17500,
        category: "sneakers",
        description: "The New Balance 574 offers a perfect blend of classic style and modern comfort with its ENCAP midsole.",
        gallery: ["https://i.ibb.co/0s3pdnc/adidas-nmd.png"],
        reviews: [{ rating: 5, user: "John" }]
    },
    {
        id: 71,
        name: "Brown Leather Jacket",
        imageUrl: "https://i.ibb.co/s96FpdP/brown-shearling.png", // Re-used
        price: 22000,
        category: "jackets",
        description: "A high-quality brown leather jacket. A timeless investment piece that gets better with age.",
        gallery: ["https://i.ibb.co/s96FpdP/brown-shearling.png"],
        reviews: [{ rating: 5, user: "Ken" }]
    },
    {
        id: 72,
        name: "Corduroy Jacket",
        imageUrl: "https://i.ibb.co/Mhh6wBg/timberlands.png", // Re-used
        price: 11500,
        category: "jackets",
        description: "A vintage-inspired corduroy jacket that adds texture and warmth to your look.",
        gallery: ["https://i.ibb.co/Mhh6wBg/timberlands.png"],
        reviews: [{ rating: 4, user: "Leo" }]
    },
    {
        id: 73,
        name: "Cropped Hoodie",
        imageUrl: "https://i.ibb.co/7CjHdFG/stripe-sweater.png", // Re-used
        price: 6800,
        category: "womens",
        description: "A trendy cropped hoodie that's perfect for a sporty, casual look. Pairs great with high-waist bottoms.",
        gallery: ["https://i.ibb.co/7CjHdFG/stripe-sweater.png"],
        reviews: [{ rating: 4, user: "Mary" }]
    },
    {
        id: 74,
        name: "Satin Cami",
        imageUrl: "https://i.ibb.co/7CQVJNm/blue-tank.png", // Re-used
        price: 4200,
        category: "womens",
        description: "A luxurious satin camisole that can be dressed up for a night out or used for layering.",
        gallery: ["https://i.ibb.co/7CQVJNm/blue-tank.png"],
        reviews: [{ rating: 5, user: "Nancy" }]
    },
    {
        id: 75,
        name: "Cargo Shorts",
        imageUrl: "https://i.ibb.co/xJS0T3Y/camo-vest.png", // Re-used
        price: 5500,
        category: "mens",
        description: "Practical and stylish cargo shorts with plenty of pockets for all your essentials.",
        gallery: ["https://i.ibb.co/xJS0T3Y/camo-vest.png"],
        reviews: [{ rating: 4, user: "Oscar" }]
    },
    {
        id: 76,
        name: "Slim-Fit Suit",
        imageUrl: "https://i.ibb.co/M6hHc3F/brown-trench.png", // Re-used
        price: 35000,
        category: "mens",
        description: "A sharply tailored slim-fit suit in a classic navy blue. Perfect for formal events and business.",
        gallery: ["https://i.ibb.co/M6hHc3F/brown-trench.png"],
        reviews: [{ rating: 5, user: "Pat" }]
    },
    {
        id: 77,
        name: "Blazer",
        imageUrl: "https://i.ibb.co/N71k1ML/grey-jean-jacket.png", // Re-used
        price: 14000,
        category: "jackets",
        description: "A versatile blazer that can smarten up a casual outfit or complete a professional look.",
        gallery: ["https://i.ibb.co/N71k1ML/grey-jean-jacket.png"],
        reviews: [{ rating: 5, user: "Queen" }]
    },
    {
        id: 78,
        name: "Denim Shorts",
        imageUrl: "https://i.ibb.co/mJS6vz0/blue-jean-jacket.png", // Re-used
        price: 5000,
        category: "womens",
        description: "Classic denim shorts, a must-have for summer. Features a comfortable fit and frayed hem.",
        gallery: ["https://i.ibb.co/mJS6vz0/blue-jean-jacket.png"],
        reviews: [{ rating: 5, user: "Rose" }]
    },
    ];

// Attach slugs to each product deterministically (based on id + name) so
// they are stable across restarts and can be referenced directly from the data file.
for (const p of Products) {
     if (!p.slug) p.slug = makeSlug(`${p.id}-${p.name}`);
}

export default Products;
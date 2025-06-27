import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';

// --- ICONS (Vercel-style) ---
const SunIcon = () => <svg height="20" width="20" stroke="currentColor" fill="none" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>;
const MoonIcon = () => <svg height="20" width="20" stroke="currentColor" fill="none" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>;
const WishlistIcon = ({ className }) => <svg className={className} stroke="currentColor" fill={className.includes('text-red-500') ? 'currentColor' : 'none'} strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.5l1.318-1.182a4.5 4.5 0 116.364 6.364L12 20.25l-7.682-7.682a4.5 4.5 0 010-6.364z"></path></svg>;
const CartIcon = ({ className }) => <svg className={className} stroke="currentColor" fill="none" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>;
const SearchIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>;
const PlusIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>;
const CloseIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>;
const StarIcon = ({ className }) => <svg className={className} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>;

// --- DATA & CONTEXT ---
const getSaleEndDate = (days) => new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString();

const ALL_PRODUCTS = [
    { id: 1, name: "Brown Brim", imageUrl: "https://i.ibb.co/ZYW3VTp/brown-brim.png", price: 2700, category: "hats", description: "Crafted from 100% premium felted wool, this hat offers a timeless silhouette and sturdy construction.", gallery: ["https://i.ibb.co/ZYW3VTp/brown-brim.png", "https://i.ibb.co/RjBLWxB/grey-brim.png"], reviews: [{rating: 5, user: "Tunde"}, {rating: 4, user: "Aisha"}]},
    { id: 2, name: "Blue Beanie", imageUrl: "https://i.ibb.co/ypkgK0X/blue-beanie.png", price: 2800, category: "hats", discountPrice: 2200, saleEndDate: getSaleEndDate(2), description: "Stay warm and stylish with this cozy blue beanie.", gallery: ["https://i.ibb.co/ypkgK0X/blue-beanie.png"], reviews: [{rating: 4, user: "David"}] },
    { id: 5, name: "Adidas NMD", imageUrl: "https://i.ibb.co/0s3pdnc/adidas-nmd.png", price: 15000, category: "sneakers", description: "The Adidas NMD is the epitome of modern street style.", gallery: ["https://i.ibb.co/0s3pdnc/adidas-nmd.png", "https://i.ibb.co/dJbG1cT/yeezy.png"], reviews: [{rating: 5, user: "David"}, {rating: 5, user: "Chioma"}]},
    { id: 9, name: "Black Jean Shearling", imageUrl: "https://i.ibb.co/XzcwL5s/black-shearling.png", price: 12500, category: "jackets", discountPrice: 10500, saleEndDate: getSaleEndDate(5), description: "Stay warm without sacrificing style.", gallery: ["https://i.ibb.co/XzcwL5s/black-shearling.png", "https://i.ibb.co/mJS6vz0/blue-jean-jacket.png"], reviews: [{rating: 5, user: "Fatima"}, {rating: 4, user: "Emeka"}]},
    { id: 14, name: "Floral Blouse", imageUrl: "https://i.ibb.co/4W2DGKm/floral-blouse.png", price: 4500, category: "womens", description: "A beautiful floral blouse with a light and airy feel.", gallery: ["https://i.ibb.co/4W2DGKm/floral-blouse.png"], reviews: [{rating: 5, user: "Blessing"}, {rating: 4, user: "Ngozi"}]},
    { id: 18, name: "Floral T-shirt", imageUrl: "https://i.ibb.co/qMQ75QZ/floral-shirt.png", price: 3750, category: "mens", description: "Make a statement with this stylish floral t-shirt.", gallery: ["https://i.ibb.co/qMQ75QZ/floral-shirt.png"], reviews: [{rating: 4, user: "Samson"}, {rating: 5, user: "Ibrahim"}]},
].map(p => ({ ...p, availableSizes: ["S", "M", "L", "XL"], availableColors: ["#808080", "#000000", "#FFFFFF"] }));

const AppContext = createContext();

// --- PROVIDER COMPONENT ---
const AppProvider = ({ children }) => {
    const [theme, setTheme] = useState('light');
    const [cart, setCart] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('default');
    const [category, setCategory] = useState('all');
    const [isLoading, setIsLoading] = useState(true);
    const [modalProduct, setModalProduct] = useState(null);
    const [toasts, setToasts] = useState([]);

    useEffect(() => {
        const storedTheme = localStorage.getItem('theme') || 'light';
        setTheme(storedTheme);
        setCart(JSON.parse(localStorage.getItem('cart')) || []);
        setWishlist(JSON.parse(localStorage.getItem('wishlist')) || []);
        setTimeout(() => setIsLoading(false), 800);
    }, []);

    useEffect(() => { document.documentElement.className = theme; localStorage.setItem('theme', theme); }, [theme]);
    useEffect(() => { localStorage.setItem('cart', JSON.stringify(cart)); }, [cart]);
    useEffect(() => { localStorage.setItem('wishlist', JSON.stringify(wishlist)); }, [wishlist]);
    
    const showToast = useCallback((message, type = 'success') => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, message, type }]);
        setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000);
    }, []);

    const addToCart = useCallback((productId, options) => {
        setCart(currentCart => {
            const existing = currentCart.find(item => item.id === productId && JSON.stringify(item.options) === JSON.stringify(options));
            if(existing) return currentCart.map(item => item.id === productId && JSON.stringify(item.options) === JSON.stringify(options) ? { ...item, quantity: item.quantity + 1 } : item);
            return [...currentCart, { ...ALL_PRODUCTS.find(p => p.id === productId), quantity: 1, options }];
        });
    }, []);

    const toggleWishlist = useCallback((productId) => {
        const product = ALL_PRODUCTS.find(p => p.id === productId);
        setWishlist(currentWishlist => {
            if(currentWishlist.includes(productId)) {
                showToast(`${product.name} removed from wishlist`, 'error');
                return currentWishlist.filter(id => id !== productId);
            }
            showToast(`${product.name} added to wishlist!`);
            return [...currentWishlist, productId];
        });
    }, [showToast]);

    const value = { theme, setTheme, cart, addToCart, wishlist, toggleWishlist, searchTerm, setSearchTerm, sortBy, setSortBy, category, setCategory, isLoading, modalProduct, setModalProduct, toasts, showToast };
    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// --- UI COMPONENTS ---
const Rating = React.memo(({ rating }) => <div className="flex">{[...Array(5)].map((_, i) => <StarIcon key={i} className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-400'}`} />)}</div>);
const ToastContainer = () => {
    const { toasts } = useContext(AppContext);
    return <div className="fixed top-5 right-5 z-[100] space-y-2">{toasts.map(toast => <div key={toast.id} className={`toast transition-all duration-300 transform-gpu ${toast.type === 'success' ? 'bg-black' : 'bg-red-600'} text-white px-4 py-2 rounded-md shadow-lg`}>{toast.message}</div>)}</div>;
};

const Header = () => {
    const { theme, setTheme, cart, wishlist, setSearchTerm } = useContext(AppContext);
    const cartCount = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);

    return (
        <header className="bg-white/80 dark:bg-black/80 backdrop-blur-sm sticky top-0 z-30 border-b border-gray-200 dark:border-gray-800">
            <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
                <div className="flex items-center gap-6">
                    <a href="#" className="font-bold text-lg text-black dark:text-white">▲ CRWN3</a>
                    <div className="hidden md:flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
                        <a href="#" className="hover:text-black dark:hover:text-white transition-colors">Shop</a>
                        <a href="#" className="hover:text-black dark:hover:text-white transition-colors">About</a>
                        <a href="#" className="hover:text-black dark:hover:text-white transition-colors">Contact</a>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                     <div className="relative flex-grow max-w-xs hidden sm:block">
                        <input type="text" onChange={e => setSearchTerm(e.target.value)} placeholder="Search..." className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 dark:border-gray-800 rounded-md bg-white dark:bg-black focus:outline-none focus:ring-1 focus:ring-gray-400 dark:focus:ring-gray-600"/>
                        <div className="absolute top-0 left-0 flex items-center h-full pl-3 pointer-events-none"><SearchIcon /></div>
                    </div>
                    <button onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')} className="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">{theme === 'light' ? <MoonIcon /> : <SunIcon />}</button>
                    <button className="relative p-1 rounded-full"><WishlistIcon className={`w-6 h-6 transition-colors ${wishlist.length > 0 ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'}`} /><span className={`absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center transition-transform ${wishlist.length > 0 ? 'scale-100' : 'scale-0'}`}>{wishlist.length}</span></button>
                    <button className="relative p-1 rounded-full"><CartIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" /><span className={`absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center transition-transform ${cartCount > 0 ? 'scale-100' : 'scale-0'}`}>{cartCount}</span></button>
                </div>
            </nav>
        </header>
    );
};

const ProductCard = React.memo(({ product, index }) => {
    const { setModalProduct, toggleWishlist, wishlist } = useContext(AppContext);
    const isWishlisted = useMemo(() => wishlist.includes(product.id), [wishlist, product.id]);
    const onSale = product.discountPrice && new Date(product.saleEndDate) > new Date();
    const discountPercent = onSale ? Math.round(((product.price - product.discountPrice) / product.price) * 100) : 0;

    return (
        <div className="product-card-wrapper animate-fade-in" style={{ animationDelay: `${index * 50}ms`}}>
            <div className="product-card bg-white dark:bg-black rounded-lg p-2 group relative">
                <div onClick={() => setModalProduct(product)} className="relative overflow-hidden cursor-pointer rounded-md">
                    <img src={product.imageUrl} alt={product.name} className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500" />
                    {onSale && <div className="absolute top-3 left-3 bg-black text-white text-xs font-semibold px-2 py-1 rounded-full">{discountPercent}% OFF</div>}
                    <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent flex justify-end items-end h-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                         <button onClick={(e) => { e.stopPropagation(); setModalProduct(product); }} className="bg-white text-black py-2 px-4 rounded-md text-sm font-semibold transition-transform transform-gpu group-hover:translate-y-0 translate-y-4 duration-300">Add to Cart</button>
                    </div>
                </div>
                <div className="pt-3">
                    <div className="flex justify-between items-start">
                        <h3 className="text-sm font-semibold text-black dark:text-white">{product.name}</h3>
                        <button onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }} className={`wishlist-btn p-1 ${isWishlisted ? 'text-red-500' : 'text-gray-400 dark:text-gray-500'}`} title="Wishlist"><WishlistIcon className="w-5 h-5" /></button>
                    </div>
                    <div className="mt-1 flex items-baseline gap-2">
                       <p className={`text-sm font-semibold ${onSale ? 'text-red-500' : 'text-black dark:text-white'}`}>₦{onSale ? product.discountPrice.toLocaleString() : product.price.toLocaleString()}</p>
                       {onSale && <p className="text-xs line-through text-gray-400 dark:text-gray-500">₦{product.price.toLocaleString()}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
});

const SkeletonGrid = () => <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-x-6 gap-y-10">{[...Array(10)].map((_, i) => <div key={i} className="animate-pulse"><div className="w-full h-80 bg-gray-200 dark:bg-gray-800 rounded-lg"></div><div className="mt-3 h-4 w-3/4 bg-gray-200 dark:bg-gray-800 rounded"></div><div className="mt-2 h-4 w-1/4 bg-gray-200 dark:bg-gray-800 rounded"></div></div>)}</div>;
const ProductGrid = ({ products }) => <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-x-6 gap-y-10">{products.length > 0 ? products.map((p, i) => <ProductCard key={p.id} product={p} index={i} />) : <p className="col-span-full text-center text-gray-500">No products found.</p>}</div>;

const ProductModal = () => {
    const { modalProduct, setModalProduct, addToCart, showToast, wishlist, toggleWishlist } = useContext(AppContext);
    const [activeImg, setActiveImg] = useState(0);
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    
    const isVisible = !!modalProduct;

    useEffect(() => {
        if (modalProduct) {
            setActiveImg(0);
            setSelectedSize(modalProduct.availableSizes[0]);
            setSelectedColor(modalProduct.availableColors[0]);
        }
    }, [modalProduct]);
    
    if (!modalProduct) return null;

    const isWishlisted = wishlist.includes(modalProduct.id);
    const onSale = modalProduct.discountPrice && new Date(modalProduct.saleEndDate) > new Date();

    return (
        <div onClick={() => setModalProduct(null)} className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <div className={`absolute inset-0 bg-black/50 backdrop-blur-sm`}></div>
            <div onClick={e => e.stopPropagation()} className={`bg-white dark:bg-black rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto flex transition-transform duration-300 ${isVisible ? 'scale-100' : 'scale-95'}`}>
                 <button onClick={() => setModalProduct(null)} className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 z-10 hover:text-black dark:hover:text-white"><CloseIcon /></button>
                 <div className="w-1/2 p-6">
                    <img src={modalProduct.gallery[activeImg]} className="w-full h-[75vh] object-cover rounded-md mb-4"/>
                 </div>
                 <div className="w-1/2 p-6 flex flex-col">
                    <h2 className="text-2xl font-bold">{modalProduct.name}</h2>
                    <div className="flex items-center my-2"><Rating rating={modalProduct.reviews.reduce((a, r) => a + r.rating, 0) / (modalProduct.reviews.length || 1)} /><span className="ml-2 text-xs text-gray-500">{modalProduct.reviews.length} reviews</span></div>
                    <div className="my-4 flex items-baseline gap-3"><p className={`text-2xl font-semibold ${onSale ? 'text-red-500' : ''}`}>₦{onSale ? modalProduct.discountPrice.toLocaleString() : modalProduct.price.toLocaleString()}</p>{onSale && <p className="text-lg line-through text-gray-400">₦{modalProduct.price.toLocaleString()}</p>}</div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 flex-grow">{modalProduct.description}</p>
                    <div className="mt-6"><h4 className="font-semibold text-sm mb-2">Color</h4><div className="flex gap-2">{modalProduct.availableColors.map((c, i) => <button key={i} onClick={() => setSelectedColor(c)} className={`w-8 h-8 rounded-full cursor-pointer border-2 border-white dark:border-black ring-1 ring-inset ring-gray-200 dark:ring-gray-800 transition-all ${selectedColor === c ? 'ring-2 ring-black dark:ring-white ring-offset-2' : ''}`} style={{backgroundColor: c}}></button>)}</div></div>
                    <div className="mt-4"><h4 className="font-semibold text-sm mb-2">Size</h4><div className="flex flex-wrap gap-2">{modalProduct.availableSizes.map((s, i) => <button key={i} onClick={() => setSelectedSize(s)} className={`border rounded-md px-3 py-1 text-sm transition ${selectedSize === s ? 'bg-black text-white border-black' : 'border-gray-300 dark:border-gray-700 hover:border-black dark:hover:border-white'}`}>{s}</button>)}</div></div>
                    <div className="mt-6 flex gap-4">
                       <button onClick={() => {addToCart(modalProduct.id, {size: selectedSize, color: selectedColor}); showToast(`${modalProduct.name} added!`);}} className="flex-grow bg-black text-white dark:bg-white dark:text-black py-3 rounded-md font-semibold">Add to Cart</button>
                       <button onClick={() => toggleWishlist(modalProduct.id)} className={`p-3 rounded-md border transition-colors ${isWishlisted ? 'text-red-500 border-red-500' : 'border-gray-300 dark:border-gray-700'}`}><WishlistIcon className="w-6 h-6"/></button>
                    </div>
                 </div>
            </div>
        </div>
    );
};

// --- MAIN APP & LAYOUT ---
const FilterControls = () => {
    const { category, setCategory, sortBy, setSortBy } = useContext(AppContext);
    const categories = ["all", "hats", "sneakers", "jackets", "womens", "mens"];
    return(
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <div className="flex items-center p-1 bg-gray-100 dark:bg-gray-900 rounded-lg">
                {categories.map(cat => <button key={cat} onClick={() => setCategory(cat)} className={`px-3 py-1 rounded-md text-sm font-medium capitalize transition-colors ${category === cat ? 'bg-white dark:bg-black text-black dark:text-white shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white'}`}>{cat}</button>)}
            </div>
            <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="text-sm border border-gray-200 dark:border-gray-800 rounded-md px-4 py-2 bg-white dark:bg-black focus:outline-none focus:ring-1 focus:ring-gray-400 dark:focus:ring-gray-600"><option value="default">Sort by</option><option value="rating-desc">Highest Rating</option><option value="price-asc">Price: Low to High</option><option value="price-desc">Price: High to Low</option></select>
        </div>
    );
};

const BackgroundGrid = () => <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] dark:bg-black"></div>;

const MainContent = () => {
    const { isLoading, searchTerm, sortBy, category } = useContext(AppContext);
    const filteredAndSortedProducts = useMemo(() => ALL_PRODUCTS.filter(p => category === 'all' || p.category === category).filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase())).sort((a, b) => { switch(sortBy) { case 'price-asc': return a.price - b.price; case 'price-desc': return b.price - a.price; case 'rating-desc': return (b.reviews.reduce((s,r)=>s+r.rating,0)/(b.reviews.length||1)) - (a.reviews.reduce((s,r)=>s+r.rating,0)/(a.reviews.length||1)); default: return 0; } }), [category, searchTerm, sortBy]);
    return (<main className="container mx-auto px-6 py-10"><FilterControls />{isLoading ? <SkeletonGrid /> : <ProductGrid products={filteredAndSortedProducts} />}</main>);
};

export default function App() {
    return (
        <AppProvider>
            <style>{`
                @keyframes fade-in { 0% { opacity: 0; transform: translateY(10px); } 100% { opacity: 1; transform: translateY(0); } }
                .animate-fade-in { animation: fade-in 0.5s ease-out forwards; opacity: 0; }
                .product-card-wrapper { position: relative; }
                .product-card::before { content: ''; position: absolute; inset: 0; border-radius: 0.75rem; padding: 1px; background: linear-gradient(120deg, var(--glow-start), var(--glow-end)); -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0); -webkit-mask-composite: xor; mask-composite: exclude; opacity: 0; transition: opacity 0.3s; }
                .product-card:hover::before { opacity: 1; }
            `}</style>
            <div className="bg-white dark:bg-black text-black dark:text-white min-h-screen font-sans [--glow-start:theme(colors.gray.300)] [--glow-end:theme(colors.gray.100)] dark:[--glow-start:theme(colors.gray.700)] dark:[--glow-end:theme(colors.gray.900)]">
                <BackgroundGrid />
                <ToastContainer />
                <Header />
                <MainContent />
                <ProductModal />
            </div>
        </AppProvider>
    );
}

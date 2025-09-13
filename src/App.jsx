import React, { useState, useEffect, useMemo, useCallback, useContext, useRef } from 'react';
import { Link, NavLink, useNavigate, useParams, Routes, Route, Navigate } from 'react-router-dom';
import './header.css';
import { Products } from './data/products';
import About from './About.jsx';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import Contact from './Contact.jsx';
import CartPage from './Cart.jsx';
import Checkout from './Checkout.jsx';
import NotFound from './NotFound.jsx';

// --- ICONS ---
const SunIcon = () => <svg height="20" width="20" stroke="currentColor" fill="none" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>;
const MoonIcon = () => <svg height="20" width="20" stroke="currentColor" fill="none" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>;
const WishlistIcon = ({ className }) => <svg className={className} stroke="currentColor" fill={className.includes('text-red-500') || className.includes('fill-red-500') ? 'currentColor' : 'none'} strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.5l1.318-1.182a4.5 4.5 0 116.364 6.364L12 20.25l-7.682-7.682a4.5 4.5 0 010-6.364z"></path></svg>;
const CartIcon = ({ className }) => <svg className={className} stroke="currentColor" fill="none" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>;
const SearchIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>;
const MenuIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>;
const CloseIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>;
const TrashIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>;
const StarIcon = ({ className }) => <svg className={className} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>;
const ArrowRightIcon = () => <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>;

const ALL_PRODUCTS = Products.map(p => {
    const base = { ...p, availableSizes: ["S", "M", "L", "XL"], availableColors: ["#808080", "#000000", "#FFFFFF", "#ff0000"], gallery: p.gallery?.length > 0 ? p.gallery : [p.imageUrl, 'https://placehold.co/400x600/cccccc/ffffff?text=View+2', 'https://placehold.co/400x600/999999/ffffff?text=View+3', 'https://placehold.co/400x600/666666/ffffff?text=View+4', 'https://placehold.co/400x600/333333/ffffff?text=View+5'] };
    // use persisted slug from data/products.js (generated there)
    if (p.slug) base.slug = p.slug;
    return base;
});

const COUPON_DEFINITIONS = {
    SAVE10: { type: 'percent', value: 10, description: '10% off your order' },
    SAVE20: { type: 'percent', value: 20, description: '20% off your order' },
    WELCOME500: { type: 'flat', value: 500, description: '₦500 off your order' },
    FREE: { type: 'free-shipping', value: 0, description: 'Free shipping' }
};

import { AppContext } from './AppContext.js';
import SEO from './SEO.jsx';

const CATEGORIES = ["all", "hats", "sneakers", "jackets", "womens", "mens"];

// --- PROVIDER COMPONENT ---
const AppProvider = ({ children }) => {
    const [theme, setTheme] = useState('light');
    const [cart, setCart] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('default');
    const [category, setCategory] = useState('all');
    const [isLoading, setIsLoading] = useState(true);
    const [currentProductId, setCurrentProductId] = useState(null);
    const [toasts, setToasts] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isWishlistOpen, setIsWishlistOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [appliedCoupon, setAppliedCoupon] = useState(null);

    useEffect(() => {
        const storedTheme = localStorage.getItem('theme') || 'light';
        setTheme(storedTheme);
        document.documentElement.className = storedTheme;
        
        try {
            const storedCart = localStorage.getItem('cart');
            if (storedCart) setCart(JSON.parse(storedCart));
            
            const storedWishlist = localStorage.getItem('wishlist');
            if (storedWishlist) setWishlist(JSON.parse(storedWishlist));
        } catch {
            // ignore parse errors and clear stale storage
            localStorage.removeItem('cart');
            localStorage.removeItem('wishlist');
        }

        setTimeout(() => setIsLoading(false), 800);
    }, []);

    // Normalize incoming `.html` suffixed paths so /shop.html -> /shop for the SPA router
    useEffect(() => {
        try {
            const path = window.location.pathname || '/';
            if (path.endsWith('.html')) {
                const clean = path.replace(/\.html$/i, '') || '/';
                const newUrl = clean + (window.location.search || '') + (window.location.hash || '');
                history.replaceState(null, '', newUrl);
            }
        } catch {
            // ignore in non-browser environments
        }
    }, []);
    
    useEffect(() => { localStorage.setItem('theme', theme); document.documentElement.className = theme; }, [theme]);
    useEffect(() => { localStorage.setItem('cart', JSON.stringify(cart)); }, [cart]);
    useEffect(() => { localStorage.setItem('wishlist', JSON.stringify(wishlist)); }, [wishlist]);

    const showToast = useCallback((message, type = 'success') => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, message, type }]);
        setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000);
    }, []);

    const addToCart = useCallback((productId, options = { size: 'M', color: '#000000' }) => {
        setCart(currentCart => {
            const cartItemId = `${productId}-${options.size}-${options.color}`;
            const existingItem = currentCart.find(item => item.cartItemId === cartItemId);
            
            if (existingItem) {
                return currentCart.map(item => item.cartItemId === cartItemId ? { ...item, quantity: item.quantity + 1 } : item);
            }
            const product = ALL_PRODUCTS.find(p => p.id === productId);
            return [...currentCart, { ...product, quantity: 1, options, cartItemId }];
        });
    }, []);

    const removeFromCart = useCallback((cartItemId) => {
      setCart(currentCart => currentCart.filter(item => item.cartItemId !== cartItemId));
    }, []);

    const updateCartQuantity = useCallback((cartItemId, quantity) => {
      if (quantity <= 0) {
        removeFromCart(cartItemId);
      } else {
        setCart(currentCart => currentCart.map(item => item.cartItemId === cartItemId ? { ...item, quantity } : item));
      }
    }, [removeFromCart]);

        const clearCart = useCallback(() => {
                setCart([]);
        }, []);

        const applyCoupon = useCallback((code) => {
            const c = (code || '').toUpperCase().trim();
            if (!c) return false;
            if (!COUPON_DEFINITIONS[c]) return false;
            setAppliedCoupon(c);
            return true;
        }, []);

        const removeCoupon = useCallback(() => setAppliedCoupon(null), []);

    const toggleWishlist = useCallback((productId) => {
        const product = ALL_PRODUCTS.find(p => p.id === productId);
        setWishlist(currentWishlist => {
            if (currentWishlist.includes(productId)) {
                showToast(`${product.name} removed from wishlist`, 'error');
                return currentWishlist.filter(id => id !== productId);
            }
            showToast(`${product.name} added to wishlist!`);
            return [...currentWishlist, productId];
        });
    }, [showToast]);

    useEffect(() => {
        setCurrentPage(1);
    }, [category, sortBy, searchTerm]);

        // routerNavigate is the actual react-router navigate function
        const routerNavigate = useNavigate();

        const navigate = (pageOrPath) => {
            // kept for compatibility with older components — will be removed shortly
            // Accept either full paths (starting with '/') or symbolic names like 'home', 'shop', 'login'
            let to = '/';
            if (typeof pageOrPath === 'string' && pageOrPath.startsWith('/')) {
                to = pageOrPath;
            } else {
                switch (pageOrPath) {
                    case 'home': to = '/'; break;
                    case 'shop': to = '/shop'; break;
                    case 'login': to = '/login'; break;
                    case 'signup': to = '/signup'; break;
                    case 'contact': to = '/contact'; break;
                    default: to = '/';
                }
            }
            window.scrollTo(0, 0);
            routerNavigate(to);
        }

        const openProduct = (productId) => {
            const product = ALL_PRODUCTS.find(p => p.id === productId);
            if (product) {
                // navigate to the canonical product route
                setCurrentProductId(productId);
                routerNavigate(`/product/${product.slug}`);
                window.scrollTo(0, 0);
            }
        }

    const value = { theme, setTheme, cart, addToCart, removeFromCart, updateCartQuantity, clearCart, appliedCoupon, applyCoupon, removeCoupon, COUPON_DEFINITIONS, wishlist, toggleWishlist, searchTerm, setSearchTerm, sortBy, setSortBy, category, setCategory, isLoading, currentProductId, setCurrentProductId, openProduct, toasts, showToast, isCartOpen, setIsCartOpen, isWishlistOpen, setIsWishlistOpen, currentPage, setCurrentPage, ALL_PRODUCTS, navigate };
    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// --- UI COMPONENTS ---
const Rating = React.memo(({ rating }) => <div className="flex">{[...Array(5)].map((_, i) => <StarIcon key={i} className={`w-4 h-4 ${i < Math.round(rating) ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} />)}</div>);
const ToastContainer = () => {
    const { toasts } = useContext(AppContext);
    return <div className="fixed top-5 right-5 z-[100] space-y-2">{toasts.map(toast => <div key={toast.id} className={`toast-in-out toast ${toast.type === 'success' ? 'bg-black' : 'bg-red-600'} text-white px-4 py-2 rounded-md shadow-lg`}>{toast.message}</div>)}</div>;
};

const Header = () => {
    const { theme, setTheme, cart, wishlist, searchTerm, setSearchTerm, setIsCartOpen, setIsWishlistOpen } = useContext(AppContext);
    const navigate = useNavigate();
    const cartCount = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isMenuOpen]);
    
    const handleNav = (e, to) => {
        e.preventDefault();
        navigate(to);
        setIsMenuOpen(false);
    }

    const MobileMenu = () => {
        const [mobileQuery, setMobileQuery] = useState('');
        const onKeyDown = (e) => {
            if (e.key === 'Enter') {
                setSearchTerm(mobileQuery);
                navigate('/shop');
                setIsMenuOpen(false);
            }
        };

        return (
            <div className={`fixed inset-0 z-40 bg-white/80 dark:bg-black/80 backdrop-blur-lg transition-opacity md:hidden ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <div className="container mx-auto px-4 sm:px-6 py-3 flex flex-col h-full">
                                        <div className="flex justify-between items-center mb-8">
                                                <div className="mobile-logo-center">
                                                    <a href="#" onClick={(e) => handleNav(e, 'home')} className="brand text-lg text-black dark:text-white">▲ CRWN3</a>
                                                </div>
                                                <button onClick={() => setIsMenuOpen(false)} className="p-2 -mr-2"><CloseIcon /></button>
                                        </div>
                    <div className="relative mb-8">
                        <input
                            type="text"
                            value={mobileQuery}
                            onChange={e => setMobileQuery(e.target.value)}
                            onKeyDown={onKeyDown}
                            placeholder="Search products..."
                            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 dark:border-gray-800 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600 transition-all"
                        />
                        <div className="absolute top-0 left-0 flex items-center h-full pl-3 pointer-events-none text-gray-400"><SearchIcon /></div>
                    </div>
                    <nav className="flex flex-col items-center gap-6 text-lg text-gray-500 dark:text-gray-400">
                        <a href="#" onClick={(e) => handleNav(e, '/shop')} className="hover:text-black dark:hover:text-white transition-colors">Shop</a>
                        <a href="#" onClick={(e) => handleNav(e, '/about')} className="hover:text-black dark:hover:text-white transition-colors">About</a>
                        <a href="#" onClick={(e) => handleNav(e, '/contact')} className="hover:text-black dark:hover:text-white transition-colors">Contact</a>
                        <a href="#" onClick={(e) => handleNav(e, '/login')} className="hover:text-black dark:hover:text-white transition-colors">Login</a>
                        <a href="#" onClick={(e) => handleNav(e, '/signup')} className="hover:text-black dark:hover:text-white transition-colors">Sign up</a>
                    </nav>
                </div>
            </div>
        );
    };

    return (
        <>
            <header className="site-header bg-white/80 dark:bg-black/80 sticky top-0 z-30 border-b border-gray-200/80 dark:border-gray-800/80">
                <div className="container mx-auto px-4 sm:px-6 py-2 header-inner">
                    <div className="flex items-center gap-4">
                        <button onClick={() => setIsMenuOpen(true)} className="p-2 rounded-md text-gray-500 dark:text-gray-400 md:hidden"><MenuIcon /></button>
                        <a href="#" onClick={(e) => handleNav(e, '/')} className="brand text-lg text-black dark:text-white">▲ CRWN3</a>
                    </div>
                    <nav className="nav-links hidden md:flex items-center gap-2 lg:gap-4 text-sm text-gray-600 dark:text-gray-400">
                            <NavLink to="/shop" className={({isActive}) => `hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${isActive ? 'font-bold' : ''}`}>Shop</NavLink>
                        <NavLink to="/about" className={({isActive}) => `hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${isActive ? 'font-bold' : ''}`}>About</NavLink>
                        <NavLink to="/contact" className={({isActive}) => `hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${isActive ? 'font-bold' : ''}`}>Contact</NavLink>
                    </nav>
                    <div className="flex items-center gap-3">
                                                <div className="hidden lg:block search-bar-desktop">
                                                        <input type="text" onChange={e => { setSearchTerm(e.target.value); navigate('/shop'); }} placeholder="Search products..." className="w-40 md:w-56 lg:w-64 pl-9 pr-4 py-2 text-sm border border-gray-200 dark:border-gray-800 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-gray-400"/>
                                                </div>
                                                {/* compact search icon visible only between 768px and 1023px */}
                                                <div className="hidden md:block lg:hidden">
                                                    <button onClick={() => setIsSearchOpen(s => !s)} className="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100/50 dark:hover:bg-gray-800/50">
                                                        <SearchIcon />
                                                    </button>
                                                </div>

                        {/* Icons: theme, wishlist, cart */}
                        <div className="flex items-center gap-2">
                            <button onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')} title="Toggle theme" aria-label="Toggle theme" className="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-colors">
                                {theme === 'light' ? <MoonIcon /> : <SunIcon />}
                            </button>

                            <button onClick={() => setIsWishlistOpen(true)} title="Wishlist" aria-label="Open wishlist" className="relative p-2 rounded-md hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-colors">
                                <WishlistIcon className={`w-6 h-6 ${wishlist.length > 0 ? 'text-red-500 fill-red-500' : 'text-gray-500 dark:text-gray-400'}`} />
                                <span className={`absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center ${wishlist.length > 0 ? 'scale-100' : 'scale-0'}`}>{wishlist.length}</span>
                            </button>

                            <button onClick={() => setIsCartOpen(true)} title="Cart" aria-label="Open cart" className="relative p-2 rounded-md hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-colors">
                                <CartIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                                <span className={`absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center ${cartCount > 0 ? 'scale-100' : 'scale-0'}`}>{cartCount}</span>
                            </button>
                        </div>

                        <div className="hidden md:flex items-center gap-2">
                            <button onClick={() => navigate('/login')} className="cta-btn bg-transparent border border-gray-200 dark:border-gray-700 rounded-md px-3 py-1 text-sm">Sign in</button>
                            <button onClick={() => navigate('/signup')} className="cta-btn bg-black text-white dark:bg-white dark:text-black text-sm">Sign up</button>
                        </div>
                    </div>
                </div>
            </header>
                        {/* search overlay for md screens */}
                        {isSearchOpen && (
                                <div onClick={() => setIsSearchOpen(false)} className="fixed inset-0 z-40 flex items-start justify-center pt-20">
                                    <div className="w-full max-w-md px-4">
                                        <div onClick={e => e.stopPropagation()} className="bg-white dark:bg-black p-3 rounded-md shadow-lg">
                                            <input
                                                autoFocus
                                                type="text"
                                                value={searchTerm || ''}
                                                onChange={e => { setSearchTerm(e.target.value); }}
                                                onKeyDown={e => { if (e.key === 'Enter') { navigate('/shop'); setIsSearchOpen(false); } }}
                                                placeholder="Search products..."
                                                className="w-full pl-3 pr-3 py-2 text-sm border border-gray-200 dark:border-gray-800 rounded-md bg-transparent focus:outline-none"
                                            />
                                        </div>
                                    </div>
                                </div>
                        )}
            <MobileMenu />
        </>
    );
};

const ProductCard = React.memo(({ product, index }) => {
    const { openProduct } = useContext(AppContext);
    const onSale = product.discountPrice && new Date(product.saleEndDate) > new Date();
    const discountPercent = onSale ? Math.round(((product.price - product.discountPrice) / product.price) * 100) : 0;
    
    const handleMouseMove = (e) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
        card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
    };

    return (
        <div className="product-card-wrapper animate-fade-in" style={{ animationDelay: `${index * 50}ms`}}>
            <div onMouseMove={handleMouseMove} className="product-card bg-white/50 dark:bg-black/50 rounded-lg p-2 group relative border border-transparent dark:border-transparent hover:border-gray-200 dark:hover:border-gray-800 transition-colors duration-300">
                <div onClick={() => openProduct(product.id)} className="relative overflow-hidden cursor-pointer rounded-md">
                    <img src={product.imageUrl} alt={product.name} className="w-full h-48 sm:h-64 md:h-72 lg:h-80 object-cover group-hover:scale-105 transition-transform duration-500" />
                    {onSale && <div className="absolute top-3 left-3 bg-black text-white text-xs font-semibold px-2 py-1 rounded-full z-10">{discountPercent}% OFF</div>}
                    <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent flex justify-end items-end h-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-white text-black py-2 px-4 rounded-md text-sm font-semibold transition-transform transform-gpu group-hover:translate-y-0 translate-y-4 duration-300">Add to Cart</div>
                    </div>
                </div>
                <div className="pt-3">
                    <h3 className="text-sm font-semibold text-black dark:text-white pr-2 truncate">{product.name}</h3>
                    <div className="mt-1 flex items-baseline gap-2">
                        <p className={`text-sm font-semibold ${onSale ? 'text-red-500' : 'text-black dark:text-white'}`}>₦{onSale ? product.discountPrice.toLocaleString() : product.price.toLocaleString()}</p>
                        {onSale && <p className="text-xs line-through text-gray-400 dark:text-gray-500">₦{product.price.toLocaleString()}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
});

const SkeletonGrid = () => <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-x-6 sm:gap-y-10">{[...Array(10)].map((_, i) => <div key={i} className="animate-pulse"><div className="w-full h-64 sm:h-80 bg-gray-200 dark:bg-gray-800 rounded-lg"></div><div className="mt-3 h-4 w-3/4 bg-gray-200 dark:bg-gray-800 rounded"></div><div className="mt-2 h-4 w-1/4 bg-gray-200 dark:bg-gray-800 rounded"></div></div>)}</div>;
const ProductGrid = ({ products }) => <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-x-6 sm:gap-y-10">{products.length > 0 ? products.map((p, i) => <ProductCard key={p.id} product={p} index={i} />) : <p className="col-span-full text-center text-gray-500">No products found.</p>}</div>;



const CartSidebar = () => {
    const { isCartOpen, setIsCartOpen, cart, removeFromCart, updateCartQuantity } = useContext(AppContext);
    const navigate = useNavigate();
    const subtotal = useMemo(() => cart.reduce((sum, item) => {
        const price = item.discountPrice && new Date(item.saleEndDate) > new Date() ? item.discountPrice : item.price;
        return sum + price * item.quantity;
    }, 0), [cart]);

    return (
        <div className={`fixed inset-0 z-50 transition-all duration-500 ease-in-out ${isCartOpen ? 'visible' : 'invisible'}`}>
            <div onClick={() => setIsCartOpen(false)} className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-500 ${isCartOpen ? 'opacity-100' : 'opacity-0'}`}></div>
            <div className={`absolute right-0 top-0 h-full w-full max-w-md bg-white dark:bg-black shadow-2xl flex flex-col transition-transform duration-500 ease-in-out ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-800">
                    <h2 className="text-xl font-semibold">Shopping Cart</h2>
                    <button onClick={() => setIsCartOpen(false)} className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"><CloseIcon /></button>
                </div>
                {cart.length === 0 ? (
                    <div className="flex-grow flex flex-col items-center justify-center text-center p-6">
                        <CartIcon className="w-16 h-16 text-gray-300 dark:text-gray-700 mb-4" />
                        <h3 className="font-semibold text-lg">Your cart is empty</h3>
                        <p className="text-gray-500 dark:text-gray-400">Looks like you haven't added anything yet.</p>
                    </div>
                ) : (
                    <div className="flex-grow overflow-y-auto p-4 space-y-4">
                        {cart.map(item => (
                            <div key={item.cartItemId} className="flex gap-4">
                                <img src={item.imageUrl} alt={item.name} className="w-24 h-24 object-cover rounded-md" />
                                <div className="flex-grow flex flex-col">
                                    <div className="flex justify-between">
                                        <h3 className="font-semibold text-sm">{item.name}</h3>
                                        <button onClick={() => removeFromCart(item.cartItemId)} className="text-gray-400 hover:text-red-500 transition-colors"><TrashIcon /></button>
                                    </div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                      {item.options.size} / <span className="inline-block w-3 h-3 rounded-full" style={{backgroundColor: item.options.color}}></span>
                                    </p>
                                    <div className="flex items-center justify-between mt-auto">
                                        <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-md">
                                            <button onClick={() => updateCartQuantity(item.cartItemId, item.quantity - 1)} className="px-2 py-1 text-lg">-</button>
                                            <span className="px-3 py-1 text-sm">{item.quantity}</span>
                                            <button onClick={() => updateCartQuantity(item.cartItemId, item.quantity + 1)} className="px-2 py-1 text-lg">+</button>
                                        </div>
                                        <p className="font-semibold text-sm">₦{(item.discountPrice && new Date(item.saleEndDate) > new Date() ? item.discountPrice : item.price).toLocaleString()}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                {cart.length > 0 && (
                    <div className="p-4 border-t border-gray-200 dark:border-gray-800 space-y-4">
                        <div className="flex justify-between font-semibold">
                            <span>Subtotal</span>
                            <span>₦{subtotal.toLocaleString()}</span>
                        </div>
                        <button onClick={() => { setIsCartOpen(false); navigate('/cart'); }} className="w-full bg-black text-white dark:bg-white dark:text-black py-3 rounded-md font-semibold transition-transform hover:scale-[1.02]">
                            View Cart
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

const WishlistSidebar = () => {
    const { isWishlistOpen, setIsWishlistOpen, wishlist, toggleWishlist, addToCart, ALL_PRODUCTS, showToast } = useContext(AppContext);
    
    const wishlistedProducts = useMemo(() => {
        return ALL_PRODUCTS.filter(p => wishlist.includes(p.id));
    }, [wishlist, ALL_PRODUCTS]);

    const handleAddToCart = (product) => {
        addToCart(product.id);
        showToast(`${product.name} added to cart!`);
    };

    return (
        <div className={`fixed inset-0 z-50 transition-all duration-500 ease-in-out ${isWishlistOpen ? 'visible' : 'invisible'}`}>
            <div onClick={() => setIsWishlistOpen(false)} className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-500 ${isWishlistOpen ? 'opacity-100' : 'opacity-0'}`}></div>
            <div className={`absolute right-0 top-0 h-full w-full max-w-md bg-white dark:bg-black shadow-2xl flex flex-col transition-transform duration-500 ease-in-out ${isWishlistOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-800">
                    <h2 className="text-xl font-semibold">My Wishlist</h2>
                    <button onClick={() => setIsWishlistOpen(false)} className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"><CloseIcon /></button>
                </div>
                {wishlistedProducts.length === 0 ? (
                    <div className="flex-grow flex flex-col items-center justify-center text-center p-6">
                        <WishlistIcon className="w-16 h-16 text-gray-300 dark:text-gray-700 mb-4" />
                        <h3 className="font-semibold text-lg">Your wishlist is empty</h3>
                        <p className="text-gray-500 dark:text-gray-400">Add items you love to your wishlist.</p>
                    </div>
                ) : (
                    <div className="flex-grow overflow-y-auto p-4 space-y-4">
                        {wishlistedProducts.map(item => (
                            <div key={item.id} className="flex gap-4 items-center">
                                <img src={item.imageUrl} alt={item.name} className="w-24 h-24 object-cover rounded-md" />
                                <div className="flex-grow">
                                    <h3 className="font-semibold text-sm">{item.name}</h3>
                                    <p className="font-semibold text-sm mt-1">₦{(item.discountPrice && new Date(item.saleEndDate) > new Date() ? item.discountPrice : item.price).toLocaleString()}</p>
                                </div>
                                <div className="flex flex-col gap-2">
                                     <button onClick={() => handleAddToCart(item)} className="p-2 bg-gray-100 dark:bg-gray-800 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors" title="Add to Cart">
                                        <CartIcon className="w-5 h-5" />
                                     </button>
                                     <button onClick={() => toggleWishlist(item.id)} className="p-2 bg-red-100/50 dark:bg-red-900/50 text-red-500 rounded-md hover:bg-red-100 dark:hover:bg-red-900 transition-colors" title="Remove from Wishlist">
                                        <TrashIcon />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};


// --- PAGE COMPONENTS ---
const FilterControls = () => {
    const { category, setCategory, sortBy, setSortBy } = useContext(AppContext);
    const categories = CATEGORIES;
    
    const gliderRef = useRef(null);
    const tabsRef = useRef([]);

    useEffect(() => {
        const activeIndex = CATEGORIES.findIndex(c => c === category);
        const activeTab = tabsRef.current[activeIndex];
        if (activeTab && gliderRef.current) {
            gliderRef.current.style.width = `${activeTab.offsetWidth}px`;
            gliderRef.current.style.height = `${activeTab.offsetHeight}px`;
            gliderRef.current.style.left = `${activeTab.offsetLeft}px`;
        }
    }, [category]);

    return (
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <div className="hidden md:flex relative items-center p-1 bg-gray-100/80 dark:bg-gray-900/80 rounded-lg">
                <div ref={gliderRef} className="absolute bg-white dark:bg-black shadow-md rounded-md transition-all duration-300 ease-in-out"></div>
                {categories.map((cat, index) => (
                    <button
                        key={cat}
                        ref={el => tabsRef.current[index] = el}
                        onClick={() => setCategory(cat)}
                        className={`relative z-10 px-4 py-1.5 rounded-md text-sm font-medium capitalize transition-colors duration-300 whitespace-nowrap ${category === cat ? 'text-black dark:text-white' : 'text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white'}`}
                    >
                        {cat}
                    </button>
                ))}
            </div>
            <div className="w-full md:hidden">
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="w-full text-sm border border-gray-200/80 dark:border-gray-800/80 rounded-md px-4 py-2 bg-white/80 dark:bg-black/80 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600 capitalize"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat} className="capitalize">{cat}</option>
                ))}
              </select>
            </div>
            <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="w-full md:w-auto text-sm border border-gray-200/80 dark:border-gray-800/80 rounded-md px-4 py-2 bg-white/80 dark:bg-black/80 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600"
            >
                <option value="default">Sort by</option>
                <option value="rating-desc">Highest Rating</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
            </select>
        </div>
    );
};

const Pagination = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  if (totalPages <= 1) return null;

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center items-center gap-2 mt-12">
      <button 
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 rounded-md text-sm font-medium bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Prev
      </button>
      {pageNumbers.map(number => (
        <button 
          key={number}
          onClick={() => handlePageChange(number)}
          className={`px-3 py-1 rounded-md text-sm font-medium ${currentPage === number ? 'bg-black text-white dark:bg-white dark:text-black' : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
        >
          {number}
        </button>
      ))}
      <button 
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 rounded-md text-sm font-medium bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
};

const ShopPage = () => {
    const { isLoading, searchTerm, sortBy, category, currentPage, setCurrentPage } = useContext(AppContext);
    // page meta
    const shopTitle = 'Shop — CRWN3';
    const shopDescription = 'Browse CRWN3 collections: hats, sneakers, jackets, and essentials.';
    const ITEMS_PER_PAGE = 20;

    const onSale = (product) => {
        return product.discountPrice && new Date(product.saleEndDate) > new Date();
    }

    const filteredAndSortedProducts = useMemo(() => {
        return ALL_PRODUCTS
            .filter(p => category === 'all' || p.category === category)
            .filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
            .sort((a, b) => {
                const priceA = onSale(a) ? a.discountPrice : a.price;
                const priceB = onSale(b) ? b.discountPrice : b.price;
                const ratingA = (a.reviews.reduce((s,r)=>s+r.rating,0)/(a.reviews.length||1));
                const ratingB = (b.reviews.reduce((s,r)=>s+r.rating,0)/(b.reviews.length||1));
                
                switch(sortBy) {
                    case 'price-asc': return priceA - priceB;
                    case 'price-desc': return priceB - priceA;
                    case 'rating-desc': return ratingB - ratingA;
                    default: return 0;
                }
            });
    }, [category, searchTerm, sortBy]);

    const paginatedProducts = useMemo(() => {
      const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;
      return filteredAndSortedProducts.slice(startIndex, endIndex);
    }, [currentPage, filteredAndSortedProducts]);

    return (
            <>
                <SEO title={shopTitle} description={shopDescription} url={typeof window !== 'undefined' ? window.location.href : undefined} />
                <main className="container mx-auto px-4 sm:px-6 py-10">
        <FilterControls />
        {isLoading ? (
          <SkeletonGrid /> 
        ) : (
          <>
            <ProductGrid products={paginatedProducts} />
            <Pagination 
              totalItems={filteredAndSortedProducts.length}
              itemsPerPage={ITEMS_PER_PAGE}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </main>
            </>
    );
};

const ProductPage = () => {
    const { setCurrentProductId, ALL_PRODUCTS, addToCart, showToast, wishlist, toggleWishlist } = useContext(AppContext);
    const { slug } = useParams();
    const product = useMemo(() => ALL_PRODUCTS.find(p => p.slug === slug), [ALL_PRODUCTS, slug]);
    const [activeImg, setActiveImg] = useState(0);
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');


    useEffect(() => {
        if (!product) return;
        setActiveImg(0);
        setSelectedSize(product.availableSizes?.[0] || '');
        setSelectedColor(product.availableColors?.[0] || '');
    }, [product]);

    if (!product) return <Navigate to="/shop" replace />;

    const isWishlisted = wishlist.includes(product.id);
    const onSale = product.discountPrice && new Date(product.saleEndDate) > new Date();

    return (
        <>
            <SEO
                title={`${product.name} — CRWN3`}
                description={product.description}
                image={product.gallery?.[0] || product.imageUrl}
                url={typeof window !== 'undefined' ? window.location.href : undefined}
                type="product"
                jsonLd={{
                    "@context": "https://schema.org/",
                    "@type": "Product",
                    "name": product.name,
                    "image": product.gallery || [product.imageUrl],
                    "description": product.description,
                    "sku": product.slug || String(product.id),
                    "offers": {
                        "@type": "Offer",
                        "priceCurrency": "NGN",
                        "price": product.discountPrice || product.price,
                        "availability": "https://schema.org/InStock"
                    }
                }}
            />
            <main className="container mx-auto px-4 sm:px-6 py-10">
            <div className="mb-6">
                <button onClick={() => { setCurrentProductId(null); navigator?.clipboard; window.history.back(); }} className="text-sm text-gray-600 dark:text-gray-300 hover:underline">← Back to shop</button>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <img src={product.gallery[activeImg] || product.imageUrl} className="w-full h-[60vh] object-cover rounded-md mb-4" />
                    <div className="grid grid-cols-5 gap-2">
                        {product.gallery.slice(0,5).map((img, i) => <img key={i} src={img} onClick={() => setActiveImg(i)} className={`w-full h-20 object-cover rounded-md cursor-pointer ${activeImg===i? 'ring-2 ring-black dark:ring-white' : 'opacity-60 hover:opacity-100'}`} alt={`${product.name} ${i+1}`} />)}
                    </div>
                </div>
                <div>
                    <h1 className="text-3xl font-bold">{product.name}</h1>
                    <div className="flex items-center my-2"><Rating rating={product.reviews.reduce((a, r) => a + r.rating, 0) / (product.reviews.length || 1)} /><span className="ml-2 text-xs text-gray-500">{product.reviews.length} reviews</span></div>
                    <div className="my-4 flex items-baseline gap-3"><p className={`text-2xl font-semibold ${onSale ? 'text-red-500' : ''}`}>₦{onSale ? product.discountPrice.toLocaleString() : product.price.toLocaleString()}</p>{onSale && <p className="text-lg line-through text-gray-400">₦{product.price.toLocaleString()}</p>}</div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">{product.description}</p>

                    <div className="mb-4"><h4 className="font-semibold text-sm mb-2">Color</h4><div className="flex gap-2">{product.availableColors.map((c, i) => <button key={i} title={c} onClick={() => setSelectedColor(c)} className={`w-8 h-8 rounded-full cursor-pointer border-2 transition-all ${selectedColor === c ? 'border-black dark:border-white scale-110' : 'border-transparent'}`}><div className="w-full h-full rounded-full ring-1 ring-inset ring-gray-200 dark:ring-gray-800" style={{backgroundColor: c}}></div></button>)}</div></div>
                    <div className="mb-6"><h4 className="font-semibold text-sm mb-2">Size</h4><div className="flex flex-wrap gap-2">{product.availableSizes.map((s, i) => <button key={i} onClick={() => setSelectedSize(s)} className={`border rounded-md px-3 py-1 text-sm transition-all duration-200 ${selectedSize === s ? 'bg-black text-white border-black dark:bg-white dark:text-black dark:border-white' : 'border-gray-300 dark:border-gray-700 hover:border-black dark:hover:border-white'}`}>{s}</button>)}</div></div>

                    <div className="flex gap-3">
                        <button onClick={() => { addToCart(product.id, { size: selectedSize, color: selectedColor }); showToast(`${product.name} added!`); }} className="bg-black text-white py-3 px-6 rounded-md font-semibold">Add to Cart</button>
                        <button onClick={() => toggleWishlist(product.id)} className={`p-3 rounded-md border transition-all ${isWishlisted ? 'text-red-500 border-red-500 bg-red-500/10' : 'border-gray-300 dark:border-gray-700'}`}><WishlistIcon className="w-6 h-6"/></button>
                    </div>
                    <div className="mt-8">
                        <h3 className="font-semibold mb-2">Product Details</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{product.details || 'No additional details provided.'}</p>
                    </div>
                </div>
            </div>
        </main>
        </>
    );
};

const HomePage = () => {
    const { ALL_PRODUCTS, setCategory } = useContext(AppContext);
    const routerNavigate = useNavigate();
    const homeTitle = 'CRWN3 — Curated Apparel & Accessories';
    const homeDescription = 'Timeless pieces and modern essentials to elevate your wardrobe. Discover curated collections at CRWN3.';
  const featuredProducts = useMemo(() => ALL_PRODUCTS.filter(p => p.reviews.length > 1).slice(0, 4), [ALL_PRODUCTS]);
  const newArrivals = useMemo(() => [...ALL_PRODUCTS].sort((a,b) => b.id - a.id).slice(0, 5), [ALL_PRODUCTS]);

  return (
        <>
            <SEO title={homeTitle} description={homeDescription} url={typeof window !== 'undefined' ? window.location.href : undefined} />
            <main>
      {/* Hero Section */}
        <div 
            className="relative h-[50vh] min-h-[300px] md:h-[60vh] bg-cover bg-center flex items-center justify-center text-center text-white px-4"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1601924994987-69e26d50dc26?q=80&w=2874&auto=format&fit=crop')" }}
        >
            <div className="absolute inset-0 bg-black/40"></div>
            <div className="relative z-10 animate-fade-in">
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
                    Define Elevate Your Style
                </h1>
                <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-200 mb-8">
                    Discover curated collections and timeless pieces to elevate your wardrobe.
                </p>
                <button onClick={() => routerNavigate('/shop')} className="bg-white text-black font-bold py-3 px-8 rounded-md hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 animate-fade-in flex items-center mx-auto" style={{animationDelay: '600ms'}}>
                    Shop The Collection <ArrowRightIcon />
                </button>
            </div>
        </div>

      {/* Shop by Category */}
       <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Shop by Category</h2>
           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              <div onClick={() => { routerNavigate('/shop'); setCategory('mens'); }} className="relative rounded-lg overflow-hidden group h-64 cursor-pointer">
                  <img src="https://i.ibb.co/55z32tw/long-sleeve.png" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"/>
                  <div className="absolute inset-0 bg-black/40"></div>
                  <h3 className="absolute bottom-4 left-4 text-white text-xl font-bold">Men's</h3>
              </div>
              <div onClick={() => { routerNavigate('/shop'); setCategory('womens'); }} className="relative rounded-lg overflow-hidden group h-64 cursor-pointer">
                  <img src="https://i.ibb.co/4W2DGKm/floral-blouse.png" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"/>
                  <div className="absolute inset-0 bg-black/40"></div>
                  <h3 className="absolute bottom-4 left-4 text-white text-xl font-bold">Women's</h3>
              </div>
              <div onClick={() => { routerNavigate('/shop'); setCategory('jackets'); }} className="relative rounded-lg overflow-hidden group h-64 cursor-pointer">
                  <img src="https://i.ibb.co/XzcwL5s/black-shearling.png" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"/>
                  <div className="absolute inset-0 bg-black/40"></div>
                  <h3 className="absolute bottom-4 left-4 text-white text-xl font-bold">Jackets</h3>
              </div>
               <div onClick={() => { routerNavigate('/shop'); setCategory('sneakers'); }} className="relative rounded-lg overflow-hidden group h-64 cursor-pointer">
                  <img src="https://i.ibb.co/0s3pdnc/adidas-nmd.png" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"/>
                  <div className="absolute inset-0 bg-black/40"></div>
                  <h3 className="absolute bottom-4 left-4 text-white text-xl font-bold">Footwear</h3>
              </div>
           </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 sm:py-24 bg-gray-50/50 dark:bg-gray-900/50">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
          <ProductGrid products={featuredProducts} />
        </div>
      </section>

       {/* New Arrivals */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-center mb-12">New Arrivals</h2>
          <ProductGrid products={newArrivals} />
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 sm:py-24 bg-gray-50/50 dark:bg-gray-900/50">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-black p-6 rounded-lg shadow-sm">
              <Rating rating={5}/>
              <p className="mt-4 mb-2 text-gray-700 dark:text-gray-300">"The quality of the Classic Tee is incredible. So soft and fits perfectly. I bought one in every color."</p>
              <p className="font-semibold">- Alex R.</p>
            </div>
             <div className="bg-white dark:bg-black p-6 rounded-lg shadow-sm">
              <Rating rating={5}/>
              <p className="mt-4 mb-2 text-gray-700 dark:text-gray-300">"I'm in love with the Studio Leggings. They're stylish enough to wear out and comfortable enough for lounging."</p>
              <p className="font-semibold">- Jessica M.</p>
            </div>
             <div className="bg-white dark:bg-black p-6 rounded-lg shadow-sm">
              <Rating rating={4}/>
              <p className="mt-4 mb-2 text-gray-700 dark:text-gray-300">"Fast shipping and my Windbreaker is fantastic. Great quality for the price. Will be shopping here again."</p>
              <p className="font-semibold">- David L.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Brands */}
      <section className="py-16 container mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-2xl font-bold mb-8">As Seen In</h2>
        <div className="flex justify-center items-center gap-8 md:gap-16 flex-wrap text-gray-400 dark:text-gray-600">
          <span className="font-serif font-bold text-3xl">VOGUE</span>
          <span className="font-serif font-bold text-3xl">GQ</span>
          <span className="font-serif font-bold text-3xl">ELLE</span>
          <span className="font-serif font-bold text-3xl">InStyle</span>
        </div>
      </section>
        </main>
        </>
    );
};

const Footer = () => {
    const { navigate } = useContext(AppContext);
    return (
        <footer className="bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
            <div className="container mx-auto px-4 sm:px-6 py-12">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
                    <div className="col-span-full lg:col-span-2">
                        <a href="#" onClick={(e) => { e.preventDefault(); navigate('home'); }} className="font-bold text-xl text-black dark:text-white">▲ CRWN3</a>
                        <p className="text-gray-500 dark:text-gray-400 mt-4 max-w-xs">Timeless pieces and modern essentials to define your style.</p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-sm tracking-wider uppercase">Shop</h3>
                        <ul className="mt-4 space-y-2 text-gray-500 dark:text-gray-400">
                            <li><a href="#" onClick={(e) => { e.preventDefault(); navigate('shop'); }} className="hover:text-black dark:hover:text-white">Men</a></li>
                            <li><a href="#" onClick={(e) => { e.preventDefault(); navigate('shop'); }} className="hover:text-black dark:hover:text-white">Women</a></li>
                            <li><a href="#" onClick={(e) => { e.preventDefault(); navigate('shop'); }} className="hover:text-black dark:hover:text-white">Accessories</a></li>
                            <li><a href="#" onClick={(e) => { e.preventDefault(); navigate('shop'); }} className="hover:text-black dark:hover:text-white">New Arrivals</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold text-sm tracking-wider uppercase">Support</h3>
                        <ul className="mt-4 space-y-2 text-gray-500 dark:text-gray-400">
                            <li><a href="#" className="hover:text-black dark:hover:text-white">Contact Us</a></li>
                            <li><a href="#" className="hover:text-black dark:hover:text-white">FAQ</a></li>
                            <li><a href="#" className="hover:text-black dark:hover:text-white">Shipping & Returns</a></li>
                            <li><a href="#" className="hover:text-black dark:hover:text-white">Size Guide</a></li>
                        </ul>
                    </div>
                     <div className="col-span-full md:col-span-2 lg:col-span-2">
                        <h3 className="font-semibold text-sm tracking-wider uppercase">Stay Connected</h3>
                        <p className="text-gray-500 dark:text-gray-400 mt-4">Get 10% off your first order when you sign up for our newsletter.</p>
                        <FooterSubscribe />
                    </div>
                </div>
                <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                    <p>&copy; {new Date().getFullYear()} CRWN3 Collective. All Rights Reserved.</p>
                    <div className="flex space-x-4 mt-4 sm:mt-0">
                        <a href="#" className="hover:text-black dark:hover:text-white">Privacy Policy</a>
                        <a href="#" className="hover:text-black dark:hover:text-white">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    )
};

const FooterSubscribe = () => {
    const { showToast } = useContext(AppContext);
    const [email, setEmail] = React.useState('');

    const handleSubscribe = () => {
        const re = /^\S+@\S+\.\S+$/;
        if (!re.test(email)) {
            showToast('Please enter a valid email address', 'error');
            return;
        }
        showToast('Thanks for subscribing!');
        setEmail('');
    };

    return (
        <div className="mt-4">
            <div className="flex max-w-md">
                <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="Enter your email" className="flex-grow px-3 py-2 text-sm border border-gray-300 dark:border-gray-700 rounded-l-md bg-transparent focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600"/>
                <button onClick={handleSubscribe} className="bg-black text-white dark:bg-white dark:text-black px-4 rounded-r-md font-semibold text-sm">Sign Up</button>
            </div>
        </div>
    );
};

const Background = () => (
    <div className="absolute inset-0 -z-50 h-full w-full bg-white dark:bg-black">
        <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <pattern id="grid-light" width="32" height="32" patternUnits="userSpaceOnUse"><path d="M32 0H0V32" fill="none" stroke="#e5e7eb" strokeWidth="0.5"/></pattern>
                <pattern id="grid-dark" width="32" height="32" patternUnits="userSpaceOnUse"><path d="M32 0H0V32" fill="none" stroke="#1f2937" strokeWidth="0.5"/></pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-light)" className="dark:hidden" />
            <rect width="100%" height="100%" fill="url(#grid-dark)" className="hidden dark:block" />
        </svg>
    </div>
);

export default function App() {
    return (
        <AppProvider>
            <style>{`
                :root {
                    --glow-start-rgb: 128, 128, 128;
                    --glow-end-rgb: 229, 231, 235;
                }
                html.dark {
                    --glow-start-rgb: 75, 85, 99;
                    --glow-end-rgb: 31, 41, 55;
                }
                @keyframes fade-in { 0% { opacity: 0; transform: translateY(10px); } 100% { opacity: 1; transform: translateY(0); } }
                .animate-fade-in { animation: fade-in 0.5s ease-out forwards; opacity: 0; }
                @keyframes toast-in-out {
                    0% { transform: translateX(100%); opacity: 0; }
                    20% { transform: translateX(0); opacity: 1; }
                    80% { transform: translateX(0); opacity: 1; }
                    100% { transform: translateX(100%); opacity: 0; }
                }
                .toast-in-out { animation: toast-in-out 3s ease-in-out forwards; }
                .product-card-wrapper { position: relative; }
                .product-card::before { 
                    content: ''; 
                    position: absolute; 
                    inset: 0; 
                    border-radius: 0.5rem;
                    padding: 1px; 
                    background: radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(var(--glow-start-rgb), 0.3), rgba(var(--glow-end-rgb), 0) );
                    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
                    -webkit-mask-composite: xor;
                    mask-composite: exclude;
                    opacity: 0;
                    transition: opacity 0.3s;
                }
                .product-card:hover::before { opacity: 1; }
                body {
                  -ms-overflow-style: none;
                  scrollbar-width: none;
                }
                body::-webkit-scrollbar {
                  display: none;
                }
            `}</style>
            <div className="bg-white dark:bg-black text-black dark:text-white min-h-screen font-sans flex flex-col">
                <Background />
                <ToastContainer />
                <CartSidebar />
                <WishlistSidebar />
                <Header />
                                <div className="flex-grow">
                                    <Routes>
                                        <Route path="/" element={<HomePage />} />
                                        <Route path="/shop" element={<ShopPage />} />
                                        <Route path="/product/:slug" element={<ProductPage />} />
                                        <Route path="/about" element={<About />} />
                                        <Route path="/contact" element={<Contact />} />
                                        <Route path="/cart" element={<CartPage />} />
                                        <Route path="/checkout" element={<Checkout />} />
                                        <Route path="/login" element={<Login />} />
                                        <Route path="/signup" element={<Signup />} />
                                        <Route path="*" element={<NotFound />} />
                                    </Routes>
                                </div>
                <Footer />
            </div>
        </AppProvider>
    );
}

const PageContent = () => null;

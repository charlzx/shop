import React, { useMemo, useContext } from 'react';
import { AppContext } from './AppContext.js';
import SEO from './SEO.jsx';

const WishlistPage = () => {
  const { wishlist, ALL_PRODUCTS, addToCart, toggleWishlist, navigate, openProduct } = useContext(AppContext);

  const wishlistedProducts = useMemo(() => {
    return ALL_PRODUCTS.filter(p => wishlist.includes(p.id));
  }, [wishlist, ALL_PRODUCTS]);

  return (
    <>
      <SEO title={`Wishlist — CRWN3`} description={`Items you've saved to your wishlist.`} url={typeof window !== 'undefined' ? window.location.href : undefined} />
      <main className="container mx-auto px-4 sm:px-6 py-16 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6">My Wishlist</h1>

        {wishlistedProducts.length === 0 ? (
          <div className="p-8 bg-gray-50 dark:bg-gray-900 rounded-lg text-center">
            <p className="text-gray-500">Your wishlist is empty. Browse the shop to add items you love.</p>
            <div className="mt-4">
              <button onClick={() => navigate('/shop')} className="bg-black text-white dark:bg-white dark:text-black px-4 py-2 rounded-md">Go to shop</button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {wishlistedProducts.map(item => (
              <div key={item.id} className="flex flex-col sm:flex-row gap-4 bg-white dark:bg-black p-4 rounded-md border border-gray-100 dark:border-gray-800">
                <button onClick={() => openProduct(item.id)} className="flex-shrink-0 p-0 border-0 bg-transparent cursor-pointer">
                  <img src={item.imageUrl} alt={item.name} className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-md" />
                </button>
                <div className="flex-1 flex flex-col">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-sm"><button onClick={() => openProduct(item.id)} className="text-left p-0 border-0 bg-transparent cursor-pointer hover:underline">{item.name}</button></h3>
                      <p className="text-xs text-gray-500 mt-1">₦{(item.discountPrice && new Date(item.saleEndDate) > new Date() ? item.discountPrice : item.price).toLocaleString()}</p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => addToCart(item.id)} className="px-3 py-2 bg-black text-white rounded-md">Add to cart</button>
                      <button onClick={() => toggleWishlist(item.id)} className="px-3 py-2 border rounded-md">Remove</button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-3">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  );
};

export default WishlistPage;

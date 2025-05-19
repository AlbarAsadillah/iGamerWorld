import React, { createContext, useContext, useState } from 'react';

// Membuat context untuk Wishlist
const WishlistContext = createContext();

// Provider untuk menyediakan data ke komponen lain
export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  const addToWishlist = (product) => {
    setWishlist((prev) => {
      if (!prev.find((item) => item.id === product.id)) {
        return [...prev, product];
      }
      return prev; // Produk sudah ada dalam wishlist
    });
  };

  const removeFromWishlist = (id) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

// Hook untuk mengakses Wishlist context
export const useWishlist = () => useContext(WishlistContext);

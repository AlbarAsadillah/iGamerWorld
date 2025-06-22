import { createContext, useState, useContext } from 'react';

// Membuat CartContext
const CartContext = createContext();

// Hook untuk menggunakan CartContext
export const useCart = () => {
  return useContext(CartContext);
};

// CartProvider untuk menyediakan state cart ke komponen lainnya
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Fungsi untuk menambahkan produk ke cart
  const addToCart = (product, quantity) => {
    setCart((prevCart) => {
      // Cek apakah produk sudah ada di keranjang
      const existingProductIndex = prevCart.findIndex(
        (item) => item.id === product.id
      );
      if (existingProductIndex >= 0) {
        // Jika ada, perbarui jumlah produk
        const updatedCart = [...prevCart];
        updatedCart[existingProductIndex].quantity += quantity;
        return updatedCart;
      } else {
        // Jika tidak ada, tambahkan produk baru
        return [...prevCart, { ...product, quantity }];
      }
    });
  };

  // Fungsi untuk menghapus produk dari cart
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  // Fungsi untuk mengupdate quantity produk di cart
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

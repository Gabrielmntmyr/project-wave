import { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface Photo {
  id: string;
  src: string;
  alt: string;
  category?: string;
  title?: string;
  description?: string;
  price: number;
  photographer: string;
}

interface CartContextType {
  cartItems: Photo[];
  addToCart: (photo: Photo) => void;
  removeFromCart: (photoId: string) => void;
  clearCart: () => void;
  getCartTotal: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cartItems, setCartItems] = useState<Photo[]>(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        return JSON.parse(savedCart);
      } catch {
        localStorage.removeItem('cart');
      }
    }
    return [];
  });

  // Save cart items to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (photo: Photo) => {
    // Check if the photo is already in the cart
    if (!cartItems.some((item) => item.id === photo.id)) {
      setCartItems([...cartItems, photo]);
    }
  };

  const removeFromCart = (photoId: string) => {
    setCartItems(cartItems.filter((item) => item.id !== photoId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        getCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
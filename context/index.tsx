import { CartItem } from "@/data/types/general";
import { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface AppContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  decreaseFromCart: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppWrapper({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  const addToCart = (item: CartItem) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        toast.info(`Quantity increased to ${existingItem.quantity + 1} for ${existingItem.name}`);
        return prevCart.map(cartItem =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        );
      } else {
        toast.success(`${item.name} added to cart!`);
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id: string) => {
    const item = cart.find(cartItem => cartItem.id === id);
    setCart(prevCart => {
      toast.error(`${item?.name} removed from cart`);
      return prevCart.filter(cartItem => cartItem.id !== id);
    });
  };

  const decreaseFromCart = (id: string) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === id);
      if (existingItem) {
        if (existingItem.quantity <= 1) {
          toast.error(`${existingItem.name} removed from cart`);
          return prevCart.filter(cartItem => cartItem.id !== id);
        } else {
          toast.info(`Quantity decreased to ${existingItem.quantity - 1} for ${existingItem.name}`);
          return prevCart.map(cartItem =>
            cartItem.id === id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
          );
        }
      }
      return prevCart;
    });
  };

  return (
    <AppContext.Provider value={{ cart, addToCart, removeFromCart, decreaseFromCart }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within a AppWrapper");
  }
  return context;
}

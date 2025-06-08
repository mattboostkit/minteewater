import { createContext, useContext, useReducer, ReactNode } from "react";
import { Product } from "@shared/schema";

interface CartItem extends Product {
  cartQuantity: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  total: number;
  count: number;
}

type CartAction =
  | { type: "ADD_ITEM"; payload: Product }
  | { type: "REMOVE_ITEM"; payload: number }
  | { type: "UPDATE_QUANTITY"; payload: { id: number; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "TOGGLE_CART" }
  | { type: "OPEN_CART" }
  | { type: "CLOSE_CART" };

const calculateTotals = (items: CartItem[]) => {
  const count = items.reduce((sum, item) => sum + item.cartQuantity, 0);
  const total = items.reduce((sum, item) => sum + (parseFloat(item.price) * item.cartQuantity), 0);
  return { count, total };
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      let newItems: CartItem[];
      
      if (existingItem) {
        newItems = state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, cartQuantity: item.cartQuantity + 1 }
            : item
        );
      } else {
        newItems = [...state.items, { ...action.payload, cartQuantity: 1 }];
      }
      
      const { count, total } = calculateTotals(newItems);
      return { ...state, items: newItems, count, total };
    }
    
    case "REMOVE_ITEM": {
      const newItems = state.items.filter(item => item.id !== action.payload);
      const { count, total } = calculateTotals(newItems);
      return { ...state, items: newItems, count, total };
    }
    
    case "UPDATE_QUANTITY": {
      const newItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, cartQuantity: action.payload.quantity }
          : item
      ).filter(item => item.cartQuantity > 0);
      
      const { count, total } = calculateTotals(newItems);
      return { ...state, items: newItems, count, total };
    }
    
    case "CLEAR_CART": {
      return { ...state, items: [], count: 0, total: 0 };
    }
    
    case "TOGGLE_CART": {
      return { ...state, isOpen: !state.isOpen };
    }
    
    case "OPEN_CART": {
      return { ...state, isOpen: true };
    }
    
    case "CLOSE_CART": {
      return { ...state, isOpen: false };
    }
    
    default:
      return state;
  }
};

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
  addItem: (product: Product) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
} | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    isOpen: false,
    total: 0,
    count: 0
  });

  const addItem = (product: Product) => dispatch({ type: "ADD_ITEM", payload: product });
  const removeItem = (id: number) => dispatch({ type: "REMOVE_ITEM", payload: id });
  const updateQuantity = (id: number, quantity: number) => dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
  const clearCart = () => dispatch({ type: "CLEAR_CART" });
  const toggleCart = () => dispatch({ type: "TOGGLE_CART" });
  const openCart = () => dispatch({ type: "OPEN_CART" });
  const closeCart = () => dispatch({ type: "CLOSE_CART" });

  return (
    <CartContext.Provider value={{ 
      state, 
      dispatch, 
      addItem, 
      removeItem, 
      updateQuantity, 
      clearCart, 
      toggleCart, 
      openCart, 
      closeCart 
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

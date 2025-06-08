import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart-store";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

export default function CartSidebar() {
  const { state, dispatch } = useCart();
  const { toast } = useToast();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [checkoutData, setCheckoutData] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    deliveryAddress: ""
  });

  const updateQuantity = (id: number, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
  };

  const removeItem = (id: number) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCheckingOut(true);

    try {
      const checkoutPayload = {
        ...checkoutData,
        items: state.items.map(item => ({
          productId: item.id,
          quantity: item.cartQuantity
        }))
      };

      const response = await apiRequest("POST", "/api/checkout", checkoutPayload);
      const result = await response.json();

      toast({
        title: "Order placed successfully!",
        description: `Your order #${result.orderId} has been received. Total: £${result.totalAmount}`,
      });

      dispatch({ type: "CLEAR_CART" });
      dispatch({ type: "CLOSE_CART" });
      setShowCheckoutForm(false);
      setCheckoutData({
        customerName: "",
        customerEmail: "",
        customerPhone: "",
        deliveryAddress: ""
      });
    } catch (error) {
      toast({
        title: "Checkout failed",
        description: "Please try again or contact customer service.",
        variant: "destructive",
      });
    } finally {
      setIsCheckingOut(false);
    }
  };

  if (!state.isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => dispatch({ type: "CLOSE_CART" })}></div>
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
        <div className="flex flex-col h-full">
          {/* Cart Header */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="gazpacho-black text-xl text-green-800">Your Cart</h3>
              <button 
                onClick={() => dispatch({ type: "CLOSE_CART" })}
                className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>
          
          {/* Cart Content */}
          <div className="flex-1 overflow-y-auto">
            {!showCheckoutForm ? (
              <>
                {/* Cart Items */}
                <div className="px-6 py-4">
                  {state.items.length === 0 ? (
                    <div className="text-center py-12">
                      <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500">Your cart is empty</p>
                      <Button 
                        onClick={() => dispatch({ type: "CLOSE_CART" })}
                        variant="link" 
                        className="mt-4 text-green-600 hover:text-green-700 font-semibold"
                      >
                        Continue Shopping
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {state.items.map((item) => (
                        <div key={item.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                          <img 
                            src={item.imageUrl || "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"} 
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900">{item.name}</h4>
                            <p className="text-sm text-gray-500">{item.quantity} bottles</p>
                            <p className="text-green-700 font-semibold">£{item.price}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button 
                              onClick={() => updateQuantity(item.id, item.cartQuantity - 1)}
                              className="p-1 rounded-full hover:bg-gray-100"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-8 text-center">{item.cartQuantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.cartQuantity + 1)}
                              className="p-1 rounded-full hover:bg-gray-100"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          <button 
                            onClick={() => removeItem(item.id)}
                            className="p-1 text-red-500 hover:text-red-700"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </>
            ) : (
              /* Checkout Form */
              <div className="px-6 py-4">
                <form onSubmit={handleCheckout} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      value={checkoutData.customerName}
                      onChange={(e) => setCheckoutData({ ...checkoutData, customerName: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      value={checkoutData.customerEmail}
                      onChange={(e) => setCheckoutData({ ...checkoutData, customerEmail: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone (Optional)</label>
                    <input
                      type="tel"
                      value={checkoutData.customerPhone}
                      onChange={(e) => setCheckoutData({ ...checkoutData, customerPhone: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Address</label>
                    <textarea
                      value={checkoutData.deliveryAddress}
                      onChange={(e) => setCheckoutData({ ...checkoutData, deliveryAddress: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 h-20 resize-none"
                      placeholder="Full delivery address including postcode"
                      required
                    />
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      type="button"
                      onClick={() => setShowCheckoutForm(false)}
                      variant="outline"
                      className="flex-1"
                    >
                      Back to Cart
                    </Button>
                    <Button
                      type="submit"
                      disabled={isCheckingOut}
                      className="flex-1 bg-green-600 hover:bg-green-700"
                    >
                      {isCheckingOut ? "Processing..." : "Place Order"}
                    </Button>
                  </div>
                </form>
              </div>
            )}
          </div>
          
          {/* Cart Footer */}
          {state.items.length > 0 && !showCheckoutForm && (
            <div className="border-t border-gray-200 px-6 py-4 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-900">Total:</span>
                <span className="text-2xl font-bold text-green-700">£{state.total.toFixed(2)}</span>
              </div>
              <Button 
                onClick={() => setShowCheckoutForm(true)}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-full font-semibold transition-colors"
              >
                Proceed to Checkout
              </Button>
              <p className="text-xs text-gray-500 text-center">
                Free UK delivery on orders over £25
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

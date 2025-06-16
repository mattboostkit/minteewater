import { useStripe, Elements, PaymentElement, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/lib/cart-store";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";

// Make sure to call `loadStripe` outside of a component's render to avoid
// recreating the `Stripe` object on every render.
if (!import.meta.env.VITE_STRIPE_PUBLIC_KEY) {
  throw new Error('Missing required Stripe key: VITE_STRIPE_PUBLIC_KEY');
}
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const { clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      toast({
        title: "Payment Error",
        description: "Payment system is not ready. Please try again.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/payment-success`,
        },
        redirect: 'if_required'
      });

      if (error) {
        console.error('Payment error:', error);
        toast({
          title: "Payment Failed",
          description: error.message || "Payment could not be processed",
          variant: "destructive",
        });
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        clearCart();
        toast({
          title: "Payment Successful",
          description: "Thank you for your purchase!",
        });
        // Redirect to success page
        window.location.href = '/payment-success';
      }
    } catch (err) {
      console.error('Unexpected payment error:', err);
      toast({
        title: "Payment Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    }

    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement 
        options={{
          layout: "tabs"
        }}
      />
      <button 
        disabled={!stripe || !elements || isProcessing}
        className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors"
      >
        {isProcessing ? "Processing..." : "Complete Payment"}
      </button>
    </form>
  );
};

export default function Checkout() {
  const [clientSecret, setClientSecret] = useState("");
  const { state } = useCart();
  const { items, total } = state;

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    if (items.length === 0) {
      return;
    }

    // Create PaymentIntent as soon as the page loads
    apiRequest("POST", "/api/create-payment-intent", { amount: total })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
      })
      .catch((error) => {
        console.error("Payment intent error:", error);
      });
  }, [total, items.length]);

  if (items.length === 0) {
    return (
      <main className="pt-16 min-h-screen bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
          <h1 className="gazpacho-black text-3xl text-green-800 mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-8">Add some products to your cart before checking out.</p>
          <Link href="/shop">
            <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
              Browse Products
            </button>
          </Link>
        </div>
      </main>
    );
  }

  if (!clientSecret) {
    return (
      <main className="pt-16 min-h-screen bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 py-16">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center justify-center">
              <div className="animate-spin w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full" aria-label="Loading"/>
              <span className="ml-3 text-gray-600">Setting up payment...</span>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/shop">
            <button className="flex items-center text-green-600 hover:text-green-700 font-medium">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Shop
            </button>
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="gazpacho-black text-3xl text-green-800 mb-8">Complete Your Order</h1>
          
          {/* Order Summary */}
          <div className="mb-8 p-6 bg-gray-50 rounded-xl">
            <h2 className="font-semibold text-lg mb-4">Order Summary</h2>
            {items.map((item: any) => (
              <div key={item.id} className="flex justify-between items-center py-2">
                <span>{item.name} x {item.cartQuantity}</span>
                <span>€{(parseFloat(item.price) * item.cartQuantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="border-t pt-4 mt-4">
              <div className="flex justify-between items-center font-bold text-lg">
                <span>Total</span>
                <span>€{total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <Elements 
            stripe={stripePromise} 
            options={{ 
              clientSecret,
              appearance: {
                theme: 'stripe',
                variables: {
                  colorPrimary: '#16a34a',
                  colorBackground: '#ffffff',
                  colorText: '#1f2937',
                  fontFamily: 'system-ui, sans-serif',
                  borderRadius: '8px'
                }
              }
            }}
          >
            <CheckoutForm />
          </Elements>
        </div>
      </div>
    </main>
  );
}
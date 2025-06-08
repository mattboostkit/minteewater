import { CheckCircle } from "lucide-react";
import { Link } from "wouter";
import { useEffect } from "react";
import { useCart } from "@/lib/cart-store";

export default function PaymentSuccess() {
  const { clearCart } = useCart();

  useEffect(() => {
    // Clear cart on successful payment
    clearCart();
  }, []);

  return (
    <main className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-16">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="mb-6">
            <CheckCircle className="w-20 h-20 text-green-600 mx-auto mb-4" />
            <h1 className="gazpacho-black text-3xl text-green-800 mb-4">Payment Successful!</h1>
            <p className="text-gray-600 text-lg mb-8">
              Thank you for your order. We've received your payment and will process your order shortly.
            </p>
          </div>

          <div className="bg-green-50 rounded-xl p-6 mb-8">
            <h2 className="font-semibold text-green-800 mb-2">What happens next?</h2>
            <ul className="text-green-700 text-sm space-y-2">
              <li>• You'll receive an email confirmation shortly</li>
              <li>• Your order will be processed within 1-2 business days</li>
              <li>• Free UK delivery on orders over £25</li>
              <li>• Track your order via the confirmation email</li>
            </ul>
          </div>

          <div className="space-y-4">
            <Link href="/">
              <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                Continue Shopping
              </button>
            </Link>
            <Link href="/contact">
              <button className="w-full border border-green-600 text-green-600 hover:bg-green-50 font-semibold py-3 px-6 rounded-lg transition-colors">
                Contact Support
              </button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
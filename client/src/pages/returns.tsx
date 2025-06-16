import { RefreshCw, CheckCircle, XCircle, Mail } from "lucide-react";

export default function Returns() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="gazpacho-black text-4xl md:text-5xl text-green-800 mb-4">
            Returns & Refunds
          </h1>
          <p className="text-xl text-gray-600">
            Your satisfaction is our priority
          </p>
        </div>

        <div className="bg-green-100 p-8 rounded-2xl mb-12">
          <h2 className="gazpacho-black text-2xl text-green-800 mb-4">
            30-Day Satisfaction Guarantee
          </h2>
          <p className="text-gray-700 text-lg">
            We're confident you'll love Mintee, but if for any reason you're not completely satisfied 
            with your purchase, we offer a hassle-free 30-day return policy from the date of delivery.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <div className="flex items-center mb-4">
              <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
              <h3 className="gazpacho-black text-xl text-green-800">Eligible for Return</h3>
            </div>
            <ul className="space-y-2 text-gray-600">
              <li>• Unopened bottles in original packaging</li>
              <li>• Damaged or defective products</li>
              <li>• Wrong items delivered</li>
              <li>• Products within 30 days of delivery</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <div className="flex items-center mb-4">
              <XCircle className="w-6 h-6 text-red-600 mr-3" />
              <h3 className="gazpacho-black text-xl text-green-800">Not Eligible</h3>
            </div>
            <ul className="space-y-2 text-gray-600">
              <li>• Opened or partially consumed products</li>
              <li>• Products without proof of purchase</li>
              <li>• Items past 30-day return window</li>
              <li>• Products not purchased directly from us</li>
            </ul>
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <h3 className="gazpacho-black text-2xl text-green-800 mb-4">How to Return</h3>
            <ol className="list-decimal list-inside space-y-3 text-gray-600 ml-4">
              <li>
                <strong>Contact Us:</strong> Email returns@minteewater.com with your order number and reason for return
              </li>
              <li>
                <strong>Receive Instructions:</strong> We'll send you a prepaid return label and instructions within 24 hours
              </li>
              <li>
                <strong>Pack Items:</strong> Securely pack the items in their original packaging if possible
              </li>
              <li>
                <strong>Ship Back:</strong> Drop off at any designated carrier location using our prepaid label
              </li>
              <li>
                <strong>Get Refund:</strong> Once received and inspected, we'll process your refund within 5-7 business days
              </li>
            </ol>
          </div>

          <div>
            <h3 className="gazpacho-black text-2xl text-green-800 mb-4">Refund Process</h3>
            <div className="bg-gray-50 p-6 rounded-xl">
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <RefreshCw className="w-5 h-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                  <span>Refunds are issued to the original payment method</span>
                </li>
                <li className="flex items-start">
                  <RefreshCw className="w-5 h-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                  <span>Processing takes 5-7 business days after we receive your return</span>
                </li>
                <li className="flex items-start">
                  <RefreshCw className="w-5 h-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                  <span>You'll receive email confirmation once your refund is processed</span>
                </li>
                <li className="flex items-start">
                  <RefreshCw className="w-5 h-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                  <span>Bank processing times may add 3-5 additional business days</span>
                </li>
              </ul>
            </div>
          </div>

          <div>
            <h3 className="gazpacho-black text-2xl text-green-800 mb-4">Damaged or Defective Items</h3>
            <p className="text-gray-600 mb-4">
              If you receive damaged or defective products, we'll replace them immediately at no cost to you:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
              <li>Take photos of the damaged items and packaging</li>
              <li>Email photos to support@minteewater.com within 48 hours</li>
              <li>We'll send replacements via express shipping</li>
              <li>No need to return damaged items</li>
            </ul>
          </div>

          <div>
            <h3 className="gazpacho-black text-2xl text-green-800 mb-4">Subscription Returns</h3>
            <p className="text-gray-600 mb-4">
              For subscription orders:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
              <li>You can cancel anytime - no questions asked</li>
              <li>Returns follow the same 30-day policy</li>
              <li>Partial refunds available for unopened bottles</li>
              <li>Consider pausing instead of cancelling if you need a break</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 p-6 bg-white rounded-2xl shadow-sm">
          <h3 className="gazpacho-black text-xl text-green-800 mb-3 text-center">Questions About Returns?</h3>
          <p className="text-gray-600 mb-6 text-center">
            Our customer support team is here to help make returns as easy as possible.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:returns@minteewater.com"
              className="inline-flex items-center justify-center px-6 py-3 bg-green-600 text-white rounded-full font-semibold hover:bg-green-700 transition-colors"
            >
              <Mail className="w-5 h-5 mr-2" />
              Email Returns Team
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-green-600 border-2 border-green-600 rounded-full font-semibold hover:bg-green-50 transition-colors"
            >
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
import { Package, Truck, Clock, MapPin } from "lucide-react";

export default function Shipping() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="gazpacho-black text-4xl md:text-5xl text-green-800 mb-4">
            Shipping Information
          </h1>
          <p className="text-xl text-gray-600">
            Fast, reliable delivery across the UK
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <div className="flex items-center mb-4">
              <Truck className="w-6 h-6 text-green-600 mr-3" />
              <h3 className="gazpacho-black text-xl text-green-800">Standard Delivery</h3>
            </div>
            <ul className="space-y-2 text-gray-600">
              <li>• 2-3 business days</li>
              <li>• £3.99 for orders under £30</li>
              <li>• FREE for orders over £30</li>
              <li>• Tracked delivery service</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <div className="flex items-center mb-4">
              <Clock className="w-6 h-6 text-green-600 mr-3" />
              <h3 className="gazpacho-black text-xl text-green-800">Express Delivery</h3>
            </div>
            <ul className="space-y-2 text-gray-600">
              <li>• Next business day delivery</li>
              <li>• £7.99 flat rate</li>
              <li>• Order before 2 PM for next day</li>
              <li>• Priority handling</li>
            </ul>
          </div>
        </div>

        <div className="bg-green-100 p-8 rounded-2xl mb-12">
          <h3 className="gazpacho-black text-2xl text-green-800 mb-4">Subscription Deliveries</h3>
          <div className="space-y-3 text-gray-700">
            <p className="flex items-start">
              <Package className="w-5 h-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
              <span>All subscription orders enjoy FREE delivery, regardless of order size</span>
            </p>
            <p className="flex items-start">
              <MapPin className="w-5 h-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
              <span>Deliveries are scheduled based on your chosen frequency (weekly, monthly, or quarterly)</span>
            </p>
            <p className="flex items-start">
              <Clock className="w-5 h-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
              <span>You'll receive tracking information 24 hours before each delivery</span>
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="gazpacho-black text-2xl text-green-800 mb-4">Delivery Areas</h3>
            <p className="text-gray-600 mb-4">
              We currently deliver to all UK mainland addresses. Unfortunately, we cannot deliver to:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
              <li>Channel Islands</li>
              <li>Isle of Man</li>
              <li>Scottish Highlands and Islands</li>
              <li>Northern Ireland (coming soon!)</li>
            </ul>
          </div>

          <div>
            <h3 className="gazpacho-black text-2xl text-green-800 mb-4">Tracking Your Order</h3>
            <p className="text-gray-600 mb-4">
              Once your order is dispatched, you'll receive an email with tracking information. You can:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
              <li>Track your delivery in real-time</li>
              <li>Receive SMS updates on delivery day</li>
              <li>Provide delivery instructions</li>
              <li>Reschedule delivery if needed</li>
            </ul>
          </div>

          <div>
            <h3 className="gazpacho-black text-2xl text-green-800 mb-4">Delivery Issues</h3>
            <p className="text-gray-600 mb-4">
              If you experience any issues with your delivery:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
              <li>Check your tracking information first</li>
              <li>Contact our support team within 48 hours</li>
              <li>We'll arrange a replacement or refund</li>
              <li>Email: support@minteewater.com</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 p-6 bg-white rounded-2xl shadow-sm text-center">
          <h3 className="gazpacho-black text-xl text-green-800 mb-3">Need Help?</h3>
          <p className="text-gray-600 mb-4">
            Our customer support team is available Monday-Friday, 9 AM - 5 PM
          </p>
          <a
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-3 bg-green-600 text-white rounded-full font-semibold hover:bg-green-700 transition-colors"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
}
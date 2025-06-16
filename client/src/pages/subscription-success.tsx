import { useEffect } from "react";
import { CheckCircle, Calendar, Package, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function SubscriptionSuccess() {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Subscription Activated!
          </h1>
          <p className="text-xl text-gray-600">
            Welcome to the Mintee family! Your subscription has been successfully set up.
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center justify-center gap-2">
              <Package className="w-5 h-5" />
              What happens next?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-blue-600 font-bold">1</span>
                </div>
                <h3 className="font-semibold mb-2">Order Processing</h3>
                <p className="text-sm text-gray-600">
                  We'll prepare your first delivery within 1-2 business days
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-blue-600 font-bold">2</span>
                </div>
                <h3 className="font-semibold mb-2">First Delivery</h3>
                <p className="text-sm text-gray-600">
                  Your Mintee bottles will arrive fresh and perfectly chilled
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">Regular Deliveries</h3>
                <p className="text-sm text-gray-600">
                  Automatic deliveries on your chosen schedule
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="bg-green-50 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-green-800 mb-2">
            Subscription Benefits
          </h3>
          <ul className="text-left space-y-2 text-green-700">
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Save money with subscriber-only pricing
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Free delivery on all subscription orders
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Skip, pause, or cancel anytime
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Priority customer support
            </li>
          </ul>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Important Information</CardTitle>
          </CardHeader>
          <CardContent className="text-left space-y-4">
            <div>
              <h4 className="font-semibold mb-1">Email Confirmation</h4>
              <p className="text-sm text-gray-600">
                You'll receive an email confirmation with your subscription details and delivery schedule.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-1">Managing Your Subscription</h4>
              <p className="text-sm text-gray-600">
                Contact us anytime to modify your delivery schedule, change your address, or manage your subscription.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-1">Delivery Updates</h4>
              <p className="text-sm text-gray-600">
                We'll send you tracking information and delivery updates via email and SMS.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <a href="/">
              <Home className="w-4 h-4 mr-2" />
              Return Home
            </a>
          </Button>
          <Button variant="outline" asChild size="lg">
            <a href="/contact">
              Contact Support
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
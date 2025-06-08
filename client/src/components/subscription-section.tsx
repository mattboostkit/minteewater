import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, Package, ArrowRight } from "lucide-react";

export default function SubscriptionSection() {
  return (
    <section id="subscription" className="py-20 bg-gradient-to-b from-green-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-green-100 text-green-800 hover:bg-green-100">
            New Feature
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Subscribe & Never Run Out
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join the Mintee family with our subscription service. Enjoy regular deliveries, 
            exclusive pricing, and the convenience of never running out of your favourite peppermint water.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center border-green-100">
            <CardHeader>
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <CardTitle className="text-xl">Save Money</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Enjoy exclusive subscriber pricing and save up to 15% compared to one-off purchases.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center border-green-100">
            <CardHeader>
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-green-600" />
              </div>
              <CardTitle className="text-xl">Convenience</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Automatic deliveries on your schedule. Skip, pause, or modify anytime with full flexibility.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center border-green-100">
            <CardHeader>
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="w-8 h-8 text-green-600" />
              </div>
              <CardTitle className="text-xl">Priority Delivery</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Free delivery on all subscription orders plus priority processing and customer support.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Subscription Plans Preview */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <h3 className="text-2xl font-bold text-center mb-8">Choose Your Perfect Plan</h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 rounded-lg border border-gray-200">
              <h4 className="text-lg font-semibold mb-2">Weekly Refresh</h4>
              <div className="text-3xl font-bold text-green-600 mb-2">£15.99</div>
              <p className="text-gray-600 mb-4">6 bottles every week</p>
              <p className="text-sm text-gray-500">Perfect for daily hydration</p>
            </div>
            
            <div className="text-center p-6 rounded-lg border-2 border-green-500 bg-green-50 relative">
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-green-500">
                Most Popular
              </Badge>
              <h4 className="text-lg font-semibold mb-2">Monthly Essential</h4>
              <div className="text-3xl font-bold text-green-600 mb-2">£29.99</div>
              <p className="text-gray-600 mb-4">12 bottles every month</p>
              <p className="text-sm text-gray-500">Ideal for regular enjoyment</p>
            </div>
            
            <div className="text-center p-6 rounded-lg border border-gray-200">
              <h4 className="text-lg font-semibold mb-2">Quarterly Stock</h4>
              <div className="text-3xl font-bold text-green-600 mb-2">£84.99</div>
              <p className="text-gray-600 mb-4">36 bottles every 3 months</p>
              <p className="text-sm text-gray-500">Best value for families</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-lg">
            <a href="/subscribe">
              Start Your Subscription
              <ArrowRight className="w-5 h-5 ml-2" />
            </a>
          </Button>
          <p className="text-sm text-gray-500 mt-4">
            Cancel or modify anytime • No long-term commitment • Free delivery
          </p>
        </div>
      </div>
    </section>
  );
}
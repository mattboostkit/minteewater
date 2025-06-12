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

        {/* Subscription Plans */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Weekly Plan */}
          <Card className="flex flex-col rounded-2xl shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Weekly Delivery</CardTitle>
              <CardDescription>Fresh Mintee delivered to your door every week</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow text-center">
              <div className="text-5xl font-bold my-4">€11<span className="text-xl font-normal text-gray-500">/weekly</span></div>
              <ul className="space-y-2 text-gray-600 text-left">
                <li className="flex justify-between"><span>Bottles per delivery:</span> <strong>6</strong></li>
                <li className="flex justify-between"><span>Delivery frequency:</span> <strong>Every week</strong></li>
                <li className="flex justify-between"><span>Price per bottle:</span> <strong>€1.83</strong></li>
              </ul>
              <Badge variant="outline" className="mt-4 text-green-700 border-green-200 bg-green-50">5% discount from retail</Badge>
            </CardContent>
            <div className="p-6 pt-0">
              <Button className="w-full bg-green-500 hover:bg-green-600 text-white py-6 text-lg">Choose Plan</Button>
              <p className="text-xs text-gray-500 mt-2 text-center">Cancel or modify anytime</p>
            </div>
          </Card>

          {/* Monthly Plan */}
          <Card className="flex flex-col rounded-2xl shadow-lg border-2 border-green-500 relative">
            <Badge className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-1 rounded-full text-sm font-semibold">Most Popular</Badge>
            <CardHeader className="text-center pt-8">
              <CardTitle className="text-2xl">Monthly Delivery</CardTitle>
              <CardDescription>Monthly supply of refreshing Mintee water</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow text-center">
              <div className="text-5xl font-bold my-4">€40<span className="text-xl font-normal text-gray-500">/monthly</span></div>
              <ul className="space-y-2 text-gray-600 text-left">
                <li className="flex justify-between"><span>Bottles per delivery:</span> <strong>24</strong></li>
                <li className="flex justify-between"><span>Delivery frequency:</span> <strong>Every month</strong></li>
                <li className="flex justify-between"><span>Price per bottle:</span> <strong>€1.67</strong></li>
              </ul>
              <Badge variant="outline" className="mt-4 text-green-700 border-green-200 bg-green-50">13% discount vs retail</Badge>
            </CardContent>
            <div className="p-6 pt-0">
              <Button className="w-full bg-green-500 hover:bg-green-600 text-white py-6 text-lg">Choose Plan</Button>
              <p className="text-xs text-gray-500 mt-2 text-center">Cancel or modify anytime</p>
            </div>
          </Card>

          {/* Quarterly Plan */}
          <Card className="flex flex-col rounded-2xl shadow-lg relative">
            <Badge className="absolute -top-4 right-4 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-semibold">Best Value</Badge>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Quarterly Delivery</CardTitle>
              <CardDescription>Stock up with our best value quarterly plan</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow text-center">
              <div className="text-5xl font-bold my-4">€100<span className="text-xl font-normal text-gray-500">/quarterly</span></div>
              <ul className="space-y-2 text-gray-600 text-left">
                <li className="flex justify-between"><span>Bottles per delivery:</span> <strong>72</strong></li>
                <li className="flex justify-between"><span>Delivery frequency:</span> <strong>Every 3 months</strong></li>
                <li className="flex justify-between"><span>Price per bottle:</span> <strong>€1.39</strong></li>
              </ul>
              <Badge variant="outline" className="mt-4 text-green-700 border-green-200 bg-green-50">28% discount vs retail</Badge>
            </CardContent>
            <div className="p-6 pt-0">
              <Button className="w-full bg-green-500 hover:bg-green-600 text-white py-6 text-lg">Choose Plan</Button>
              <p className="text-xs text-gray-500 mt-2 text-center">Cancel or modify anytime</p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
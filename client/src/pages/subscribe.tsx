import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useElements, useStripe, Elements, PaymentElement } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { CheckCircle, Clock, Package, Truck } from "lucide-react";

if (!import.meta.env.VITE_STRIPE_PUBLIC_KEY) {
  throw new Error('Missing required Stripe key: VITE_STRIPE_PUBLIC_KEY');
}
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

interface SubscriptionPlan {
  id: number;
  name: string;
  description: string | null;
  price: string;
  interval: string;
  bottlesPerDelivery: number;
  isPopular: boolean;
}

interface CustomerInfoFormProps {
  selectedPlan: SubscriptionPlan | null;
  onBack: () => void;
  onClientSecretReceived: (secret: string) => void;
}

const CustomerInfoForm = ({ selectedPlan, onBack, onClientSecretReceived }: CustomerInfoFormProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    address: ""
  });

  const handleCustomerInfoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedPlan || !customerInfo.name || !customerInfo.email || !customerInfo.address) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await apiRequest("POST", "/api/create-subscription", {
        planId: selectedPlan.id,
        deliveryAddress: customerInfo.address,
        customerName: customerInfo.name,
        customerEmail: customerInfo.email,
        userId: null // For guest checkout
      });

      const data = await response.json();
      onClientSecretReceived(data.clientSecret);
    } catch (error: any) {
      toast({
        title: "Subscription Error",
        description: error.message || "Failed to create subscription",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };


  return (
    <div className="max-w-md mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Subscription Details</CardTitle>
          <CardDescription>
            £{selectedPlan?.price}/{selectedPlan?.interval} • {selectedPlan?.bottlesPerDelivery} bottles
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCustomerInfoSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                required
                value={customerInfo.name}
                onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                required
                value={customerInfo.email}
                onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter your email address"
              />
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                Delivery Address
              </label>
              <textarea
                id="address"
                required
                rows={3}
                value={customerInfo.address}
                onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter your full delivery address"
              />
            </div>

            <div className="pt-4 border-t">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold">Total:</span>
                <span className="text-2xl font-bold text-green-600">
                  £{selectedPlan?.price}/{selectedPlan?.interval}
                </span>
              </div>
              
              <div className="flex gap-3">
                <Button type="button" variant="outline" onClick={onBack} className="flex-1">
                  Back
                </Button>
                <Button type="submit" disabled={isLoading} className="flex-1">
                  {isLoading ? "Processing..." : "Continue to Payment"}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

interface PaymentFormProps {
  selectedPlan: SubscriptionPlan | null;
  onBack: () => void;
}

const PaymentForm = ({ selectedPlan, onBack }: PaymentFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/subscription-success`,
        },
      });

      if (error) {
        toast({
          title: "Payment Error",
          description: error.message || "Failed to process payment",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      toast({
        title: "Payment Error",
        description: error.message || "Failed to process payment",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Complete Your Subscription</CardTitle>
          <CardDescription>
            £{selectedPlan?.price}/{selectedPlan?.interval} • {selectedPlan?.bottlesPerDelivery} bottles
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePaymentSubmit} className="space-y-4">
            <PaymentElement />
            <div className="flex gap-3 pt-4">
              <Button type="button" variant="outline" onClick={onBack} className="flex-1">
                Back
              </Button>
              <Button type="submit" disabled={!stripe || isLoading} className="flex-1">
                {isLoading ? "Processing..." : "Subscribe Now"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default function Subscribe() {
  const { toast } = useToast();
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  const { data: plans, isLoading, error } = useQuery<SubscriptionPlan[]>({
    queryKey: ["/api/subscription-plans"],
  });

  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: "Failed to load subscription plans",
        variant: "destructive",
      });
    }
  }, [error, toast]);

  const getIntervalText = (interval: string) => {
    switch (interval) {
      case 'weekly': return 'Every week';
      case 'monthly': return 'Every month';
      case 'quarterly': return 'Every 3 months';
      default: return interval;
    }
  };

  const getPopularPlan = () => {
    return plans?.find(plan => plan.interval === 'monthly');
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 pt-24">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
          <p>Loading subscription plans...</p>
        </div>
      </div>
    );
  }

  if (selectedPlan) {
    return (
      <div className="container mx-auto px-4 py-16 pt-24">
        {clientSecret ? (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <PaymentForm 
              selectedPlan={selectedPlan} 
              onBack={() => {
                setSelectedPlan(null);
                setClientSecret(null);
              }}
            />
          </Elements>
        ) : (
          <CustomerInfoForm 
            selectedPlan={selectedPlan} 
            onBack={() => setSelectedPlan(null)}
            onClientSecretReceived={setClientSecret}
          />
        )}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16 pt-24">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Subscribe & Save
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Never run out of your favourite peppermint water. Choose a plan that works for you.
        </p>
      </div>

      {/* Benefits Section */}
      <div className="grid md:grid-cols-4 gap-6 mb-12">
        <div className="text-center">
          <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
            <CheckCircle className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="font-semibold mb-1">Save Money</h3>
          <p className="text-sm text-gray-600">Better prices than one-off orders</p>
        </div>
        <div className="text-center">
          <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
            <Clock className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="font-semibold mb-1">Never Run Out</h3>
          <p className="text-sm text-gray-600">Automatic deliveries on schedule</p>
        </div>
        <div className="text-center">
          <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
            <Package className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="font-semibold mb-1">Flexible Plans</h3>
          <p className="text-sm text-gray-600">Change or cancel anytime</p>
        </div>
        <div className="text-center">
          <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
            <Truck className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="font-semibold mb-1">Free Delivery</h3>
          <p className="text-sm text-gray-600">No delivery charges for subscribers</p>
        </div>
      </div>

      {/* Subscription Plans */}
      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {plans?.map((plan) => (
          <Card key={plan.id} className={`relative ${getPopularPlan()?.id === plan.id ? 'border-2 border-green-500' : ''}`}>
            {getPopularPlan()?.id === plan.id && (
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-green-500">
                Most Popular
              </Badge>
            )}
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">{plan.name}</CardTitle>
              <CardDescription className="min-h-[3rem]">
                {plan.description}
              </CardDescription>
              <div className="pt-4">
                <span className="text-4xl font-bold text-green-600">£{plan.price}</span>
                <span className="text-gray-600">/{plan.interval}</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span>Bottles per delivery:</span>
                  <span className="font-semibold">{plan.bottlesPerDelivery}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Delivery frequency:</span>
                  <span className="font-semibold">{getIntervalText(plan.interval)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Price per bottle:</span>
                  <span className="font-semibold">
                    £{(parseFloat(plan.price) / plan.bottlesPerDelivery).toFixed(2)}
                  </span>
                </div>
              </div>
              
              <Button 
                className="w-full" 
                size="lg"
                onClick={() => setSelectedPlan(plan)}
                variant={getPopularPlan()?.id === plan.id ? "default" : "outline"}
              >
                Choose Plan
              </Button>
              
              <p className="text-xs text-gray-500 text-center">
                Cancel or modify anytime
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center mt-12">
        <p className="text-gray-600">
          Questions about subscriptions? 
          <a href="/contact" className="text-green-600 hover:underline ml-1">
            Contact us
          </a>
        </p>
      </div>
    </div>
  );
}
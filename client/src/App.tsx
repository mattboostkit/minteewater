import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/lib/cart-store";
import { usePageTitle } from "@/hooks/use-page-title";
import Header from "@/components/header";
import Footer from "@/components/footer";
import CartSidebar from "@/components/cart-sidebar";
import Home from "@/pages/home";
import Shop from "@/pages/shop";
import About from "@/pages/about";
import Sustainability from "@/pages/sustainability";
import Contact from "@/pages/contact";
import Checkout from "@/pages/checkout";
import PaymentSuccess from "@/pages/payment-success";
import Subscribe from "@/pages/subscribe";
import SubscriptionSuccess from "@/pages/subscription-success";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/shop" component={Shop} />
      <Route path="/about" component={About} />
      <Route path="/sustainability" component={Sustainability} />
      <Route path="/contact" component={Contact} />
      <Route path="/checkout" component={Checkout} />
      <Route path="/payment-success" component={PaymentSuccess} />
      <Route path="/subscribe" component={Subscribe} />
      <Route path="/subscription-success" component={SubscriptionSuccess} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  usePageTitle();
  
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <TooltipProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              <Router />
            </main>
            <Footer />
            <CartSidebar />
          </div>
          <Toaster />
        </TooltipProvider>
      </CartProvider>
    </QueryClientProvider>
  );
}

export default App;

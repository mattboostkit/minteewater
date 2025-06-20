import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const [location] = useLocation();

  const handleNewsletterSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await apiRequest("POST", "/api/newsletter", { email: newsletterEmail });
      toast({
        title: "Subscribed!",
        description: "Thank you for subscribing to our newsletter.",
      });
      setNewsletterEmail("");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to subscribe. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToSection = (sectionId: string) => {
    if (location === '/') {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="bg-green-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <img 
                src="https://ik.imagekit.io/boostkit/Mintee/mintee_logo_white.webp?updatedAt=1749408894324" 
                alt="Mintee" 
                className="h-12 w-auto"
              />
            </div>
            <p className="text-green-100 leading-relaxed max-w-md">
              The chilled evolution of peppermint tea. Natural digestive wellness in every refreshing sip, 
              sustainably crafted for your daily wellness routine.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4 mt-6">
              <a href="#" className="w-10 h-10 bg-green-800 hover:bg-green-700 rounded-full flex items-center justify-center transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 bg-green-800 hover:bg-green-700 rounded-full flex items-center justify-center transition-colors">
                <span className="sr-only">Facebook</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 bg-green-800 hover:bg-green-700 rounded-full flex items-center justify-center transition-colors">
                <span className="sr-only">Instagram</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.097.118.112.221.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.162-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z"/>
                </svg>
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="gazpacho-black text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                {location === '/' ? (
                  <button onClick={() => scrollToSection('home')} className="text-green-200 hover:text-white transition-colors">Home</button>
                ) : (
                  <Link href="/" className="text-green-200 hover:text-white transition-colors">Home</Link>
                )}
              </li>
              <li>
                {location === '/' ? (
                  <button onClick={() => scrollToSection('shop')} className="text-green-200 hover:text-white transition-colors">Shop</button>
                ) : (
                  <Link href="/shop" className="text-green-200 hover:text-white transition-colors">Shop</Link>
                )}
              </li>
              <li>
                {location === '/' ? (
                  <button onClick={() => scrollToSection('about')} className="text-green-200 hover:text-white transition-colors">About Us</button>
                ) : (
                  <Link href="/about" className="text-green-200 hover:text-white transition-colors">About Us</Link>
                )}
              </li>
              <li>
                {location === '/' ? (
                  <button onClick={() => scrollToSection('sustainability')} className="text-green-200 hover:text-white transition-colors">Sustainability</button>
                ) : (
                  <Link href="/sustainability" className="text-green-200 hover:text-white transition-colors">Sustainability</Link>
                )}
              </li>
              <li>
                {location === '/' ? (
                  <button onClick={() => scrollToSection('contact')} className="text-green-200 hover:text-white transition-colors">Contact</button>
                ) : (
                  <Link href="/contact" className="text-green-200 hover:text-white transition-colors">Contact</Link>
                )}
              </li>
            </ul>
          </div>
          
          {/* Customer Support */}
          <div>
            <h4 className="gazpacho-black text-lg mb-4">Support</h4>
            <ul className="space-y-2">
              <li><Link href="/faq" className="text-green-200 hover:text-white transition-colors">FAQs</Link></li>
              <li><Link href="/shipping" className="text-green-200 hover:text-white transition-colors">Shipping Info</Link></li>
              <li><Link href="/returns" className="text-green-200 hover:text-white transition-colors">Returns</Link></li>
              <li><Link href="/privacy" className="text-green-200 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-green-200 hover:text-white transition-colors">Terms & Conditions</Link></li>
            </ul>
          </div>
        </div>
        
        {/* Newsletter Signup */}
        <div className="mt-12 pt-8 border-t border-green-800">
          <div className="max-w-md mx-auto text-center">
            <h4 className="gazpacho-black text-xl mb-4">Stay Refreshed</h4>
            <p className="text-green-200 mb-6">Subscribe for wellness tips, new product updates, and exclusive offers.</p>
            <form onSubmit={handleNewsletterSignup} className="flex gap-2">
              <Input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 px-4 py-3 rounded-full text-gray-900 focus:ring-2 focus:ring-green-500 focus:outline-none"
                required
              />
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded-full font-semibold transition-colors"
              >
                {isSubmitting ? "..." : "Subscribe"}
              </Button>
            </form>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-green-800 text-center">
          <p className="text-green-200">
            © 2025 Mintee Water Ltd. All rights reserved. | Made with 💚 in the UK
          </p>
        </div>
      </div>
    </footer>
  );
}

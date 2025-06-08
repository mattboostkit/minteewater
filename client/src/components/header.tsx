import { useState } from "react";
import { Link } from "wouter";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useCart } from "@/lib/cart-store";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { state, dispatch } = useCart();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-green-100">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center cursor-pointer">
              <h1 className="gazpacho-black text-2xl text-green-700">MINTEE</h1>
              <span className="ml-2 text-sm text-green-600 font-medium">WATER</span>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <button onClick={() => scrollToSection('home')} className="text-green-700 hover:text-green-500 font-medium transition-colors">
              Home
            </button>
            <button onClick={() => scrollToSection('shop')} className="text-green-700 hover:text-green-500 font-medium transition-colors">
              Shop
            </button>
            <button onClick={() => scrollToSection('about')} className="text-green-700 hover:text-green-500 font-medium transition-colors">
              About
            </button>
            <button onClick={() => scrollToSection('sustainability')} className="text-green-700 hover:text-green-500 font-medium transition-colors">
              Sustainability
            </button>
            <button onClick={() => scrollToSection('contact')} className="text-green-700 hover:text-green-500 font-medium transition-colors">
              Contact
            </button>
          </div>
          
          {/* Cart & Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => dispatch({ type: "TOGGLE_CART" })}
              className="relative p-2 text-green-700 hover:text-green-500 transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
              {state.count > 0 && (
                <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {state.count}
                </span>
              )}
            </button>
            
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-green-700 hover:text-green-500 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-green-100">
          <div className="px-4 py-2 space-y-1">
            <button 
              onClick={() => scrollToSection('home')} 
              className="block w-full text-left px-3 py-2 text-green-700 hover:bg-green-50 rounded-md"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('shop')} 
              className="block w-full text-left px-3 py-2 text-green-700 hover:bg-green-50 rounded-md"
            >
              Shop
            </button>
            <button 
              onClick={() => scrollToSection('about')} 
              className="block w-full text-left px-3 py-2 text-green-700 hover:bg-green-50 rounded-md"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('sustainability')} 
              className="block w-full text-left px-3 py-2 text-green-700 hover:bg-green-50 rounded-md"
            >
              Sustainability
            </button>
            <button 
              onClick={() => scrollToSection('contact')} 
              className="block w-full text-left px-3 py-2 text-green-700 hover:bg-green-50 rounded-md"
            >
              Contact
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

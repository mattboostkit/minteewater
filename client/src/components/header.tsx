import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useCart } from "@/lib/cart-store";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { state, dispatch } = useCart();
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHomePage = location === '/';
  const headerBg = isHomePage && !isScrolled 
    ? 'bg-transparent' 
    : 'bg-white/95 backdrop-blur-sm border-b border-green-100';

  const scrollToSection = (sectionId: string) => {
    if (location === '/') {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setMobileMenuOpen(false);
      }
    }
  };

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${headerBg}`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center cursor-pointer">
              <img 
                src="https://ik.imagekit.io/boostkit/Mintee/mintee_logo.webp?updatedAt=1749408894363" 
                alt="Mintee" 
                className="h-11 w-auto"
              />
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {location === '/' ? (
              <button onClick={() => scrollToSection('home')} className="text-green-700 hover:text-green-500 font-medium transition-colors">
                Home
              </button>
            ) : (
              <Link href="/" className="text-green-700 hover:text-green-500 font-medium transition-colors">
                Home
              </Link>
            )}
            {location === '/' ? (
              <button onClick={() => scrollToSection('shop')} className="text-green-700 hover:text-green-500 font-medium transition-colors">
                Shop
              </button>
            ) : (
              <Link href="/shop" className="text-green-700 hover:text-green-500 font-medium transition-colors">
                Shop
              </Link>
            )}
            {location === '/' ? (
              <button onClick={() => scrollToSection('about')} className="text-green-700 hover:text-green-500 font-medium transition-colors">
                About
              </button>
            ) : (
              <Link href="/about" className="text-green-700 hover:text-green-500 font-medium transition-colors">
                About
              </Link>
            )}
            {location === '/' ? (
              <button onClick={() => scrollToSection('sustainability')} className="text-green-700 hover:text-green-500 font-medium transition-colors">
                Sustainability
              </button>
            ) : (
              <Link href="/sustainability" className="text-green-700 hover:text-green-500 font-medium transition-colors">
                Sustainability
              </Link>
            )}
            {location === '/' ? (
              <button onClick={() => scrollToSection('contact')} className="text-green-700 hover:text-green-500 font-medium transition-colors">
                Contact
              </button>
            ) : (
              <Link href="/contact" className="text-green-700 hover:text-green-500 font-medium transition-colors">
                Contact
              </Link>
            )}
            <Link href="/subscribe" className="text-green-700 hover:text-green-500 font-medium transition-colors bg-green-50 px-3 py-1 rounded-full">
              Subscribe
            </Link>
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
            {location === '/' ? (
              <button 
                onClick={() => scrollToSection('home')} 
                className="block w-full text-left px-3 py-2 text-green-700 hover:bg-green-50 rounded-md"
              >
                Home
              </button>
            ) : (
              <Link href="/" className="block w-full text-left px-3 py-2 text-green-700 hover:bg-green-50 rounded-md">
                Home
              </Link>
            )}
            {location === '/' ? (
              <button 
                onClick={() => scrollToSection('shop')} 
                className="block w-full text-left px-3 py-2 text-green-700 hover:bg-green-50 rounded-md"
              >
                Shop
              </button>
            ) : (
              <Link href="/shop" className="block w-full text-left px-3 py-2 text-green-700 hover:bg-green-50 rounded-md">
                Shop
              </Link>
            )}
            {location === '/' ? (
              <button 
                onClick={() => scrollToSection('about')} 
                className="block w-full text-left px-3 py-2 text-green-700 hover:bg-green-50 rounded-md"
              >
                About
              </button>
            ) : (
              <Link href="/about" className="block w-full text-left px-3 py-2 text-green-700 hover:bg-green-50 rounded-md">
                About
              </Link>
            )}
            {location === '/' ? (
              <button 
                onClick={() => scrollToSection('sustainability')} 
                className="block w-full text-left px-3 py-2 text-green-700 hover:bg-green-50 rounded-md"
              >
                Sustainability
              </button>
            ) : (
              <Link href="/sustainability" className="block w-full text-left px-3 py-2 text-green-700 hover:bg-green-50 rounded-md">
                Sustainability
              </Link>
            )}
            {location === '/' ? (
              <button 
                onClick={() => scrollToSection('contact')} 
                className="block w-full text-left px-3 py-2 text-green-700 hover:bg-green-50 rounded-md"
              >
                Contact
              </button>
            ) : (
              <Link href="/contact" className="block w-full text-left px-3 py-2 text-green-700 hover:bg-green-50 rounded-md">
                Contact
              </Link>
            )}
            <Link href="/subscribe" className="block w-full text-left px-3 py-2 text-green-700 hover:bg-green-50 rounded-md font-medium bg-green-50">
              Subscribe & Save
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

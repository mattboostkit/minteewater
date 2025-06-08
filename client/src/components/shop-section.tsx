import { useQuery } from "@tanstack/react-query";
import { Product } from "@shared/schema";
import { useCart } from "@/lib/cart-store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function ShopSection() {
  const { dispatch } = useCart();
  
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const addToCart = (product: Product) => {
    dispatch({ type: "ADD_ITEM", payload: product });
    dispatch({ type: "OPEN_CART" });
  };

  const getPricePerBottle = (price: string, quantity: number) => {
    return (parseFloat(price) / quantity).toFixed(2);
  };

  if (isLoading) {
    return (
      <section id="shop" className="py-20 gradient-overlay">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="gazpacho-black text-4xl md:text-5xl text-green-800 mb-6">
              Shop Mintee
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-lg animate-pulse">
                <div className="w-full h-48 bg-gray-200 rounded-xl mb-6"></div>
                <div className="h-6 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded mb-4"></div>
                <div className="h-8 bg-gray-200 rounded mb-4"></div>
                <div className="h-12 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="shop" className="py-20 gradient-overlay">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="gazpacho-black text-4xl md:text-5xl text-green-800 mb-6">
            Shop Mintee
          </h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Choose the perfect quantity for your lifestyle. From individual bottles to bulk orders for the whole family.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products?.map((product, index) => (
            <div 
              key={product.id} 
              className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow ${
                product.isPopular ? 'border-2 border-green-400 relative' : ''
              }`}
            >
              {product.isPopular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </Badge>
              )}
              
              <img 
                src={product.imageUrl || "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"} 
                alt={`${product.name} Mintee bottles`} 
                className="w-full h-48 object-cover rounded-xl mb-6" 
              />
              
              <h3 className="gazpacho-black text-2xl text-green-800 mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-4">{product.description}</p>
              
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl font-bold text-green-700">£{product.price}</span>
                <span className="text-sm text-gray-500">£{getPricePerBottle(product.price, product.quantity)} per bottle</span>
              </div>
              
              <Button 
                onClick={() => addToCart(product)}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-full font-semibold transition-colors"
              >
                Add to Cart
              </Button>
            </div>
          ))}
        </div>
        
        {/* Free Delivery Notice */}
        <div className="mt-12 text-center bg-green-100 rounded-2xl p-6">
          <h3 className="gazpacho-black text-xl text-green-800 mb-2">Free UK Delivery</h3>
          <p className="text-green-700">On all orders over £25. Fast, reliable delivery to your door.</p>
        </div>
      </div>
    </section>
  );
}

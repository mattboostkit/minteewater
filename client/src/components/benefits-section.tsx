export default function BenefitsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="gazpacho-black text-4xl md:text-5xl text-green-800 mb-6">
            Why Choose Mintee?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experience the perfect blend of refreshment and wellness with our carefully crafted peppermint-infused water.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* Digestive Wellness */}
          <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-green-50 to-green-100 hover:shadow-lg transition-shadow">
            <img 
              src="https://images.unsplash.com/photo-1628066055147-88dec76c667c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200" 
              alt="Fresh peppermint leaves" 
              className="w-full h-48 object-cover rounded-xl mb-6" 
            />
            <h3 className="gazpacho-black text-2xl text-green-800 mb-4">Natural Digestive Support</h3>
            <p className="text-gray-600 leading-relaxed">
              Peppermint has been trusted for centuries to soothe digestive discomfort naturally. Our infusion delivers these benefits in every refreshing sip.
            </p>
          </div>
          
          {/* Zero Calories */}
          <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-green-50 to-green-100 hover:shadow-lg transition-shadow">
            <img 
              src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200" 
              alt="Healthy lifestyle drinking water" 
              className="w-full h-48 object-cover rounded-xl mb-6" 
            />
            <h3 className="gazpacho-black text-2xl text-green-800 mb-4">Zero Calories, Maximum Flavour</h3>
            <p className="text-gray-600 leading-relaxed">
              Enjoy guilt-free hydration with our naturally flavoured water that supports your wellness goals without compromising on taste.
            </p>
          </div>
          
          {/* Local Sourcing */}
          <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-green-50 to-green-100 hover:shadow-lg transition-shadow">
            <img 
              src="https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200" 
              alt="Natural water source in pristine environment" 
              className="w-full h-48 object-cover rounded-xl mb-6" 
            />
            <h3 className="gazpacho-black text-2xl text-green-800 mb-4">Locally Sourced Excellence</h3>
            <p className="text-gray-600 leading-relaxed">
              We partner with local suppliers to ensure the freshest ingredients and support our community while reducing our environmental footprint.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

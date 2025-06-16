import { CheckCircle } from "lucide-react";

export default function SustainabilitySection() {
  const sustainabilityFeatures = [
    {
      title: "100% Recyclable Packaging",
      description: "Our bottles are made from 100% recyclable materials, contributing to a circular economy."
    },
    {
      title: "Local Sourcing Network",
      description: "We work with local suppliers within 50 miles to reduce transportation emissions and support our community."
    },
    {
      title: "Carbon Neutral Delivery",
      description: "All our deliveries are carbon neutral through our partnership with certified offset programmes."
    },
    {
      title: "Minimal Water Waste",
      description: "Our efficient production process ensures minimal waste, with water conservation at every step."
    }
  ];

  return (
    <section id="sustainability" className="py-20 gradient-overlay">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="gazpacho-black text-4xl md:text-5xl text-green-800 mb-6">
            Committed to Sustainability
          </h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Our environmental responsibility drives every decision we make, from sourcing to packaging.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            {sustainabilityFeatures.map((feature, index) => (
              <div key={index} className="flex space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-green-200 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-700" />
                </div>
                <div>
                  <h3 className="gazpacho-black text-xl text-green-800 mb-2">{feature.title}</h3>
                  <p className="text-gray-700">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600&q=80" 
              alt="Sustainable packaging and eco-friendly production" 
              className="w-full h-auto rounded-2xl shadow-xl" 
            />
            
            {/* Impact Stats */}
            <div className="absolute -top-6 -right-6 bg-white p-4 rounded-xl shadow-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-700">50%</div>
                <div className="text-sm text-gray-600">Less Carbon Footprint</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

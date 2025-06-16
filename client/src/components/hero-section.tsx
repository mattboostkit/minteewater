import { CheckCircle } from "lucide-react";

export default function HeroSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="gradient-hero min-h-screen flex items-center pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="gazpacho-black text-5xl sm:text-6xl lg:text-7xl text-green-800 leading-tight">
                The Chilled Evolution of{' '}
                <span className="text-green-600">Peppermint Tea</span>
              </h1>
              <p className="text-xl text-green-700 leading-relaxed max-w-lg">
                Put a 'pep' in your step with Mintee's premium peppermint-infused water. Zero calories, locally sourced, sustainably crafted.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => scrollToSection('shop')}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-colors shadow-lg hover:shadow-xl"
              >
                Shop Now
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-8 py-4 rounded-full font-semibold text-lg transition-all"
              >
                Learn More
              </button>
            </div>
            
            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-6 pt-8">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-green-700 font-medium">Zero Calories</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-green-700 font-medium">Natural Digestive Aid</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-green-700 font-medium">Locally Sourced</span>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <img 
              src="https://ik.imagekit.io/boostkit/Mintee/Mintee_Hero.webp?updatedAt=1749416997118" 
              alt="Mintee premium peppermint water bottles" 
              className="w-full h-auto rounded-2xl" 
            />
          </div>
        </div>
      </div>
    </section>
  );
}

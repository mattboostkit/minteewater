export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="gazpacho-black text-4xl md:text-5xl text-green-800 mb-8">
              Meet the Founders
            </h2>
            
            <div className="space-y-8">
              <div className="flex space-x-4">
                <img 
                  src="/attached_assets/Becs_1749402024788.webp" 
                  alt="Becs Duffy, Co-founder" 
                  className="w-16 h-16 rounded-full object-cover" 
                />
                <div>
                  <h3 className="gazpacho-black text-xl text-green-800">Becs Duffy</h3>
                  <p className="text-gray-600 mb-2">Co-Founder & Wellness Advocate</p>
                  <p className="text-gray-700">
                    With a background in nutrition and wellness, Becs recognised the need for a natural, refreshing alternative to traditional digestive aids.
                  </p>
                </div>
              </div>
              
              <div className="flex space-x-4">
                <img 
                  src="/attached_assets/John_1749402024789.webp" 
                  alt="John Duffy, Co-founder" 
                  className="w-16 h-16 rounded-full object-cover" 
                />
                <div>
                  <h3 className="gazpacho-black text-xl text-green-800">John Duffy</h3>
                  <p className="text-gray-600 mb-2">Co-Founder & Operations Director</p>
                  <p className="text-gray-700">
                    John brings over 15 years of experience in sustainable business practices and supply chain management to ensure quality and environmental responsibility.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-12 p-6 bg-green-50 rounded-2xl">
              <h3 className="gazpacho-black text-xl text-green-800 mb-4">Our Story</h3>
              <p className="text-gray-700 leading-relaxed">
                After years of drinking peppermint tea for digestive wellness, Becs and John wondered: "Why not make this refreshing and accessible as a chilled beverage?" 
                That simple question led to months of perfecting the ideal peppermint infusion that maintains all the natural benefits whilst delivering exceptional taste.
              </p>
            </div>
          </div>
          
          <div className="relative">
            <img 
              src="/attached_assets/BecJohn_1749401687230.webp" 
              alt="Founders working in their sustainable facility" 
              className="w-full h-auto rounded-2xl shadow-xl" 
            />
            
            {/* Floating testimonial */}
            <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-2xl shadow-lg max-w-sm">
              <p className="text-gray-700 italic mb-2">"We're passionate about creating products that make wellness accessible and enjoyable for everyone."</p>
              <p className="text-green-700 font-semibold">- Becs & John Duffy</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

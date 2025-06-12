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
                  src="https://ik.imagekit.io/boostkit/Mintee/Becs.webp?updatedAt=1749408731641" 
                  alt="Becs Hunter, Co-founder" 
                  className="w-16 h-16 rounded-full object-cover" 
                />
                <div>
                  <h3 className="gazpacho-black text-xl text-green-800">Becs Hunter</h3>
                  <p className="text-gray-700">
                    Becs has over 18 years in Marketing and Digital Media, working across a variety of brands including lux, retail and FMCG.
                  </p>
                </div>
              </div>
              
              <div className="flex space-x-4">
                <img 
                  src="https://ik.imagekit.io/boostkit/Mintee/John.webp?updatedAt=1749408731573" 
                  alt="John Hunter, Co-founder" 
                  className="w-16 h-16 rounded-full object-cover" 
                />
                <div>
                  <h3 className="gazpacho-black text-xl text-green-800">John Hunter</h3>
                  <p className="text-gray-700">
                    John, a Chartered Accountant, has worked for 25 years in finance and M&A, lending to SMEs and Start-Ups across all industries for Australian, US, UK, Dutch and Irish banks.
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
              src="https://ik.imagekit.io/boostkit/Mintee/BecJohn.webp?updatedAt=1749408731629" 
              alt="Founders working in their sustainable facility" 
              className="w-full h-auto rounded-2xl shadow-xl" 
            />
            
            {/* Floating testimonial */}
            <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-2xl shadow-lg max-w-sm">
              <p className="text-gray-700 italic mb-2">"We're passionate about creating products that make wellness accessible and enjoyable for everyone."</p>
              <p className="text-green-700 font-semibold">- Becs & John Hunter</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

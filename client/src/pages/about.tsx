import AboutSection from "@/components/about-section";

export default function About() {
  return (
    <main className="pt-16">
      <div className="gradient-hero py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="gazpacho-black text-4xl md:text-5xl text-green-800 mb-4">
            About Mintee
          </h1>
          <p className="text-xl text-green-700 max-w-2xl mx-auto">
            Meet the founders behind the chilled evolution of peppermint tea and discover our commitment to wellness and sustainability.
          </p>
        </div>
      </div>
      <div className="bg-white">
        <AboutSection />
      </div>
    </main>
  );
}
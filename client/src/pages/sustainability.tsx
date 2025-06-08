import SustainabilitySection from "@/components/sustainability-section";

export default function Sustainability() {
  return (
    <main className="pt-16">
      <div className="gradient-hero py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="gazpacho-black text-4xl md:text-5xl text-green-800 mb-4">
            Our Commitment to Sustainability
          </h1>
          <p className="text-xl text-green-700 max-w-2xl mx-auto">
            Environmental responsibility drives every decision we make, from sourcing to packaging. Discover how we're building a greener future.
          </p>
        </div>
      </div>
      <div className="bg-white">
        <SustainabilitySection />
      </div>
    </main>
  );
}
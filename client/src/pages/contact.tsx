import ContactSection from "@/components/contact-section";

export default function Contact() {
  return (
    <main className="pt-16">
      <div className="gradient-hero py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="gazpacho-black text-4xl md:text-5xl text-green-800 mb-4">
            Get in Touch
          </h1>
          <p className="text-xl text-green-700 max-w-2xl mx-auto">
            Questions about Mintee? Interested in bulk orders? We'd love to hear from you.
          </p>
        </div>
      </div>
      <div className="bg-white">
        <ContactSection />
      </div>
    </main>
  );
}
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is Mintee Water?",
    answer: "Mintee is a premium peppermint-infused water designed to provide natural digestive wellness benefits. It's the chilled evolution of peppermint tea - all the benefits of peppermint with the refreshing hydration of pure water."
  },
  {
    question: "What are the ingredients?",
    answer: "Mintee contains only natural spring water and organic peppermint extract. That's it! No sugars, no calories, no artificial flavours or preservatives - just pure refreshment."
  },
  {
    question: "How does Mintee help with digestion?",
    answer: "Peppermint has been used for centuries to aid digestion. It helps relax digestive muscles, reduce bloating, and ease stomach discomfort. Mintee delivers these benefits in a convenient, refreshing drink."
  },
  {
    question: "When should I drink Mintee?",
    answer: "Mintee can be enjoyed anytime! Many customers prefer it after meals to aid digestion, during workouts for refreshing hydration, or throughout the day as a healthy alternative to sugary drinks."
  },
  {
    question: "How should I store Mintee?",
    answer: "Store Mintee in a cool, dry place away from direct sunlight. For the best taste experience, we recommend chilling before drinking. Once opened, consume within 24 hours."
  },
  {
    question: "Is Mintee suitable for everyone?",
    answer: "Mintee is suitable for most people as part of a balanced diet. However, if you have specific health conditions or are pregnant, we recommend consulting with your healthcare provider. Mintee is vegan, gluten-free, and contains no allergens."
  },
  {
    question: "How does the subscription service work?",
    answer: "Our subscription service delivers fresh Mintee to your door on a schedule that works for you - weekly, monthly, or quarterly. You can modify, pause, or cancel your subscription anytime through your account. Subscribers also enjoy exclusive discounts!"
  },
  {
    question: "What's your sustainability commitment?",
    answer: "We're committed to sustainability! Our bottles are made from 100% recycled plastic and are fully recyclable. We source locally to reduce transportation emissions and use renewable energy in our production facility."
  },
  {
    question: "Can I return my order?",
    answer: "Yes! We offer a 30-day satisfaction guarantee. If you're not completely happy with your Mintee order, contact us for a full refund or replacement. See our Returns page for full details."
  },
  {
    question: "Do you ship internationally?",
    answer: "Currently, we ship throughout the UK with plans to expand internationally soon. Join our newsletter to be the first to know when we launch in your country!"
  }
];

export default function FAQ() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="gazpacho-black text-4xl md:text-5xl text-green-800 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600">
            Everything you need to know about Mintee Water
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="bg-white rounded-lg shadow-sm">
              <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                <span className="text-lg font-semibold text-gray-900">{faq.question}</span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-12 p-6 bg-green-100 rounded-2xl text-center">
          <h3 className="gazpacho-black text-2xl text-green-800 mb-3">Still have questions?</h3>
          <p className="text-gray-700 mb-4">
            Our customer support team is here to help!
          </p>
          <a
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-3 bg-green-600 text-white rounded-full font-semibold hover:bg-green-700 transition-colors"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}
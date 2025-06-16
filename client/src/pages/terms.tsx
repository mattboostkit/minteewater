import { FileText, Scale, AlertCircle, ShieldCheck } from "lucide-react";

export default function Terms() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="gazpacho-black text-4xl md:text-5xl text-green-800 mb-4">
            Terms & Conditions
          </h1>
          <p className="text-xl text-gray-600">
            Please read these terms carefully before using our services
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Last updated: January 2025
          </p>
        </div>

        <div className="bg-green-100 p-6 rounded-2xl mb-8">
          <div className="flex items-center mb-3">
            <FileText className="w-6 h-6 text-green-600 mr-3" />
            <h3 className="gazpacho-black text-xl text-green-800">Agreement</h3>
          </div>
          <p className="text-gray-700">
            By accessing or using the Mintee Water website and services, you agree to be bound by these 
            Terms & Conditions and our Privacy Policy. If you disagree with any part of these terms, 
            please do not use our services.
          </p>
        </div>

        <div className="prose prose-lg max-w-none text-gray-600">
          <section className="mb-8">
            <h2 className="gazpacho-black text-2xl text-green-800 mb-4">1. Definitions</h2>
            <ul className="list-disc list-inside ml-4">
              <li><strong>"Company"</strong> refers to Mintee Water Ltd</li>
              <li><strong>"Service"</strong> refers to our website and all related services</li>
              <li><strong>"Products"</strong> refers to Mintee Water beverages and merchandise</li>
              <li><strong>"Customer"</strong> refers to you, the user of our services</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="gazpacho-black text-2xl text-green-800 mb-4 flex items-center">
              <Scale className="w-6 h-6 mr-3 text-green-600" />
              2. Use of Service
            </h2>
            <h3 className="font-semibold text-gray-900 mb-2">Eligibility</h3>
            <p className="mb-4">
              You must be at least 18 years old to use our services. By using our services, 
              you represent and warrant that you meet this eligibility requirement.
            </p>
            
            <h3 className="font-semibold text-gray-900 mb-2">Account Responsibilities</h3>
            <ul className="list-disc list-inside ml-4">
              <li>You are responsible for maintaining account security</li>
              <li>You must provide accurate and complete information</li>
              <li>You are responsible for all activities under your account</li>
              <li>You must notify us immediately of any unauthorized use</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="gazpacho-black text-2xl text-green-800 mb-4">3. Orders and Payment</h2>
            
            <h3 className="font-semibold text-gray-900 mb-2">Product Orders</h3>
            <ul className="list-disc list-inside ml-4 mb-4">
              <li>All orders are subject to availability</li>
              <li>We reserve the right to refuse or cancel any order</li>
              <li>Prices are subject to change without notice</li>
              <li>All prices are in GBP and include VAT where applicable</li>
            </ul>

            <h3 className="font-semibold text-gray-900 mb-2">Payment Processing</h3>
            <p className="mb-4">
              Payments are processed securely through Stripe. By providing payment information, 
              you authorize us to charge the payment method for all purchases.
            </p>

            <h3 className="font-semibold text-gray-900 mb-2">Subscriptions</h3>
            <ul className="list-disc list-inside ml-4">
              <li>Subscriptions auto-renew unless cancelled</li>
              <li>You may cancel anytime through your account</li>
              <li>No refunds for partial subscription periods</li>
              <li>Price changes will be notified 30 days in advance</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="gazpacho-black text-2xl text-green-800 mb-4">4. Shipping and Delivery</h2>
            <ul className="list-disc list-inside ml-4">
              <li>Delivery times are estimates only</li>
              <li>Risk of loss passes to you upon delivery</li>
              <li>We are not responsible for delays outside our control</li>
              <li>Delivery to UK mainland addresses only (restrictions apply)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="gazpacho-black text-2xl text-green-800 mb-4">5. Returns and Refunds</h2>
            <p className="mb-4">
              Our return policy allows returns within 30 days of delivery for unopened products. 
              See our Returns page for full details. Refunds are processed to the original payment method.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="gazpacho-black text-2xl text-green-800 mb-4 flex items-center">
              <AlertCircle className="w-6 h-6 mr-3 text-green-600" />
              6. Disclaimers and Limitations
            </h2>
            
            <h3 className="font-semibold text-gray-900 mb-2">Product Information</h3>
            <p className="mb-4">
              While we strive for accuracy, we do not warrant that product descriptions, 
              nutritional information, or other content is error-free or complete.
            </p>

            <h3 className="font-semibold text-gray-900 mb-2">Health Disclaimer</h3>
            <div className="bg-yellow-50 p-4 rounded-lg mb-4">
              <p className="text-gray-700">
                Mintee Water is not intended to diagnose, treat, cure, or prevent any disease. 
                Consult your healthcare provider before use if you have medical conditions or concerns.
              </p>
            </div>

            <h3 className="font-semibold text-gray-900 mb-2">Limitation of Liability</h3>
            <p>
              To the maximum extent permitted by law, Mintee Water Ltd shall not be liable for 
              any indirect, incidental, special, or consequential damages arising from your use 
              of our services or products.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="gazpacho-black text-2xl text-green-800 mb-4 flex items-center">
              <ShieldCheck className="w-6 h-6 mr-3 text-green-600" />
              7. Intellectual Property
            </h2>
            <p className="mb-4">
              All content on our website, including text, graphics, logos, images, and software, 
              is the property of Mintee Water Ltd and protected by intellectual property laws.
            </p>
            <ul className="list-disc list-inside ml-4">
              <li>You may not reproduce, distribute, or modify any content without permission</li>
              <li>You may not use our trademarks without written consent</li>
              <li>You grant us license to use any content you submit</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="gazpacho-black text-2xl text-green-800 mb-4">8. Indemnification</h2>
            <p>
              You agree to indemnify and hold harmless Mintee Water Ltd, its officers, directors, 
              employees, and agents from any claims, damages, or expenses arising from your use 
              of our services or violation of these terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="gazpacho-black text-2xl text-green-800 mb-4">9. Modifications</h2>
            <p>
              We reserve the right to modify these terms at any time. Material changes will be 
              notified via email or website notice. Continued use after changes constitutes 
              acceptance of modified terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="gazpacho-black text-2xl text-green-800 mb-4">10. Governing Law</h2>
            <p>
              These terms are governed by the laws of England and Wales. Any disputes shall be 
              resolved in the courts of England and Wales, except where prohibited by law.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="gazpacho-black text-2xl text-green-800 mb-4">11. Contact Information</h2>
            <div className="bg-gray-50 p-6 rounded-xl">
              <p className="mb-2">For questions about these terms, contact us at:</p>
              <p className="mb-1"><strong>Email:</strong> legal@minteewater.com</p>
              <p className="mb-1"><strong>Phone:</strong> 0800 123 4567</p>
              <p><strong>Address:</strong> Mintee Water Ltd, 123 Wellness Way, London, UK, SW1A 1AA</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
import { Shield, Lock, Eye, UserCheck } from "lucide-react";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="gazpacho-black text-4xl md:text-5xl text-green-800 mb-4">
            Privacy Policy
          </h1>
          <p className="text-xl text-gray-600">
            Your privacy is important to us
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Last updated: January 2025
          </p>
        </div>

        <div className="prose prose-lg max-w-none text-gray-600">
          <div className="bg-green-100 p-6 rounded-2xl mb-8 not-prose">
            <div className="flex items-center mb-3">
              <Shield className="w-6 h-6 text-green-600 mr-3" />
              <h3 className="gazpacho-black text-xl text-green-800">Our Commitment</h3>
            </div>
            <p className="text-gray-700">
              Mintee Water Ltd ("we", "our", or "us") is committed to protecting your privacy. 
              This policy explains how we collect, use, and safeguard your personal information 
              when you use our website and services.
            </p>
          </div>

          <section className="mb-8">
            <h2 className="gazpacho-black text-2xl text-green-800 mb-4 flex items-center">
              <Eye className="w-6 h-6 mr-3 text-green-600" />
              Information We Collect
            </h2>
            
            <h3 className="font-semibold text-gray-900 mb-2">Personal Information</h3>
            <p className="mb-4">When you place an order or create an account, we collect:</p>
            <ul className="list-disc list-inside ml-4 mb-4">
              <li>Name and contact details (email, phone, address)</li>
              <li>Payment information (processed securely through Stripe)</li>
              <li>Order history and preferences</li>
              <li>Communication preferences</li>
            </ul>

            <h3 className="font-semibold text-gray-900 mb-2">Automatically Collected Information</h3>
            <p className="mb-4">When you visit our website, we automatically collect:</p>
            <ul className="list-disc list-inside ml-4">
              <li>IP address and browser information</li>
              <li>Device information and identifiers</li>
              <li>Pages visited and interaction data</li>
              <li>Cookies and similar technologies</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="gazpacho-black text-2xl text-green-800 mb-4 flex items-center">
              <UserCheck className="w-6 h-6 mr-3 text-green-600" />
              How We Use Your Information
            </h2>
            <p className="mb-4">We use your information to:</p>
            <ul className="list-disc list-inside ml-4">
              <li>Process and fulfill your orders</li>
              <li>Manage your subscription services</li>
              <li>Send order confirmations and updates</li>
              <li>Respond to customer service requests</li>
              <li>Send marketing communications (with your consent)</li>
              <li>Improve our products and services</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="gazpacho-black text-2xl text-green-800 mb-4 flex items-center">
              <Lock className="w-6 h-6 mr-3 text-green-600" />
              Data Security
            </h2>
            <p className="mb-4">
              We implement appropriate technical and organizational measures to protect your personal data:
            </p>
            <ul className="list-disc list-inside ml-4">
              <li>SSL encryption for all data transmission</li>
              <li>Secure payment processing through Stripe</li>
              <li>Regular security audits and updates</li>
              <li>Limited access to personal information</li>
              <li>Employee training on data protection</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="gazpacho-black text-2xl text-green-800 mb-4">Sharing Your Information</h2>
            <p className="mb-4">We never sell your personal information. We only share your data with:</p>
            <ul className="list-disc list-inside ml-4">
              <li><strong>Service Providers:</strong> Payment processors, delivery partners, and email services</li>
              <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
              <li><strong>Business Transfers:</strong> In case of merger, acquisition, or sale of assets</li>
              <li><strong>With Your Consent:</strong> When you explicitly agree to sharing</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="gazpacho-black text-2xl text-green-800 mb-4">Your Rights</h2>
            <p className="mb-4">Under UK data protection law, you have the right to:</p>
            <ul className="list-disc list-inside ml-4">
              <li>Access your personal data</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your data</li>
              <li>Object to or restrict processing</li>
              <li>Data portability</li>
              <li>Withdraw consent at any time</li>
            </ul>
            <p className="mt-4">
              To exercise these rights, email us at privacy@minteewater.com
            </p>
          </section>

          <section className="mb-8">
            <h2 className="gazpacho-black text-2xl text-green-800 mb-4">Cookies</h2>
            <p className="mb-4">
              We use cookies to enhance your experience. These include:
            </p>
            <ul className="list-disc list-inside ml-4">
              <li><strong>Essential Cookies:</strong> Required for website functionality</li>
              <li><strong>Analytics Cookies:</strong> Help us understand site usage</li>
              <li><strong>Marketing Cookies:</strong> Used to personalize content (with consent)</li>
            </ul>
            <p className="mt-4">
              You can manage cookie preferences through your browser settings.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="gazpacho-black text-2xl text-green-800 mb-4">Children's Privacy</h2>
            <p>
              Our services are not directed to children under 16. We do not knowingly collect 
              personal information from children. If you believe we have collected information 
              from a child, please contact us immediately.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="gazpacho-black text-2xl text-green-800 mb-4">Changes to This Policy</h2>
            <p>
              We may update this privacy policy from time to time. We will notify you of any 
              material changes by posting the new policy on this page and updating the "Last updated" 
              date. Your continued use of our services after changes constitutes acceptance.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="gazpacho-black text-2xl text-green-800 mb-4">Contact Us</h2>
            <p className="mb-4">
              If you have questions about this privacy policy or your personal data:
            </p>
            <div className="bg-gray-50 p-6 rounded-xl not-prose">
              <p className="mb-2"><strong>Email:</strong> privacy@minteewater.com</p>
              <p className="mb-2"><strong>Phone:</strong> 0800 123 4567</p>
              <p className="mb-2"><strong>Address:</strong> Mintee Water Ltd, 123 Wellness Way, London, UK, SW1A 1AA</p>
              <p><strong>Data Protection Officer:</strong> dpo@minteewater.com</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
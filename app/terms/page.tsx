import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service | Mahadev Real Estate',
  description: 'Terms of Service for Mahadev Real Estate. Read our terms and conditions for using our real estate services.',
};

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>

        <div className="bg-white rounded-lg shadow-sm p-8 space-y-6">
          <section>
            <p className="text-gray-600 mb-6">
              Effective Date: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            <p className="text-gray-700 mb-6">
              Welcome to Mahadev Real Estate. These Terms of Service (&quot;Terms&quot;) govern your use of our website and services.
              By accessing or using our services, you agree to be bound by these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-700">
              By using our website and services, you acknowledge that you have read, understood, and agree to be bound by these
              Terms and our Privacy Policy. If you do not agree to these Terms, please do not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Services Description</h2>
            <p className="text-gray-700 mb-4">Mahadev Real Estate provides:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Real estate property listings and information</li>
              <li>Property buying and selling assistance</li>
              <li>Property consultation services</li>
              <li>Market analysis and property valuation guidance</li>
              <li>Connection between property buyers and sellers</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. User Responsibilities</h2>
            <p className="text-gray-700 mb-4">As a user, you agree to:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Provide accurate and complete information</li>
              <li>Maintain the confidentiality of your account credentials</li>
              <li>Use the services only for lawful purposes</li>
              <li>Not engage in any fraudulent or misleading activities</li>
              <li>Respect intellectual property rights</li>
              <li>Not interfere with the proper functioning of the website</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Property Listings and Information</h2>
            <p className="text-gray-700 mb-4">
              While we strive to provide accurate and up-to-date information:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Property details are provided by sellers/developers and may change</li>
              <li>We do not guarantee the accuracy of all listing information</li>
              <li>Prices, availability, and specifications are subject to change</li>
              <li>Images may be representative and not actual photographs</li>
              <li>Users should independently verify all property information</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Brokerage and Fees</h2>
            <p className="text-gray-700 mb-4">
              Our fee structure and policies:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Brokerage fees are clearly communicated before any transaction</li>
              <li>Fees may vary based on property type and transaction value</li>
              <li>Additional charges may apply for premium services</li>
              <li>All fees are subject to applicable taxes</li>
              <li>Refund policies are transaction-specific and will be communicated separately</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Intellectual Property</h2>
            <p className="text-gray-700">
              All content on this website, including text, graphics, logos, images, and software, is the property of
              Mahadev Real Estate or its licensors and is protected by intellectual property laws. You may not reproduce,
              distribute, or create derivative works without our express written permission.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Limitation of Liability</h2>
            <p className="text-gray-700 mb-4">
              To the fullest extent permitted by law:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>We are not liable for any indirect, incidental, or consequential damages</li>
              <li>Our liability is limited to the amount paid for our services</li>
              <li>We are not responsible for third-party actions or content</li>
              <li>We do not guarantee specific outcomes from using our services</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Disclaimer of Warranties</h2>
            <p className="text-gray-700">
              Our services are provided &quot;as is&quot; and &quot;as available&quot; without warranties of any kind, either express or implied,
              including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Indemnification</h2>
            <p className="text-gray-700">
              You agree to indemnify and hold harmless Mahadev Real Estate, its affiliates, officers, directors, employees,
              and agents from any claims, damages, losses, or expenses arising from your use of our services or violation of
              these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Dispute Resolution</h2>
            <p className="text-gray-700 mb-4">
              Any disputes arising from these Terms or our services shall be:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>First attempted to be resolved through good faith negotiation</li>
              <li>Subject to mediation if negotiation fails</li>
              <li>Finally resolved through arbitration in Haryana, Haryana</li>
              <li>Governed by the laws of India</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Termination</h2>
            <p className="text-gray-700">
              We reserve the right to terminate or suspend your access to our services at any time, without prior notice,
              for any reason, including violation of these Terms. Upon termination, your right to use our services will
              immediately cease.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Modifications to Terms</h2>
            <p className="text-gray-700">
              We may modify these Terms at any time. Changes will be effective immediately upon posting on our website.
              Your continued use of our services after any modifications constitutes acceptance of the updated Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Severability</h2>
            <p className="text-gray-700">
              If any provision of these Terms is found to be unenforceable or invalid, that provision shall be limited or
              eliminated to the minimum extent necessary, and the remaining provisions shall remain in full force and effect.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">14. Contact Information</h2>
            <p className="text-gray-700 mb-4">
              For questions about these Terms, please contact us:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700">
                <strong>Mahadev Real Estate</strong><br />
                Email: legal@mahadevrealestate.com<br />
                Phone: +91-9999999999<br />
                Address: Gurgaon, Haryana, India
              </p>
            </div>
          </section>

          <div className="mt-8 pt-8 border-t border-gray-200 flex justify-between">
            <Link href="/" className="text-primary-600 hover:text-primary-700 font-medium">
              ← Back to Home
            </Link>
            <Link href="/privacy" className="text-primary-600 hover:text-primary-700 font-medium">
              Privacy Policy →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
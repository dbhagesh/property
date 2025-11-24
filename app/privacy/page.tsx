import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy | Mahadev Real Estate',
  description: 'Privacy policy for Mahadev Real Estate. Learn how we collect, use, and protect your personal information.',
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>

        <div className="bg-white rounded-lg shadow-sm p-8 space-y-6">
          <section>
            <p className="text-gray-600 mb-6">
              Last updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            <p className="text-gray-700 mb-6">
              At Mahadev Real Estate, we are committed to protecting your privacy and ensuring the security of your personal information.
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Information We Collect</h2>
            <h3 className="text-lg font-medium text-gray-800 mb-2">Personal Information</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li>Name and contact information (email address, phone number)</li>
              <li>Property preferences and requirements</li>
              <li>Location preferences</li>
              <li>Any information you provide in forms or correspondence</li>
            </ul>

            <h3 className="text-lg font-medium text-gray-800 mb-2">Automatically Collected Information</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>IP address and browser information</li>
              <li>Device and operating system information</li>
              <li>Pages visited and time spent on our website</li>
              <li>Referring website addresses</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. How We Use Your Information</h2>
            <p className="text-gray-700 mb-4">We use the collected information for:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Responding to your property inquiries</li>
              <li>Providing property recommendations based on your preferences</li>
              <li>Sending property updates and newsletters (with your consent)</li>
              <li>Improving our website and services</li>
              <li>Complying with legal obligations</li>
              <li>Protecting against fraudulent or illegal activity</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Information Sharing and Disclosure</h2>
            <p className="text-gray-700 mb-4">We do not sell, trade, or rent your personal information. We may share your information with:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Property owners or developers (with your consent)</li>
              <li>Service providers who assist in our operations</li>
              <li>Legal authorities when required by law</li>
              <li>Professional advisors and insurers</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Data Security</h2>
            <p className="text-gray-700">
              We implement appropriate technical and organizational measures to protect your personal information against
              unauthorized access, alteration, disclosure, or destruction. However, no internet transmission is completely
              secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Cookies and Tracking</h2>
            <p className="text-gray-700 mb-4">
              We use cookies and similar tracking technologies to enhance your browsing experience. You can control cookies
              through your browser settings, but disabling them may limit certain features of our website.
            </p>
            <p className="text-gray-700">Types of cookies we use:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mt-2">
              <li>Essential cookies for website functionality</li>
              <li>Analytics cookies to understand usage patterns</li>
              <li>Preference cookies to remember your choices</li>
              <li>Marketing cookies (with your consent)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Your Rights</h2>
            <p className="text-gray-700 mb-4">You have the right to:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Opt-out of marketing communications</li>
              <li>Withdraw consent where applicable</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Third-Party Links</h2>
            <p className="text-gray-700">
              Our website may contain links to third-party websites. We are not responsible for the privacy practices
              of these external sites and encourage you to review their privacy policies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Children&apos;s Privacy</h2>
            <p className="text-gray-700">
              Our services are not directed to individuals under 18 years of age. We do not knowingly collect personal
              information from children.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Changes to This Policy</h2>
            <p className="text-gray-700">
              We may update this Privacy Policy from time to time. The updated version will be indicated by an updated
              &quot;Last updated&quot; date and will be effective as soon as it is accessible.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Contact Us</h2>
            <p className="text-gray-700 mb-4">
              If you have questions or concerns about this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700">
                <strong>Mahadev Real Estate</strong><br />
                Email: privacy@mahadevrealestate.com<br />
                Phone: +91-9999999999<br />
                Address: Gurgaon, Haryana, India
              </p>
            </div>
          </section>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <Link href="/" className="text-primary-600 hover:text-primary-700 font-medium">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
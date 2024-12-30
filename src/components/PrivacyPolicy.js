import React from "react";
import "./PrivacyPolicy.css";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  return (
    <div className="series_detail_page_wrapper">
      <div className="series_detail_page">
        <div className="privacy_content">
          <div className="privacy_policy">
            <h1 className="privacy_header1">Privacy Policy</h1>
            <p>
              At [Your Website Name], your privacy is important to us. This
              Privacy Policy outlines how we collect, use, and protect your
              information when you visit our website.
            </p>

            <div className="privacy_header">Information We Collect</div>
            <p>
              Personal Information: If you choose to sign up or interact with
              certain features, we may collect your name, email address, or
              other personal details. Non-Personal Information: We collect
              anonymous data such as browser type, device information, and pages
              viewed to enhance your experience on our website.
            </p>

            <div className="privacy_header">How We Use Your Information</div>
            <p>
              We use the collected information to: <br /> Provide and improve
              our services. Respond to your inquiries and feedback. Analyze
              website usage to improve functionality. Display personalized
              content or recommendations.
            </p>
            <div className="privacy_header">
              Cookies and Tracking Technologies
            </div>
            <p>
              We may use cookies and similar tracking technologies to: <br />
              Save your preferences for future visits. Track site usage for
              analytics purposes. Serve ads or third-party content (if
              applicable). You can disable cookies in your browser settings, but
              some features of our site may not function properly without them.
            </p>

            <div className="privacy_header">Third-Party Services</div>
            <p>
              We may share non-personal, aggregated information with trusted
              third parties, such as analytics providers, to improve our
              website. We will not sell or share your personal information
              without your explicit consent, except as required by law.
            </p>

            <div className="privacy_header">Data Security</div>
            <p>
              We take reasonable measures to protect your data from unauthorized
              access, loss, or misuse. However, no method of transmission over
              the internet is completely secure, and we cannot guarantee
              absolute security.
            </p>

            <div className="privacy_header">Your Rights</div>
            <p>
              Access, update, or delete your personal information. Opt out of
              receiving communications from us. Request details about the data
              we have collected. For any requests, please contact us at{" "}
              <Link to="/contact">Contact Us</Link>.
            </p>

            <div className="privacy_header">Children’s Privacy</div>
            <p>
              Our website is not intended for children under the age of 13. We
              do not knowingly collect personal information from children.
            </p>

            <div className="privacy_header">Updates to This Policy</div>
            <p>
              We may update this Privacy Policy from time to time. Any changes
              will be reflected here, and the effective date will be updated
              accordingly. Please review this policy periodically.
            </p>

            <div className="privacy_header">Contact Us</div>
            <p>
              If you have any questions or concerns about this Privacy Policy,
              please contact us at: <Link to="/contact">Contact Us</Link>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

import { useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import Seo from "../components/Seo";
import { absoluteUrl, siteMeta } from "../config/site";
import { contactInfo } from "../data/companyInfo";
import "../styles/contact.css";

function buildMailtoUrl({ to, subject = "", body = "" }) {
  const params = new URLSearchParams();

  if (subject) {
    params.set("subject", subject);
  }

  if (body) {
    params.set("body", body);
  }

  const query = params.toString();

  return `mailto:${encodeURIComponent(to)}${query ? `?${query}` : ""}`;
}

function Contact() {
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const requestedProduct = searchParams.get("product");
  const suggestedSubject = requestedProduct
    ? `Purchase Inquiry - ${requestedProduct}`
    : "Purchase Inquiry";
  const [statusMessage, setStatusMessage] = useState("");
  const [subjectEdited, setSubjectEdited] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const primaryPhone = contactInfo.phones[0].replace(/\s+/g, "");
  const emailUsUrl = buildMailtoUrl({ to: contactInfo.email });

  function handleChange(event) {
    const { name, value } = event.target;

    if (name === "subject") {
      setSubjectEdited(true);
    }

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedSubject = (
      subjectEdited ? formData.subject : suggestedSubject
    ).trim();
    const trimmedMessage = formData.message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedSubject || !trimmedMessage) {
      setStatusMessage("Please complete all fields before sending.");
      return;
    }

    const emailBody = [
      requestedProduct ? `Product: ${requestedProduct}` : null,
      "",
      `Name: ${trimmedName}`,
      `Email: ${trimmedEmail}`,
      "",
      trimmedMessage,
    ]
      .filter(Boolean)
      .join("\n");

    const mailtoUrl = buildMailtoUrl({
      to: contactInfo.email,
      subject: trimmedSubject,
      body: emailBody,
    });

    setStatusMessage("Opening your email app with a drafted message.");
    window.location.href = mailtoUrl;
  }

  return (
    <main className="contact-page">
      <Seo
        title="Contact & Purchase | GLAMGO"
        description="Contact GLAMGO for purchase inquiries, stock questions, product details, and business coordination."
        path={pathname === "/purchase" ? "/purchase" : "/contact"}
      >
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: siteMeta.name,
            image: absoluteUrl("/logo1.png"),
            url: siteMeta.url,
            email: contactInfo.email,
            telephone: contactInfo.phones[0],
            address: {
              "@type": "PostalAddress",
              streetAddress: contactInfo.addressLines.slice(0, 2).join(", "),
              addressLocality: "Kolkata",
              addressRegion: "West Bengal",
              postalCode: "700001",
              addressCountry: "IN",
            },
          })}
        </script>
      </Seo>

      <section className="contact-hero">
        <div className="contact-shell">
          <div className="contact-copy">
            <span>Purchase & Contact</span>
            <h1>
              Let&apos;s connect for purchases, stock queries, and business
              requirements.
            </h1>
            <p>
              Reach out for product questions, purchase inquiries, stock
              updates, or business coordination. Our team will guide you with
              the next steps directly.
            </p>

            {requestedProduct ? (
              <p className="contact-product-pill">Regarding: {requestedProduct}</p>
            ) : null}
          </div>

          <aside className="contact-side-panel">
            <div className="contact-info-card">
              <h3>Contact Details</h3>
              <a
                className="contact-action-link"
                href={emailUsUrl}
              >
                {contactInfo.email}
              </a>
              {contactInfo.phones.map((phone) => (
                <a
                  key={phone}
                  className="contact-action-link"
                  href={`tel:${phone.replace(/\s+/g, "")}`}
                >
                  {phone}
                </a>
              ))}

              <div className="contact-quick-actions">
                <a
                  className="contact-quick-btn primary"
                  href={emailUsUrl}
                >
                  Email Us
                </a>
                <a
                  className="contact-quick-btn secondary"
                  href={`tel:${primaryPhone}`}
                >
                  Call Now
                </a>
              </div>
            </div>

            <div className="contact-info-card">
              <h3>Office Address</h3>
              <p>{contactInfo.officeName}</p>
              {contactInfo.addressLines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="contact-form-section">
        <div className="contact-form-shell">
          <h2>Write to Us:</h2>
          <form className="write-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              autoComplete="name"
              enterKeyHint="next"
              maxLength={80}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Enter email address"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              inputMode="email"
              enterKeyHint="next"
              maxLength={120}
              required
            />
            <input
              type="text"
              name="subject"
              placeholder="Enter Subject"
              value={subjectEdited ? formData.subject : suggestedSubject}
              onChange={handleChange}
              enterKeyHint="next"
              maxLength={140}
              required
            />
            <textarea
              name="message"
              placeholder="Enter Message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              enterKeyHint="send"
              maxLength={1200}
              required
            />
            <button type="submit">Send Message</button>
          </form>

          {statusMessage ? (
            <p className="form-status" aria-live="polite">
              {statusMessage}
            </p>
          ) : null}
        </div>
      </section>

      <section className="contact-map-section">
        <div className="map-section-head">
          <span>Live Location</span>
          <h2>Visit our office at Diamond Heritage Building.</h2>
          <a
            href={contactInfo.mapDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="map-link"
          >
            Open in Maps
          </a>
        </div>

        <div className="map-frame-wrap">
          <iframe
            title="GLAMGO office location"
            src={contactInfo.mapEmbedSrc}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </section>
    </main>
  );
}

export default Contact;

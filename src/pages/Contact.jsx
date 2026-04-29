import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { contactInfo } from "../data/companyInfo";
import "../styles/contact.css";

function Contact() {
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
    const trimmedSubject = (subjectEdited ? formData.subject : suggestedSubject).trim();
    const trimmedMessage = formData.message.trim();

    const mailSubject = encodeURIComponent(trimmedSubject);
    const mailBody = encodeURIComponent(
      `Name: ${trimmedName}\nEmail: ${trimmedEmail}\n${
        requestedProduct ? `Product: ${requestedProduct}\n` : ""
      }\nMessage:\n${trimmedMessage}`
    );

    setStatusMessage("Opening your email app with the message details.");
    window.location.href = `mailto:${contactInfo.email}?subject=${mailSubject}&body=${mailBody}`;
  }

  return (
    <main className="contact-page">
      <section className="contact-hero">
        <div className="contact-shell">
          <div className="contact-copy">
            <span>Purchase & Contact</span>
            <h1>Let&apos;s connect for purchases, stock queries, and business requirements.</h1>
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
              <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
              {contactInfo.phones.map((phone) => (
                <a key={phone} href={`tel:${phone.replace(/\s+/g, "")}`}>
                  {phone}
                </a>
              ))}
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
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Enter email address"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="subject"
              placeholder="Enter Subject"
              value={subjectEdited ? formData.subject : suggestedSubject}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              placeholder="Enter Message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              required
            />
            <button type="submit">Send Message</button>
          </form>

          {statusMessage ? <p className="form-status">{statusMessage}</p> : null}
        </div>
      </section>

      <section className="contact-map-section">
        <div className="map-section-head">
          <span>Live Location</span>
          <h2>Visit our office at Diamond Heritage Building.</h2>
          <a
            href={contactInfo.mapDirectionsUrl}
            target="_blank"
            rel="noreferrer"
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
          />
        </div>
      </section>
    </main>
  );
}

export default Contact;

import "../styles/contact.css";

function Contact() {
  return (
    <main className="contact-page">
      <section className="contact-shell">
        <div className="contact-copy">
          <span>Contact GlamGo</span>
          <h1>We would love to hear from you.</h1>
          <p>
            Reach out for product questions, stock updates, or retail
            partnerships. Our team typically responds within 24 hours.
          </p>

          <div className="contact-points">
            <p>
              <strong>Email:</strong> support@glamgo.in
            </p>
            <p>
              <strong>Phone:</strong> +91 98765 43210
            </p>
            <p>
              <strong>Hours:</strong> Monday to Saturday, 10 AM - 7 PM
            </p>
          </div>
        </div>

        <div className="contact-card">
          <h3>Customer Desk</h3>
          <p>
            For faster support, mention your product name and order details in
            your email.
          </p>
          <a href="mailto:support@glamgo.in">support@glamgo.in</a>
        </div>
      </section>
    </main>
  );
}

export default Contact;

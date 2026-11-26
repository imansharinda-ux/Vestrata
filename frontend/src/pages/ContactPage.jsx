import { useState } from "react";
import AppNavbar from "../components/layout/AppNavbar.jsx";
import LineMask from "../components/LineMask.jsx";
import Footer from "../components/Footer.jsx";
import ContactWays from "../components/contact/ContactWays.jsx";
import ContactForm from "../components/contact/ContactForm.jsx";
import MessageSent from "../components/contact/MessageSent.jsx";

function ContactPage() {
  const [sentDetails, setSentDetails] = useState(null);

  return (
    <div className="app-page">
      <AppNavbar action={null} />

      <section className="contact">
        <div className="contact__intro">
          <div className="contact__heading">
            <span className="contact__eyebrow pop-in">CONTACT US</span>
            <h1 className="contact__title">
              <LineMask>Questions about</LineMask>
              <LineMask className="line-mask--second">a deal? Ask us.</LineMask>
            </h1>
            <p className="contact__text pop-in pop-in--first">
              Tell us what you need help with, report a problem, or send feedback. A real person on our team reads
              every message.
            </p>
          </div>
          <ContactWays />
        </div>

        <div className="contact__card pop-in pop-in--second">
          {sentDetails ? (
            <MessageSent details={sentDetails} onReset={() => setSentDetails(null)} />
          ) : (
            <ContactForm onSent={setSentDetails} />
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default ContactPage;

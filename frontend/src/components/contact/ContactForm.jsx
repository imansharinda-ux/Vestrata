import { useEffect, useRef, useState } from "react";
import {
  contactTopics,
  MESSAGE_MAX_LENGTH,
  MESSAGE_MIN_LENGTH,
  MESSAGE_WARNING_LENGTH,
  SEND_DELAY_MS,
} from "../../data/contact.js";

const EMAIL_PATTERN = /.+@.+\..+/;

function getHint({ name, isEmailValid, messageLength }) {
  if (!name.trim()) return "Add your name.";
  if (!isEmailValid) return "Add a valid email.";
  if (messageLength < MESSAGE_MIN_LENGTH) return "Write a few more words.";
  return "Ready to send.";
}

function ContactForm({ onSent }) {
  const [topic, setTopic] = useState(contactTopics[0].value);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");
  const [sendCopy, setSendCopy] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const selectedTopic = contactTopics.find((item) => item.value === topic);
  const isEmailValid = EMAIL_PATTERN.test(email.trim());
  const isReady = name.trim().length > 1 && isEmailValid && message.length >= MESSAGE_MIN_LENGTH;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isReady) return;
    setIsSending(true);
    timerRef.current = setTimeout(() => {
      setIsSending(false);
      setMessage("");
      onSent({ name: name.trim(), email: email.trim(), topic: selectedTopic.label });
    }, SEND_DELAY_MS);
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="contact-form__heading">
        <span className="contact-form__title">Send us a message</span>
        <span className="contact-form__subtitle">Fields marked * are required.</span>
      </div>

      <div className="form-field">
        <span className="settings-label">What is it about? *</span>
        <div className="topic-chips">
          {contactTopics.map((item) => (
            <button
              key={item.value}
              type="button"
              className={item.value === topic ? "topic-chip topic-chip--active" : "topic-chip"}
              onClick={() => setTopic(item.value)}
              aria-pressed={item.value === topic}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="settings-grid settings-grid--compact">
        <label className="form-field">
          <span className="settings-label">Full name *</span>
          <input
            className="settings-input contact-input"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            autoComplete="name"
            placeholder="Your name"
          />
        </label>
        <label className="form-field">
          <span className="settings-label">Email *</span>
          <input
            className="settings-input contact-input"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            placeholder="you@example.com"
          />
          {email.length > 4 && !isEmailValid && (
            <span className="field-message text-bad">Please check this email.</span>
          )}
        </label>
      </div>

      {selectedTopic.needsAddress && (
        <label className="form-field">
          <span className="settings-label">
            Property address <span className="field__optional">(optional)</span>
          </span>
          <input
            className="settings-input contact-input"
            type="text"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
            autoComplete="street-address"
            placeholder="e.g. 1420 Maple Ave, Austin, TX"
          />
        </label>
      )}

      <label className="form-field">
        <span className="contact-form__row">
          <span className="settings-label">Message *</span>
          <span className={message.length > MESSAGE_WARNING_LENGTH ? "contact-form__count text-bad" : "contact-form__count"}>
            {message.length} / {MESSAGE_MAX_LENGTH}
          </span>
        </span>
        <textarea
          className="settings-input contact-input contact-input--textarea"
          rows="5"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder={selectedTopic.hint}
          maxLength={MESSAGE_MAX_LENGTH}
        />
      </label>

      <label className="checkbox checkbox--top contact-form__copy">
        <input
          className="checkbox__input"
          type="checkbox"
          checked={sendCopy}
          onChange={(event) => setSendCopy(event.target.checked)}
        />
        Email me a copy of this message.
      </label>

      <div className="contact-form__footer">
        <span className="contact-form__hint">{getHint({ name, isEmailValid, messageLength: message.length })}</span>
        <button type="submit" className="btn btn--primary btn--raise" disabled={!isReady || isSending}>
          {isSending ? "Sending…" : "Send message →"}
        </button>
      </div>
    </form>
  );
}

export default ContactForm;

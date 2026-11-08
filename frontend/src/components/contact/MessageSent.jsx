function MessageSent({ details, onReset }) {
  const firstName = details.name.split(" ")[0] || "there";

  return (
    <div className="message-sent card-pop">
      <span className="message-sent__badge">
        <span className="message-sent__ring"></span>
        <span className="message-sent__circle">
          <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path className="message-sent__check" d="M5 12.5 L10 17.5 L19 7.5" />
          </svg>
        </span>
      </span>
      <span className="message-sent__title">Thanks, {firstName}!</span>
      <span className="message-sent__text">
        We got your message about <strong>{details.topic.toLowerCase()}</strong> and will reply to {details.email} within
        1 business day.
      </span>
      <button type="button" className="btn btn--outline btn--small-pill" onClick={onReset}>
        Send another message
      </button>
    </div>
  );
}

export default MessageSent;

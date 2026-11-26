function Toast({ message }) {
  return (
    <div className="toast" role="status">
      <span className="toast__icon">✓</span>
      {message}
    </div>
  );
}

export default Toast;

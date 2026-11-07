function LineMask({ children, className = "", textClassName = "" }) {
  return (
    <span className={`line-mask ${className}`.trim()}>
      <span className={`line-mask__text ${textClassName}`.trim()}>{children}</span>
    </span>
  );
}

export default LineMask;

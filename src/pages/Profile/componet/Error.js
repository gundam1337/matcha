

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        {children}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

const Error = () => {
  return (
    <div className="error-container">
      <h1>Oops!</h1>
      <div className="error-message">
        <p>There's an error</p>
        <p>Error: This is a test error thrown by ComponentWithError.</p>
      </div>
      <button className="retry-button">Try again</button>
    </div>
  );
};

export default Error;
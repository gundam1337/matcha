import '../style/error.css'

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
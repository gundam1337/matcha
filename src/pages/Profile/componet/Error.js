import '../style/error.css'

const Error = ({ message ,onRetry}) => {
  let content;

  // For Timeout or Network Error
  if (message === "Timeout" || message === "Network Error") {
    content = (
      <div>
        <p>Oops, looks like there was a network issue.</p>
        <p>Error: {message}</p>
        <button className="retry-button" onClick={onRetry}>Try Again</button>
      </div>
    );
  }
  // For Server Error or Internal Server Error
  else if (message === "Server Error" || message === "Internal Server Error") {
    content = (
      <div>
        <p>Oops, something went wrong on our end.</p>
        <p>Error: {message}</p>
        {/* Assuming you have an image for server error */}
        {/* <img src="../style/server_error.png" alt="Server Error" /> */}
      </div>
    );
  }
  // Default error message
  else {
    content = (
      <div>
        <p>An unexpected error occurred.</p>
        <p>Error: {message}</p>
      </div>
    );
  }

  return (
    <div className="error-container">
      <h1>Oops!</h1>
      <div className="error-message">
        {content}
      </div>
    </div>
  );
};

export default Error;
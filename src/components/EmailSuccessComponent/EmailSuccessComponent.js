import React from 'react';
import { FaCheckCircle } from 'react-icons/fa'; // This is for the checkmark, you'll need to install react-icons or use another method for the icon

const EmailSuccessComponent = ({ onOkClick }) => {
  return (
    <div style={styles.container}>
      <FaCheckCircle style={styles.icon} />
      <h1 style={styles.header}>Email sent successfully.</h1>
      <h2 style={styles.header}>Please check your email inbox react component.</h2>
      <p style={styles.subtext}>Thanks</p>
      <button style={styles.button} onClick={onOkClick}>
       Login
      </button>
    </div>
  );
};

// You can define the styles as an object
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    backgroundColor: '#fff', // Set your desired color
    borderRadius: '8px', // Optional: if you want rounded corners
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Optional: if you want a shadow
  },
  icon: {
    color: 'green',
    fontSize: '48px', // Adjust size as needed
    marginBottom: '10px',
  },
  header: {
    fontSize: '24px',
    color: '#333', // Adjust text color as needed
    marginBottom: '5px',
  },
  subtext: {
    fontSize: '16px',
    color: '#666', // Adjust text color as needed
    marginBottom: '20px',
  },
  button: {
    fontSize: '18px',
    padding: '10px 20px',
    backgroundColor: '#007bff', // Adjust button color as needed
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default EmailSuccessComponent;

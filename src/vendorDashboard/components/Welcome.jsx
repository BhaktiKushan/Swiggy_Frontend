import React from 'react';

const Welcome = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Welcome to Dashboard</h1>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    padding: '20px',
    backgroundColor: '#f5f5f5',
  },
  heading: {
    fontSize: '3vw', // scales based on screen size
    color: '#333',
    textAlign: 'center',
    maxWidth: '90%',
    wordWrap: 'break-word',
  },
};

export default Welcome;

import React, { useState } from 'react';
import { API_URL } from '../data/ApiPath';

const Register = ({loginHandler}) => {
  const [Username, setUsername] = useState('');
  const [Email, setEmail]     = useState('');
  const [Password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/vendor/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Username, Email, Password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Registered successfully', data);
        alert('Registered successfully');
        setUsername('');
        setEmail('');
        setPassword('');
        loginHandler();
      } else {
        const error = await response.text();
        throw new Error(error || 'Registration failed');
      }
    } catch (err) {
      console.error('Error during registration:', err);
      alert(`Error: ${err.message}`);
    }
  };

  return (
    <div className="register-section">
      <div className="register-form">
        <h1>Vendor Register</h1>
        <form onSubmit={handleSubmit}>

          <input
            type="text"
            value={Username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your Username"
            required
          />
          <input
            type="email"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your Email"
            required
          />
          <input
            type="password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your Password"
            required
          />
          <button type="submit">Register</button>

        </form>
      </div>
    </div>
  );
};

export default Register;

import React, { useState } from 'react'
import { API_URL } from '../data/ApiPath'

const Login = ({ welcomeHandler }) => {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await fetch(`${API_URL}/vendor/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Email, Password })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        alert('Login successful');
        setEmail('');
        setPassword('');
        localStorage.setItem('LoginToken', data.token);
        welcomeHandler();
        console.log('Login successful');
      } else {
        alert('Login failed');
        setEmail('');
        setPassword('');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert(`Error: ${error.message}`);
      setEmail('');
      setPassword('');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <div className="Login-section">
        <div className="Login-form">
          <h1>Vendor Login</h1>
          <form onSubmit={handleLogin} method="POST">
            <input 
              type="email"
              name='Email'
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your Email"
              disabled={isLoading}
              required
            />

            <input 
              type="password" 
              name='Password'
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your Password"
              disabled={isLoading}
              required
            />
            
            <button 
              type="submit" 
              disabled={isLoading}
              style={{
                opacity: isLoading ? 0.7 : 1,
                cursor: isLoading ? 'not-allowed' : 'pointer'
              }}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
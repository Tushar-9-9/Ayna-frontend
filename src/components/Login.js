import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:1337/api/auth/local', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier: email, password }),
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        // Save the JWT token to local storage or context
        localStorage.setItem('jwt', data.jwt);
        localStorage.setItem('user', JSON.stringify(data.user));

        // Redirect to chat page or another page after successful login
        navigate('/chat');
      } else {
        console.error('Login failed:', data.error);
        setErrorMessage(data.error.message || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setErrorMessage('An error occurred during login. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }} className="auth-form">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit" className="auth-button">Login</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <p>
        Don't have an account? <button className="link-button" onClick={() => navigate('/register')}>Register</button>
      </p>
    </div>
  );
}

export default Login;
